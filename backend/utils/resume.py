import os
import spacy
from io import BytesIO
import docx
import fitz
from utils.openai_embedder import OpenAIEmbedder
from utils.elastic_search import ElasticSearch
from utils.elasticsearch_client import es_client

nlp = spacy.load("en_core_web_sm")

class Resume:
    def __init__(self, file_bytes: bytes = None, filename: str = None):
        self.file_bytes = file_bytes
        self.filename = filename
        self.search = ElasticSearch(es_client)
        self.model = OpenAIEmbedder()

    def get_extension(self) -> str:
        return os.path.splitext(self.filename)[1].lower()

    def extract_text_from_pdf(self) -> str:
        with fitz.open(stream=self.file_bytes, filetype="pdf") as doc:
            return "\n".join(page.get_text() for page in doc)
    
    def extract_text_from_docx(self) -> str:
        doc = docx.Document(BytesIO(self.file_bytes))
        return "\n".join([para.text for para in doc.paragraphs])

    def extract_text_from_txt(self) -> str:
        return self.file_bytes.decode("utf-8", errors="ignore")

    def extract_text_from_resume(self) -> str:
        ext = self.get_extension()
        if ext == ".pdf":
            return self.extract_text_from_pdf()
        elif ext == ".docx":
            return self.extract_text_from_docx()
        elif ext == ".txt":
            return self.extract_text_from_txt()
        else:
            raise ValueError("Unsupported file format")

    def _chunk_text(self, text: str) -> list:
        doc = nlp(text)
        sentences = [sent.text for sent in doc.sents]

        return sentences

    def _build_msearch_body(self, embeddings):
        body = []
        for emb in embeddings:
            body.append({})
            body.append({
                "size": 7,
                "query": {
                    "script_score": {
                        "query": {"match_all": {}},
                        "script": {
                            "source": "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
                            "params": {"query_vector": emb}
                        }
                    }
                }
            })
        return body

    async def extract_skills_semantic(self, resume_text):
        chunks = self._chunk_text(resume_text)
        if not chunks:
            return []

        embeddings = self.model.encode(chunks)

        msearch_body = self._build_msearch_body(embeddings)

        response = await self.search.es.msearch(body=msearch_body, index="skills")

        all_skills = []
        for res in response.get('responses', []):
            hits = res.get('hits', {}).get('hits', [])
            for hit in hits:
                skill = hit['_source'].get('skill')
                if skill:
                    all_skills.append(skill)

        from collections import Counter
        skill_counts = Counter(all_skills)
        return [skill for skill, _ in skill_counts.most_common(15)]

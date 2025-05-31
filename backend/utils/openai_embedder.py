import os
from dotenv import load_dotenv
import openai
from typing import List
from tqdm import tqdm

load_dotenv()

class OpenAIEmbedder:
    def __init__(self, model: str = "text-embedding-3-small"):
        self.model = model
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def encode(self, texts: List[str], batch_size: int = 100) -> List[List[float]]:
        """Embeds a large list of texts in batches."""
        all_embeddings = []
        for i in tqdm(range(0, len(texts), batch_size), desc="Embedding"):
            batch = texts[i:i + batch_size]
            response = openai.embeddings.create(
                model=self.model,
                input=batch
            )
            batch_embeddings = [e.embedding for e in response.data]
            all_embeddings.extend(batch_embeddings)
        return all_embeddings

    def embed_one(self, text: str) -> List[float]:
        """Embeds a single string and returns the embedding."""
        response = openai.embeddings.create(
            model=self.model,
            input=[text]
        )
        return response.data[0].embedding

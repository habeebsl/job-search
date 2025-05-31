import asyncio
import json
import pandas as pd
from utils.openai_embedder import OpenAIEmbedder
from utils.elastic_search import ElasticSearch
from elasticsearch import helpers
from utils.elasticsearch_client import es_client
from utils.aws import AWS

class DataSet:
    
    async def get_dataset(self):
        search = ElasticSearch(es_client)
        data = await search.get_response({"query": {"match_all": {}}}, "skills")

        if data and data not in ("error", 404):
            return data
        
        if data == 404:
            json_data = await self.get_json_dataset()

            if not json_data:
                raise ValueError("Failed to retrieve or generate valid JSON data")

            try:
                parsed = json.loads(json_data)
    
                mapping = {
                    "properties": {
                        "skill": {"type": "text"},
                        "embedding": {
                            "type": "dense_vector",
                            "dims": 1536,
                            "index": True,
                            "similarity": "cosine"
                        }
                    }
                }

                await search.create_index("skills", mapping)

                await self.bulk_index_skills(parsed)

                return parsed
            except json.JSONDecodeError as e:
                print("Invalid JSON data:", e)
                raise

    async def get_json_dataset(self):
        try:
            aws = AWS()
            json_skills_data = await aws.get_file(name="skills.json")

            if not json_skills_data:
                xl_skills_data = await aws.get_file("skills.csv")
                data = await self.process_csv_to_json(xl_skills_data)
                await aws.upload_file(data.encode('utf-8'), "skills.json", "application/json")
               
                return data
            else:
                return json_skills_data.getvalue().decode('utf-8')

        except Exception as e:
            print("An error occurred in get_json_dataset():", e)

    async def process_csv_to_json(self, data_bytes):
        try:
            df = pd.read_csv(data_bytes, header=None)
            df = df.dropna(axis=1, how='all')
            df = df.dropna(how='all')
        except Exception as e:
            print(f"Error reading CSV data: {e}")
        
        cleaned_data = []
        try:
            for index, row in df.iterrows():
                row_data = []
                for value in row:
                    if pd.notna(value):
                        clean_value = str(value).strip()
                        if clean_value and clean_value.lower() not in ['nan', 'none', '']:
                            row_data.append(clean_value)
                cleaned_data.extend(row_data)

            skills_json = {
                "skills": cleaned_data
            }
            return json.dumps(skills_json)
        except Exception as e:
            print(f"Error processing CSV rows: {e}")

    async def bulk_index_skills(self, parsed_data):
        parsed = parsed_data


        model = OpenAIEmbedder()
        skills = parsed["skills"]
        embeddings = model.encode(skills, batch_size=1000)

        actions = [
            {
                "_index": "skills",
                "_source": {
                    "skill": skill,
                    "embedding": embedding
                }
            }
            for skill, embedding in zip(skills, embeddings)
        ]

        await helpers.async_bulk(es_client, actions, chunk_size=500)
        print("Bulk indexing completed.")



        
        
if __name__ == "__main__":
    dataset = DataSet()
    data = asyncio.run(dataset.get_dataset())
    print(data)
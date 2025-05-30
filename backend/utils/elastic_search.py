import asyncio
import json
from elasticsearch import helpers, ConnectionError, NotFoundError
from utils.elasticsearch_client import es_client

class ElasticSearch:

    def __init__(self, es):
        self.es = es
        
    async def load_jsonl_data(self):
        try:
            async def jsonl_generator():
                with open(r"C:\Users\Habeeb\Desktop\Projects\job_search\backend\jobs.jsonl", "r", encoding="utf-8") as f:
                    for line in f:
                        doc = line.strip()
                        if doc:
                            yield {
                                "_index": "jobs",
                                "_source": json.loads(line)
                            }

            success, _ = await helpers.async_bulk(self.es, jsonl_generator())
            print(f"Successfully inserted {success} documents.")

        except Exception as e:
            print("Error during bulk insert:", e)

        finally:
            await self.es.close()

    async def delete_index(self, index_name):
        try:
            response = await self.es.indices.delete(index=index_name)
            print(f"Deleted index '{index_name}':", response)
        except Exception as e:
            print(f"Error deleting index: {e}")
        finally:
            await self.es.close()

    async def create_index(self, index_name, mapping: dict):
        try:
            index_exists = await self.es.indices.exists(index=index_name)
            if not index_exists:
                await self.es.indices.create(index=index_name, body={
                    "mappings": mapping
                })
                return {"status": "success", "message": "Index created successfully"}
            else:
                return {"status": "success", "message": "Index already exists"}
        except ConnectionError as ce:
            print(f"Connection error while creating index '{index_name}': {ce}")
        except Exception as e:
            print(f"Unexpected error while creating index '{index_name}': {e}")
        finally:
            await self.es.close()

    async def populate_index(self, index_name, doc: dict):
        try:
            await self.es.index(index=index_name, body=doc)
            print(f"Document indexed in '{index_name}'.")
        except Exception as e:
            print(f"Unexpected error while indexing document in '{index_name}': {e}")
        finally:
            await self.es.close()

    async def search_jobs_with_keyword(self, keyword: str, location_keyword: str = None, return_list: bool = False):
        must_clauses = [
            {
                "multi_match": {
                    "query": keyword,
                    "fields": ["job_title", "job_description"]
                }
            }
        ]

        if location_keyword:
            must_clauses.append({
                "match": {
                    "job_location": location_keyword
                }
            })

        query = {
            "query": {
                "bool": {
                    "must": must_clauses
                }
            }
        }

        return await self.get_response(query, return_list=return_list)


    async def search_jobs_with_skills(self, skills: list[str], min_match: int = 1):
        should_clauses = []

        for skill in skills:
            should_clauses.append({"match": {"job_title": skill}})
            should_clauses.append({"match": {"job_description": skill}})

        must_clauses = [
            {
                "bool": {
                    "should": should_clauses,
                    "minimum_should_match": min_match
                }
            }
        ]

        query = {
            "query": {
                "bool": {
                    "must": must_clauses
                }
            }
        }

        return await self.get_response(query, return_list=True)


    async def get_response(self, query, index="jobs", return_list: bool = False):
        try:
            response = await self.es.search(index=index, body=query)
            if return_list:
                results = []
                for hit in response["hits"]["hits"]:
                    results.append(hit["_source"])
                return results
            else:
                for hit in response["hits"]["hits"]:
                    return hit["_source"]
        except NotFoundError as e:
            print(f"ElasticSearch NotfoundError: {e}")
            return 404
        except Exception as e:
            print(f"Elasticsearch error: {e}")
            return "error"
        finally:
            await self.es.close()

        

if __name__ == "__main__":
    async def main():
        search = ElasticSearch(es_client)

        mapping = {
            "properties": {
                "job_title": {
                    "type": "text"
                },
                "job_description": {
                    "type": "text"
                },
                "company_name": {
                    "type": "text"
                },
                "job_location": {
                    "type": "text"
                },
                "apply_link": {
                    "type": "text"
                },
                "source": {
                    "type": "text"
                }
            }
        }

        await search.create_index("jobs", mapping)
        await search.load_jsonl_data()
        results = await search.search_jobs_with_keyword("Python Developer", "remote")
        print(results)

    asyncio.run(main())
import os
from io import BytesIO
import boto3
import pandas as pd
from dotenv import load_dotenv
import botocore.exceptions

load_dotenv()

class AWS:

    def __init__(self):
        self.s3 = boto3.client('s3')
        self.bucket_name = os.getenv("AWS_BUCKET_NAME")

    async def list_items(self):
        try:
            response = self.s3.list_objects_v2(Bucket=self.bucket_name)
            return response.get("Contents")
        except botocore.exceptions.BotoCoreError as e:
            print(f"Error listing items in bucket '{self.bucket_name}': {e}")
        except Exception as e:
            print(f"Unexpected error in list_items: {e}")

    async def get_file(self, name):
        try:
            response = self.s3.get_object(Bucket=self.bucket_name, Key=name)
            data = response['Body'].read()
            return BytesIO(data)
        except self.s3.exceptions.NoSuchKey:
            print(f"File '{name}' not found in bucket '{self.bucket_name}'")
        except botocore.exceptions.BotoCoreError as e:
            print(f"Error getting file '{name}': {e}")
        except Exception as e:
            print(f"Unexpected error in get_file: {e}")

    async def upload_file(self, data_bytes, s3_key, content_type):
        try:
            self.s3.put_object(Bucket=self.bucket_name, Key=s3_key, Body=data_bytes, ContentType=content_type)
            print(f"Uploaded data to s3://{self.bucket_name}/{s3_key}")
            return True
        except botocore.exceptions.BotoCoreError as e:
            print(f"Error uploading file '{s3_key}': {e}")
            return False
        except Exception as e:
            print(f"Unexpected error in upload_file: {e}")
            return False

    

if __name__ == "__main__":
    aws = AWS()
    df = pd.read_csv(aws.get_file("skills.csv"))
    print(df.head(1))






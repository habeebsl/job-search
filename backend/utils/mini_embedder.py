from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np

class MiniLMEmbedder:
    def __init__(self, model_name="sentence-transformers/all-MiniLM-L6-v2", device=None):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)
        self.model.eval()

    def mean_pooling(self, model_output, attention_mask):
        token_embeddings = model_output.last_hidden_state
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size())
        return (token_embeddings * input_mask_expanded).sum(1) / input_mask_expanded.sum(1)

    def encode(self, texts, batch_size=32, normalize=True):
        if isinstance(texts, str):
            texts = [texts]

        embeddings = []
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            encoded_input = self.tokenizer(batch, padding=True, truncation=True, return_tensors='pt').to(self.device)
            with torch.no_grad():
                model_output = self.model(**encoded_input)

            pooled = self.mean_pooling(model_output, encoded_input['attention_mask'])
            if normalize:
                pooled = torch.nn.functional.normalize(pooled, p=2, dim=1)

            embeddings.extend(pooled.cpu().numpy())
            
        return np.array(embeddings)
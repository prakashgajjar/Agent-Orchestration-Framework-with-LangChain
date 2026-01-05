# memory/shared_memory.py
from langchain_community.vectorstores import FAISS
from langchain_core.embeddings import FakeEmbeddings


class SharedMemory:
    def __init__(self):
        embeddings = FakeEmbeddings(size=768)
        self.vectorstore = FAISS.from_texts(
            ["Initial shared memory"],
            embedding=embeddings
        )

    def save(self, text: str):
        self.vectorstore.add_texts([text])

    def retrieve(self, query: str):
        docs = self.vectorstore.similarity_search(query, k=3)
        return [doc.page_content for doc in docs]

def create_shared_memory():
    return SharedMemory()

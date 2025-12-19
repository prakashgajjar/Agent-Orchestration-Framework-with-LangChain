from langchain.memory import VectorStoreRetrieverMemory
from langchain_community.vectorstores import FAISS
from langchain.embeddings.fake import FakeEmbeddings

def create_shared_memory():
    embeddings = FakeEmbeddings(size=768)

    vectorstore = FAISS.from_texts(
        texts=["Initial shared memory context"],
        embedding=embeddings
    )

    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    return VectorStoreRetrieverMemory(
        retriever=retriever,
        memory_key="shared_context"
    )

# Ravent

## Overview
**Ravent** is the most recent and fastest approach for RAG (Retrieval-Augmented Generation) implementation with Agentic AI. 
We have utilized **LangChain**, **ChromaDB**, and **Agno** to create a robust Agentic AI system. 

POCs and R&D experiments are available as Jupyter Notebooks in the `notebooks` directory.

## Serving as an Application
- **Backend**: Built with **Django REST Framework (DRF)** — available in the `ravent_backend` directory.
- **Frontend**: Built with **Next.js** — available in the `ravent-frontend` directory.

## GitHub Repository
[Ravent GitHub Repository](https://github.com/NoManNayeem/ravent.git)

## Features
- A conversational LLM-powered Agentic AI workflow to answer users' queries in a consistent, conversational, and conventional way.
- Prioritizes answering from the RAG knowledge base; if unavailable, performs a web search to provide a response.
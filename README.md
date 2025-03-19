# About the Project

**Book Wise** is a modern web application designed to help users discover new books tailored to their individual tastes and reading preferences. Built using Next.js and Machine Learning Algorithm, this platform leverages advanced recommendation algorithms and a user-friendly interface to create a seamless browsing experience. Visit the model: https://github.com/anhhuy007/bookwise-model

![Bookwise](https://firebasestorage.googleapis.com/v0/b/tiktok-clone-f0b70.appspot.com/o/image%2Fbookwise.jpg?alt=media&token=3365db9b-b7cb-43d4-80bb-14b3d06ae18c)

## Overview

The system aims to address the challenge of discovering suitable books in a vast and diverse literary landscape. It employs a combination of algorithms, including:

- **Demographic Filtering:** Recommends books based on aggregated user data, such as popularity and average ratings.
- **Collaborative Filtering:** Identifies users with similar tastes and suggests books they have enjoyed.
- **Content-Based Filtering:** Recommends books that share similar themes or genres with the user's previously read or liked books.
- **Semantic Search:** Leverages Natural Language Processing (NLP) and vector databases to understand the meaning and context of user queries and book descriptions, providing a more refined search experience.

## Technologies Used

![Bookwise Architecture](https://firebasestorage.googleapis.com/v0/b/tiktok-clone-f0b70.appspot.com/o/image%2Fbookwise-architecture.jpg?alt=media&token=c42470c0-f739-403f-9ee3-0c55748ce085)

- **Python**
- **Machine Learning Libraries:**
    - Scikit-learn
    - Sentence-Transformers: ```all-miniLM-L6-v2```
    - FAISS (Facebook AI Similarity Search)
- **API Framework:** FastAPI
- **Data Storage:** Neon Postgresql
- **Web Platform:** Nextjs, TailwindCSS

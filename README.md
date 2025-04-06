# 📚 Book Management API

A RESTful API built with Java Spring Boot to manage books in a library. It supports full CRUD (Create, Read, Update, Delete) operations.

---

## 🚀 Features

- Create a new book 📘
- Retrieve all books or a specific book 📚
- Update book details ✏️
- Delete a book ❌

---

## 🛠️ Tech Stack

- NodeJs
- Express
- MongoDB
- RESTful APIs

---

## 📦 API Endpoints

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/api/books`          | Get all books           |
| GET    | `/api/books/{id}`     | Get a book by ID        |
| POST   | `/api/books`          | Add a new book          |
| PUT    | `/api/books/{id}`     | Update a book by ID     |
| DELETE | `/api/books/{id}`     | Delete a book by ID     |

---

## 📄 Sample Book JSON

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publishedDate": "1925-04-10"
}

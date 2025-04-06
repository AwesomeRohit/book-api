
Book API
A simple RESTful API for managing books, built with Node.js and Express.js.
Endpoints
GET /books
Retrieve a list of all books
Response: JSON array of book objects
GET /books/:id
Retrieve a book by ID
Response: JSON book object
POST /books
Create a new book
Request Body: JSON book object
Response: JSON book object with generated ID
PUT /books/:id
Update an existing book
Request Body: JSON book object
Response: JSON book object
DELETE /books/:id
Delete a book by ID
Response: JSON success message
Book Object
id: unique identifier (string)
title: book title (string)
author: book author (string)
description: book description (string)
Example Use Cases
Get all books
Bash
curl http://localhost:3000/books
Create a new book
Bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "description": "Classic novel"}' http://localhost:3000/books
Update an existing book
Bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "The Catcher in the Rye", "author": "J.D. Salinger", "description": "Classic coming-of-age novel"}' http://localhost:3000/books/1
Delete a book
Bash
curl -X DELETE http://localhost:3000/books/1
Setup and Run
Clone the repository: git clone https://github.com/your-username/book-api.git
Install dependencies: npm install
Start the server: npm start
Access the API at http://localhost:3000


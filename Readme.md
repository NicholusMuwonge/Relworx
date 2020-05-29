
## Book Management App

### How to test out this implementation
- Clone this app and cd into the directory
- Setup env variables as demonstrated in the env_example by creating a .env file
- Run   `npm install ` . You may need to install Sequelize globally `npm i sequelize-cli`
- npm start to run migrations and launch off application.


User Authentication
Register

url: `http://127.0.0.1:5000/api/users/register`
body:

```
{
    "email": "email@gmail.com",
    "password":"Password1#",
    "username": "something"

}
```

Login

url: `http://127.0.0.1:5000/api/users/login`
body:

```
{
    "email": "email@gmail.com",
    "password":"Password1#"

}
```

Books

POST http://127.0.0.1:5000/api/books/create
Request

```
{
    "title":"foo",
    "isbn": "9788371815102",
    "author": "Nickson",
    "image": " http://www.example.com/asdf.jpg"
}
```

Response

```
{
    "status": 201,
    "message": "Book created successfully",
    "book": {
        "id": 1,
        "title": "foo",
        "image": " http://www.example.com/asdf.jpg",
        "author": "Nickson",
        "isbn": "9788371815102",
        "createdby": 2,
        "updatedAt": "2020-05-29T20:59:41.517Z",
        "createdAt": "2020-05-29T20:59:41.517Z"
    }
}
```

GET All user added books

http://127.0.0.1:5000/api/books/

```
{
    "status": 200,
    "books": {
        "count": 2,
        "rows": [
            {
                "id": 2,
                "title": "foooo",
                "isbn": "048665088X",
                "image": " http://www.example.com/asdf.jpg",
                "author": "Nickson",
                "createdby": 2,
                "createdAt": "2020-05-29T21:07:43.536Z",
                "updatedAt": "2020-05-29T21:09:20.033Z",
                "user": {
                    "username": "nicksbro1",
                    "email": "nicholus1@gmail.com",
                    "id": 2
                }
            },
            {
                "id": 1,
                "title": "foo",
                "isbn": "9788371815102",
                "image": " http://www.example.com/asdf.jpg",
                "author": "Nickson",
                "createdby": 2,
                "createdAt": "2020-05-29T20:59:41.517Z",
                "updatedAt": "2020-05-29T20:59:41.517Z",
                "user": {
                    "username": "nicksbro1",
                    "email": "nicholus1@gmail.com",
                    "id": 2
                }
            }
        ]
    }
}
```

GET A single book

http://127.0.0.1:5000/api/books/1

```
{
    "status": 200,
    "book": {
        "id": 1,
        "title": "foo",
        "isbn": "9788371815102",
        "image": " http://www.example.com/asdf.jpg",
        "author": "Nickson",
        "createdby": 2,
        "createdAt": "2020-05-29T20:59:41.517Z",
        "updatedAt": "2020-05-29T20:59:41.517Z",
        "user": {
            "username": "nicksbro1",
            "email": "nicholus1@gmail.com",
            "id": 2
        }
    }
}
```

PUT http://127.0.0.1:5000/api/books/1

Body

```
{
    "title":"foooo",
    "isbn": "048665088X",
    "author": "Nickson",
    "image": " http://www.example.com/asdf.jpg"
}

```

Response

```
{
    "status": 200,
    "message": "book updated successfully.",
    "book": [
        {
            "id": 2,
            "title": "foooo",
            "isbn": "048665088X",
            "image": " http://www.example.com/asdf.jpg",
            "author": "Nickson",
            "createdby": 2,
            "createdAt": "2020-05-29T21:07:43.536Z",
            "updatedAt": "2020-05-29T21:09:20.033Z"
        }
    ]
}
```

DELETE Delete books http://127.0.0.1:5000/api/books/1

Response

```
{
    "status": 200,
    "message": "book deleted successfully."
}
```

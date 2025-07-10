# Mini URL Shortener API

A mini RESTful URL Shortener API built with **Node.js**, **Express.js**, and **MongoDB**.  
It shortens long URLs and provides analytics, expiration, and rate-limiting features.

---

## Features

- Shortens long URLs to short codes
- Redirects short codes to original URLs
- URL validation using `valid-url`
- Set expiration date
- Track number of clicks (analytics)
- Rate limiting to avoid abuse
- RESTful structure using Express routing

---

## Tech Stack

| Tech        | Purpose                        |
|-------------|--------------------------------|
| Node.js     | JavaScript runtime             |
| Express.js  | Web framework                  |
| MongoDB     | Database for storing URLs      |
| Mongoose    | ODM for MongoDB                |
| valid-url   | For URL format validation      |
| express-rate-limit | For request throttling  |

---

## Installation

1. **Clone the Repository** -
  git clone https://github.com/tanishka167/url-shortener-api.git
  cd url-shortener-api

2. **Install Dependencies** -
  npm install

3. **Start MongoDB** -
   mongodb://localhost:27017/short-url

4. **Run the Server** -
   npm start


# API Endpoints
POST /url
  ```
Request Body:
  {
    "url": "https://www.google.com",
    "expiryDate": "2025-12-31T23:59:59Z"
  }
```
```
Response:
  {
  "shortUrl": "https://localhost:8001/vFXVeaFhD"
  }
```
 **GET /:shortId**
 ```
    Redirect to the original URL
```

**GET /url/analytics/:shortId**
```
  Get analytics for a short URL
```

** Rate Limiting**
```
  Max 5 requests per minute per IP address
```

# Testing with Postman
**Create Short URL**
```
POST http://localhost:8001/url
```
**Redirect (GET)**
  ```
  GET http://localhost:8001/<shortId>
  ```

**View Analytics**
  ```
  GET http://localhost:8001/url/analytics/<shortId>
  ```

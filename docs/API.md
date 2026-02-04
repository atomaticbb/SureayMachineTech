# API Documentation

## Base URL

All API endpoints are prefixed with `/api`.

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

---

## Endpoints

### Health Check

Check if the API server is running.

**Endpoint:** `GET /health`

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-02-04T13:00:00.000Z"
}
```

---

### Products

#### Get All Products

Retrieve a list of all products.

**Endpoint:** `GET /api/products`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "single-shaft",
      "name": "Single Shaft Shredder Blades",
      "description": "High-performance single shaft shredder blades",
      "category": "single-shaft",
      "image": "https://example.com/image.jpg",
      "specs": {
        "dimensions": "100x50mm",
        "material": "D2 Steel",
        "hardness": "58-62 HRC"
      },
      "features": ["High wear resistance", "Custom dimensions"],
      "applications": ["Plastic recycling", "Metal recycling"]
    }
  ]
}
```

#### Get Product by ID

Retrieve a single product by its ID.

**Endpoint:** `GET /api/products/:id`

**Parameters:**

- `id` (string, required) - Product ID

**Response (Success):**

```json
{
  "success": true,
  "data": {
    "id": "single-shaft",
    "name": "Single Shaft Shredder Blades",
    "description": "High-performance single shaft shredder blades",
    "category": "single-shaft",
    "image": "https://example.com/image.jpg"
  }
}
```

**Response (Not Found):**

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### Contact

#### Submit Contact Form

Submit a contact form inquiry.

**Endpoint:** `POST /api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "message": "I'm interested in your products"
}
```

**Request Body Schema:**

- `name` (string, required) - Name (2-50 characters)
- `email` (string, required) - Valid email address
- `phone` (string, optional) - Phone number
- `company` (string, optional) - Company name (max 100 characters)
- `message` (string, required) - Message (10-1000 characters)

**Response (Success):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

**Response (Validation Error):**

```json
{
  "success": false,
  "message": "Validation error message"
}
```

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

### HTTP Status Codes

- `200 OK` - Successful request
- `400 Bad Request` - Invalid request data or validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## CORS

The API supports CORS with the following configuration:

- **Development:** Allows `http://localhost:3000` and `http://localhost:5173`
- **Production:** Configured via `ALLOWED_ORIGINS` environment variable

**Allowed Methods:** GET, POST, PUT, DELETE

**Credentials:** Enabled

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use.

---

## Authentication

Currently, the API does not require authentication. If you need to add authentication:

1. Add JWT or session-based authentication middleware
2. Update the API client in `client/src/api/client.ts` to include authentication tokens
3. Protect sensitive endpoints with authentication middleware

---

## Future Enhancements

- Add pagination for product listings
- Add filtering and search capabilities
- Implement product categories endpoint
- Add image upload for contact attachments
- Implement email notifications for contact form submissions
- Add authentication and authorization
- Implement rate limiting

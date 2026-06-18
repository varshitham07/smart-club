# 📚 API Documentation

## Welcome to Smart Club API Documentation!

Your Smart Club API now has **interactive Swagger UI documentation**! 

---

## 🌐 Access API Documentation

### Local Development
```
http://localhost:3000/api-docs
```

### Production (Render)
```
https://your-smart-club-url.onrender.com/api-docs
```

---

## 📖 What is Swagger UI?

Swagger UI is an interactive documentation system that allows you to:
- ✅ See all API endpoints
- ✅ Understand what each endpoint does
- ✅ Test endpoints directly from browser
- ✅ See request/response examples
- ✅ Copy curl commands

---

## 🚀 Current API Endpoints

### 1. Welcome Endpoint
**GET** `/`

Returns welcome message and server status.

**Example Request:**
```bash
curl http://localhost:3000/
```

**Example Response:**
```json
{
  "message": "Welcome to Smart Club API",
  "status": "Server is running",
  "environment": "development"
}
```

---

### 2. Health Check Endpoint
**GET** `/health`

Returns server health status and uptime information.

**Example Request:**
```bash
curl http://localhost:3000/health
```

**Example Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-06-18T15:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

---

### 3. Documentation Redirect
**GET** `/docs`

Redirects to API documentation (same as `/api-docs`).

---

## 🧪 Testing Endpoints in Swagger UI

### Step 1: Open Swagger UI
Visit: `http://localhost:3000/api-docs`

### Step 2: Click on an Endpoint
Find the endpoint you want to test (e.g., GET /)

### Step 3: Click "Try it out"
A button will appear to let you test it

### Step 4: Click "Execute"
You'll see the request and response in real-time!

### Step 5: View Response
See:
- ✅ Response code (200 = success)
- ✅ Response body (the data returned)
- ✅ Response headers
- ✅ curl command (for command line)

---

## 📋 Using curl Command Line

### Test Welcome Endpoint
```bash
curl http://localhost:3000/
```

### Test Health Endpoint
```bash
curl http://localhost:3000/health
```

### Test with Pretty Output (Linux/Mac)
```bash
curl http://localhost:3000/ | json_pp
```

### Test with Windows PowerShell
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/" | ConvertTo-Json
```

---

## 🔗 API Endpoints Summary

| Method | Endpoint | Description | Response Code |
|--------|----------|-------------|----------------|
| GET | `/` | Welcome message | 200 |
| GET | `/health` | Server health status | 200 |
| GET | `/docs` | Redirect to API docs | 302 |
| GET | `/api-docs` | Swagger UI interface | 200 |

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request worked perfectly |
| 302 | Redirect | Redirected to another page |
| 404 | Not Found | Endpoint doesn't exist |
| 500 | Server Error | Something went wrong |

---

## 🛠️ Adding New Endpoints (Next Steps)

When you add new endpoints, document them in `server.js` using comments like:

```javascript
/**
 * @swagger
 * /your-endpoint:
 *   get:
 *     summary: What this endpoint does
 *     description: Detailed description
 *     tags:
 *       - YourTag
 *     responses:
 *       200:
 *         description: Success message
 */
app.get('/your-endpoint', (req, res) => {
  res.json({ message: 'Your response' });
});
```

Then reload Swagger UI - it will automatically update!

---

## 🧬 API Versions in Response

All endpoints include environment information:
- `development` - Local testing
- `production` - Deployed on Render

This helps you know which version you're using.

---

## 📞 Troubleshooting

### Swagger UI Not Loading?
1. Make sure app is running: `npm run dev`
2. Visit: `http://localhost:3000/api-docs`
3. Check browser console for errors (F12)

### Endpoint Returns 404?
1. Check the path is spelled correctly
2. Check HTTP method (GET, POST, etc.)
3. Visit `/api-docs` to see all available endpoints

### Getting "Cannot GET /something"?
That endpoint doesn't exist. Visit `/api-docs` to see available endpoints.

---

## 🎓 Learn More

### Swagger/OpenAPI Specification
- https://swagger.io/specification/

### Express.js Documentation
- https://expressjs.com/

### REST API Best Practices
- https://restfulapi.net/

---

## 🎉 You Have Professional API Documentation!

Your API now has:
✅ Interactive Swagger UI
✅ Auto-generated documentation
✅ Testing interface built-in
✅ Professional appearance

This is what real companies use! 🚀

---

## 📝 Next Steps

1. **Test your endpoints** in Swagger UI
2. **Add more endpoints** to your API
3. **Document them** using Swagger comments
4. **Deploy changes** to Render
5. **Share your API** with others!

**Visit your API documentation now:** 
```
http://localhost:3000/api-docs
```

Enjoy! 🎊

# Backend Configuration Update - CORS Support

## What's New

The backend has been updated to support CORS (Cross-Origin Resource Sharing) to allow the React frontend to communicate from a different origin.

## CORS Configuration

The backend now includes CORS middleware that:
- Allows frontend requests from `http://localhost:5173` (default Vite dev server)
- Enables credentials for session-based authentication
- Supports all required HTTP methods: GET, POST, PUT, DELETE, OPTIONS
- Includes necessary headers for authentication

### Configuration File: `src/app.ts`

CORS is configured before all routes:

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
```

## Environment Variables

### New Variable

- **`FRONTEND_URL`** (Optional)
  - Description: URL of the frontend application
  - Default: `http://localhost:5173`
  - Example: `https://yourdomain.com` (for production)

### Usage

1. Create or update `.env` file in the backend root:

```env
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

2. For production, set the frontend URL:

```env
FRONTEND_URL=https://yourdomain.com
```

## Running Backend and Frontend Together

### Terminal 1 - Backend (port 3000)
```bash
cd node_example
npm run dev
```

### Terminal 2 - Frontend (port 5173)
```bash
cd react_frontend
npm run dev
```

Both services will now communicate seamlessly with CORS enabled.

## Testing CORS

You can test CORS with curl:

```bash
curl -X GET http://localhost:3000/health \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -v
```

Look for CORS headers in the response:
- `access-control-allow-origin: http://localhost:5173`
- `access-control-allow-credentials: true`

## Production Deployment

When deploying to production:

1. Update `FRONTEND_URL` environment variable to your production frontend domain
2. Set `NODE_ENV=production`
3. Ensure both backend and frontend are served over HTTPS
4. Configure session cookie security with `secure: true` in production

Example production `.env`:

```env
PORT=3000
NODE_ENV=production
SESSION_SECRET=production-secret-key-here
FRONTEND_URL=https://yourdomain.com
```

## Troubleshooting

### CORS Errors in Frontend

If you see CORS errors in the browser console:

1. **Check backend is running**: Verify backend is running on port 3000
2. **Check FRONTEND_URL**: Ensure it matches your frontend URL
3. **Clear browser cache**: Sometimes cached CORS policies cause issues
4. **Check browser console**: Look for specific error messages

### Session Not Persisting

If authentication session is not persisting across requests:

1. Verify `credentials: true` is set in both:
   - Backend CORS configuration
   - Frontend Axios client (`withCredentials: true`)
2. Check that cookies are HTTP-only and secure (production)
3. Ensure session middleware is enabled before routes

## Additional Notes

- CORS is applied globally before all routes
- Session-based authentication uses secure HTTP-only cookies
- The frontend must send requests with `credentials: 'include'` (already configured in Axios)
- Wildcard CORS (`origin: '*'`) is NOT used for security reasons

## Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Middleware](https://github.com/expressjs/cors)
- [Axios Credentials](https://axios-http.com/docs/instance)

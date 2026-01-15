# Past Question Finder - API Documentation

## Base URL
```
Production: https://api.pqfinder.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User (Sign Up)
**POST** `/auth/register`

**Note:** New users are registered as `student` by default. Only platform administrators can assign `admin` role. Students can browse and download PQs, but cannot upload.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "school": "University of Lagos"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "school": "University of Lagos",
      "role": "student",
      "balance": 0,
      "createdAt": "2024-03-20T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Email already exists"
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "school": "University of Lagos",
      "role": "student",
      "balance": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "Email or password is incorrect"
}
```

---

### 3. Logout
**POST** `/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "school": "University of Lagos",
    "role": "admin",
    "balance": 8500,
    "createdAt": "2024-03-20T10:00:00Z"
  }
}
```

---

## 📚 Past Question Endpoints

### 5. Search Past Questions
**GET** `/pqs`

**Query Parameters:**
- `q` (string, optional): Search query
- `university` (string, optional): Filter by university
- `course` (string, optional): Filter by course
- `level` (string, optional): Filter by level (e.g., "100 Level")
- `year` (string, optional): Filter by year
- `status` (string, optional): Filter by status ("verified" | "pending")
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 12)

**Example:** `/pqs?q=computer&university=University of Lagos&level=100 Level&page=1&limit=12`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "pqs": [
      {
        "id": "pq_001",
        "university": "University of Lagos",
        "course": "Computer Science 101",
        "level": "100 Level",
        "year": "2023",
        "semester": "First Semester",
        "uploader": {
          "id": "user_123",
          "name": "John Doe"
        },
        "fileUrl": "https://storage.pqfinder.com/pqs/pq_001.pdf",
        "thumbnailUrl": "https://storage.pqfinder.com/thumbnails/pq_001.jpg",
        "status": "verified",
        "downloads": 245,
        "uploadDate": "2024-01-15T10:00:00Z",
        "verifiedAt": "2024-01-16T14:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 45,
      "totalPages": 4
    }
  }
}
```

---

### 6. Get Single Past Question
**GET** `/pqs/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "pq_001",
    "university": "University of Lagos",
    "course": "Computer Science 101",
    "level": "100 Level",
    "year": "2023",
    "semester": "First Semester",
    "uploader": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "fileUrl": "https://storage.pqfinder.com/pqs/pq_001.pdf",
    "thumbnailUrl": "https://storage.pqfinder.com/thumbnails/pq_001.jpg",
    "fileSize": 2048576,
    "status": "verified",
    "downloads": 245,
    "uploadDate": "2024-01-15T10:00:00Z",
    "verifiedAt": "2024-01-16T14:30:00Z",
    "relatedPQs": [
      {
        "id": "pq_002",
        "course": "Computer Science 201",
        "university": "University of Lagos",
        "level": "200 Level",
        "year": "2023",
        "status": "verified",
        "downloads": 189
      }
    ]
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Not found",
  "message": "Past question not found"
}
```

---

### 7. Upload Past Question (Admin Only)
**POST** `/pqs/upload`

**Note:** This endpoint is restricted to users with `admin` role only. Students cannot upload questions.

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `university` (string, required): University name
- `course` (string, required): Course name
- `level` (string, required): Level (e.g., "100 Level")
- `year` (string, required): Year (e.g., "2023")
- `semester` (string, optional): Semester ("First Semester" | "Second Semester")
- `file` (file, required): PDF/PNG/JPEG file (max 10MB)

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Past question uploaded successfully",
  "data": {
    "id": "pq_001",
    "university": "University of Lagos",
    "course": "Computer Science 101",
    "level": "100 Level",
    "year": "2023",
    "semester": "First Semester",
    "status": "pending",
    "uploadDate": "2024-03-20T10:00:00Z",
    "message": "Your upload is pending verification. You will be notified once it's verified."
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Duplicate past question detected",
  "details": {
    "existingPQ": {
      "id": "pq_002",
      "course": "Computer Science 101",
      "university": "University of Lagos",
      "level": "100 Level",
      "year": "2023"
    }
  }
}
```

**Error Response:** `403 Forbidden` (Non-admin user)
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Only administrators can upload past questions"
}
```

---

### 8. Download Past Question
**GET** `/pqs/:id/download`

**Query Parameters:**
- `quality` (string, optional): "720p" | "1080p" (default: "1080p")

**Response:** `200 OK`
- Content-Type: `application/pdf` or `image/jpeg`
- Content-Disposition: `attachment; filename="pq_001.pdf"`
- File stream

**Note:** Track download count and update user earnings

---

## 👤 User Dashboard Endpoints

### 9. Get User Dashboard Stats
**GET** `/dashboard/stats`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "balance": 8500,
    "totalEarnings": 12500,
    "pendingPQs": 2,
    "verifiedPQs": 8,
    "totalUploads": 10,
    "thisMonthEarnings": 2300,
    "pendingWithdrawal": 0,
    "withdrawalThreshold": 5000
  }
}
```

---

### 10. Get User Uploads
**GET** `/dashboard/uploads`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (string, optional): Filter by status ("all" | "pending" | "verified")
- `q` (string, optional): Search query
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "uploads": [
      {
        "id": "pq_001",
        "university": "University of Lagos",
        "course": "Computer Science 101",
        "level": "100 Level",
        "year": "2023",
        "semester": "First Semester",
        "status": "verified",
        "downloads": 245,
        "earnings": 500,
        "uploadDate": "2024-01-15T10:00:00Z",
        "verifiedAt": "2024-01-16T14:30:00Z"
      }
    ],
    "stats": {
      "total": 10,
      "verified": 8,
      "pending": 2
    },
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 10,
      "totalPages": 1
    }
  }
}
```

---

### 11. Get Earnings History
**GET** `/dashboard/earnings`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page
- `type` (string, optional): Filter by type ("earning" | "withdrawal")

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "currentBalance": 8500,
    "totalEarnings": 12500,
    "thisMonthEarnings": 2300,
    "pendingWithdrawal": 0,
    "withdrawalThreshold": 5000,
    "history": [
      {
        "id": "earning_001",
        "date": "2024-03-15T10:00:00Z",
        "type": "earning",
        "description": "Computer Science 101 - University of Lagos",
        "amount": 500,
        "downloads": 25,
        "pqId": "pq_001"
      },
      {
        "id": "withdrawal_001",
        "date": "2024-02-20T10:00:00Z",
        "type": "withdrawal",
        "description": "Withdrawal",
        "amount": -5000,
        "status": "completed",
        "processedAt": "2024-02-22T14:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

---

### 12. Request Withdrawal
**POST** `/dashboard/withdraw`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 8500,
  "bankAccount": {
    "accountNumber": "1234567890",
    "bankName": "GTBank",
    "accountName": "John Doe"
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Withdrawal request submitted successfully",
  "data": {
    "id": "withdrawal_002",
    "amount": 8500,
    "status": "pending",
    "requestedAt": "2024-03-20T10:00:00Z",
    "estimatedProcessingTime": "3-5 business days"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Insufficient balance",
  "message": "You need ₦1,500 more to reach the withdrawal threshold of ₦5,000"
}
```

---

## ✅ Verification Endpoints (Admin)

### 13. Get Pending Verifications
**GET** `/admin/pqs/pending`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (number, optional)
- `limit` (number, optional)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "pqs": [
      {
        "id": "pq_003",
        "university": "University of Ibadan",
        "course": "Physics 301",
        "level": "300 Level",
        "year": "2024",
        "uploader": {
          "id": "user_123",
          "name": "John Doe"
        },
        "fileUrl": "https://storage.pqfinder.com/pqs/pq_003.pdf",
        "uploadDate": "2024-03-20T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

### 14. Verify Past Question
**POST** `/admin/pqs/:id/verify`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "action": "approve", // "approve" | "reject"
  "reason": "Verified - Clear header and authentic content"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Past question verified successfully",
  "data": {
    "id": "pq_003",
    "status": "verified",
    "verifiedAt": "2024-03-20T15:00:00Z",
    "verifiedBy": "admin_001"
  }
}
```

**Reject Response:**
```json
{
  "success": true,
  "message": "Past question rejected",
  "data": {
    "id": "pq_003",
    "status": "rejected",
    "rejectedAt": "2024-03-20T15:00:00Z",
    "reason": "Duplicate content detected"
  }
}
```

---

## 📝 Report/Feedback Endpoints

### 15. Report Past Question Issue
**POST** `/pqs/:id/report`

**Request Body:**
```json
{
  "issue": "File is corrupted",
  "description": "The PDF file cannot be opened and appears to be corrupted.",
  "reporterEmail": "student@example.com" // Optional
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Report submitted successfully. We will review it shortly.",
  "data": {
    "reportId": "report_001",
    "pqId": "pq_001",
    "submittedAt": "2024-03-20T10:00:00Z"
  }
}
```

---

### 16. Get Reports (Admin)
**GET** `/admin/reports`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (string, optional): "pending" | "resolved" | "all"
- `page` (number, optional)
- `limit` (number, optional)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "reports": [
      {
        "id": "report_001",
        "pqId": "pq_001",
        "pq": {
          "course": "Computer Science 101",
          "university": "University of Lagos"
        },
        "issue": "File is corrupted",
        "description": "The PDF file cannot be opened",
        "reporterEmail": "student@example.com",
        "status": "pending",
        "submittedAt": "2024-03-20T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

## ⚙️ Settings Endpoints

### 17. Update User Profile
**PUT** `/settings/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "school": "University of Ibadan"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_123",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "school": "University of Ibadan",
    "updatedAt": "2024-03-20T10:00:00Z"
  }
}
```

---

### 18. Change Password
**PUT** `/settings/password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Invalid password",
  "message": "Current password is incorrect"
}
```

---

### 19. Update Notification Settings
**PUT** `/settings/notifications`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "emailNotifications": true,
  "pqVerified": true,
  "earningsUpdate": true,
  "withdrawalProcessed": true
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Notification settings updated",
  "data": {
    "emailNotifications": true,
    "pqVerified": true,
    "earningsUpdate": true,
    "withdrawalProcessed": true
  }
}
```

---

## 📊 Analytics Endpoints (Admin)

### 20. Get Platform Statistics
**GET** `/admin/stats`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalPQs": 1250,
    "verifiedPQs": 1100,
    "pendingPQs": 150,
    "totalUsers": 5000,
    "totalUploaders": 250,
    "totalDownloads": 50000,
    "totalEarningsPaid": 500000,
    "pendingReports": 12,
    "recentActivity": [
      {
        "type": "upload",
        "description": "New PQ uploaded",
        "timestamp": "2024-03-20T10:00:00Z"
      }
    ]
  }
}
```

---

## 🔍 Utility Endpoints

### 21. Get Universities List
**GET** `/utils/universities`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    "University of Lagos",
    "University of Ibadan",
    "Obafemi Awolowo University",
    "Ahmadu Bello University",
    "University of Nigeria"
  ]
}
```

---

### 22. Get Courses List
**GET** `/utils/courses`

**Query Parameters:**
- `university` (string, optional): Filter by university

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology"
  ]
}
```

---

### 23. Check Duplicate PQ
**POST** `/pqs/check-duplicate`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "university": "University of Lagos",
  "course": "Computer Science 101",
  "level": "100 Level",
  "year": "2023",
  "semester": "First Semester"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "isDuplicate": true,
  "data": {
    "existingPQ": {
      "id": "pq_001",
      "course": "Computer Science 101",
      "university": "University of Lagos",
      "level": "100 Level",
      "year": "2023"
    }
  }
}
```

---

## 📋 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message",
  "details": {} // Optional additional error details
}
```

### Common HTTP Status Codes:
- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error or bad request
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## 🔒 Authentication & Authorization

### Token Format
JWT tokens with the following payload:
```json
{
  "userId": "user_123",
  "email": "john.doe@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Roles
- `student` - Can search and download PQs only
- `admin` - Can upload PQs, verify PQs, and manage platform

---

## 📝 Notes

1. **File Upload Limits:**
   - Max file size: 10MB
   - Allowed formats: PDF, PNG, JPEG
   - Files are stored in cloud storage (S3/Cloudinary)

2. **Earnings Calculation:**
   - Verified PQs earn ₦20 per download
   - Minimum withdrawal: ₦5,000
   - Withdrawal processing: 3-5 business days

3. **Verification Process:**
   - PQs are verified by admin within 24-48 hours
   - Checks for duplicates, clarity, and authenticity
   - Uploaders notified via email when verified/rejected

4. **Rate Limiting:**
   - Search: 100 requests/minute
   - Upload: 10 requests/hour per user
   - Download: 50 requests/hour per IP

5. **Pagination:**
   - Default page size: 12 items
   - Max page size: 100 items

---

## 🧪 Example API Calls

### Search PQs
```bash
curl -X GET "https://api.pqfinder.com/v1/pqs?q=computer&university=University%20of%20Lagos&page=1&limit=12"
```

### Upload PQ
```bash
curl -X POST "https://api.pqfinder.com/v1/pqs/upload" \
  -H "Authorization: Bearer <token>" \
  -F "university=University of Lagos" \
  -F "course=Computer Science 101" \
  -F "level=100 Level" \
  -F "year=2023" \
  -F "semester=First Semester" \
  -F "file=@/path/to/file.pdf"
```

### Login
```bash
curl -X POST "https://api.pqfinder.com/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

**Last Updated:** March 2024
**API Version:** v1


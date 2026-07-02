# Notification System Design
## Stage 1 – REST API Design
### Objective
Design REST APIs for a notification platform that allows students to receive and manage notifications.
---
### 1. Get All Notifications
**Endpoint**
GET /notifications
**Description**
Returns all notifications of a student.
**Response**
```json
{
  "notifications": [
    {
      "id": "1",
      "type": "Placement",
      "message": "Google interview scheduled",
      "isRead": false,
      "timestamp": "2026-07-02T09:30:00Z"
    }
  ]
}
```
---
### 2. Get Notification by ID
**Endpoint**
GET /notifications/{id}
**Description**
Returns a single notification.
---
### 3. Mark Notification as Read

**Endpoint**

PATCH /notifications/{id}/read

**Description**

Marks one notification as read.

**Response**

```json
{
  "message": "Notification marked as read"
}
```

---

### 4. Mark All Notifications as Read

**Endpoint**

PATCH /notifications/read-all

**Description**

Marks all notifications as read.

---

### 5. Get Notifications by Type

**Endpoint**

GET /notifications?type=Placement

**Description**

Returns notifications filtered by notification type.

---

### Status Codes

- 200 OK
- 201 Created
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error
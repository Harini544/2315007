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

## Stage 2 - Database Design
### Selected Database
**PostgreSQL**
### Why PostgreSQL?
PostgreSQL is selected because:
- It provides ACID-compliant transactions.
- It efficiently handles large datasets.
- Supports indexing for faster notification retrieval.
- Excellent support for filtering and sorting.
- Highly reliable and scalable.

## Stage 3 - SQL Query Optimization

### Existing Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

### Is the Query Correct?

Yes. The query correctly retrieves all unread notifications of a specific student and sorts them by the notification creation time in ascending order.

### Why is the Query Slow?

The query becomes slow because the notifications table contains millions of records. Without proper indexing, the database performs a full table scan to find matching rows. The ORDER BY clause also requires additional sorting, which further increases execution time when suitable indexes are not available.

### Should Every Column be Indexed?

No. Creating indexes on every column is not recommended because:

- It increases storage consumption.
- INSERT, UPDATE and DELETE operations become slower.
- Indexes require additional maintenance.
- Only frequently searched and sorted columns should be indexed.

### Recommended Indexes

To improve performance, the following indexes should be created:

- Primary Key on `id`
- Index on `studentID`
- Composite Index on `(studentID, isRead)`
- Composite Index on `(studentID, createdAt)`
- Index on `notificationType`

These indexes allow PostgreSQL to quickly locate unread notifications of a student without scanning the complete table.

### Optimized Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

The SQL query remains the same. However, after creating the recommended indexes, PostgreSQL uses Index Scan instead of Full Table Scan, significantly improving execution time.

### Query to Find Students Who Received Placement Notifications in the Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= CURRENT_DATE - INTERVAL '7 days';
```

### Performance Improvement

Using the recommended indexing strategy provides the following benefits:

- Faster notification retrieval.
- Reduced query execution time.
- Efficient filtering and sorting.
- Better scalability for millions of notification records.
- Improved overall database performance.


## Stage 4 - Performance Improvement

### Problem Statement

Currently, the application fetches all notifications from the database whenever a student opens the application. As the number of users and notifications grows, this approach causes high database load, slower response times, and poor user experience.

### Proposed Solutions

#### 1. Pagination

Instead of fetching all notifications at once, retrieve notifications in smaller batches (for example, 20 notifications per request).

**Advantages**

- Reduces database load.
- Faster API response.
- Lower memory usage.
- Better user experience.

**Tradeoff**

- Requires multiple API calls when users scroll through notifications.

---

#### 2. Caching

Store recently accessed notifications in an in-memory cache such as Redis.

**Advantages**

- Very fast response time.
- Reduces repeated database queries.
- Improves application scalability.

**Tradeoff**

- Cached data may become stale if not updated properly.
- Additional cache management is required.

---

#### 3. Lazy Loading / Infinite Scrolling

Load only the first few notifications initially and fetch more when the user scrolls down.

**Advantages**

- Faster initial page load.
- Lower bandwidth usage.
- Better user experience.

**Tradeoff**

- Requires additional frontend implementation.

---

#### 4. Background Synchronization

Load notifications in the background after the application starts instead of blocking the user interface.

**Advantages**

- Faster application startup.
- Improved responsiveness.

**Tradeoff**

- Newly arrived notifications may appear with a slight delay.

---

#### 5. Database Indexing

Use indexes on frequently searched columns such as:

- studentID
- isRead
- notificationType
- createdAt

**Advantages**

- Faster query execution.
- Efficient filtering and sorting.

**Tradeoff**

- Slightly slower INSERT and UPDATE operations.
- Additional storage for indexes.

---

### Recommended Solution

A combination of the following techniques provides the best performance:

- Pagination
- Redis Caching
- Lazy Loading
- Proper Database Indexing

This approach minimizes database load, improves scalability, and provides a smooth user experience even when millions of notifications are stored.

### Expected Outcome

- Faster notification retrieval.
- Reduced database workload.
- Improved scalability.
- Better response time.
- Smooth user experience for all students.
# Sweet Shop System Backend

## Overview
The **Sweet Shop System** is a backend application built using **Node.js, Express, and MongoDB** that allows users to register, log in, manage profiles, and interact with a sweet shop system. It includes a fully tested API following **Red → Green → Refactor** methodology, ensuring code quality and maintainability.

This project demonstrates my ability to:

- Build **RESTful APIs** with Express.
- Structure backend projects professionally (Models, Controllers, Services, Routes, Middleware).
- Implement **user authentication** with **JWT tokens**.
- Write **unit and integration tests** using **Jest**.
- Maintain clean Git history for assessments.

---

## Features

### Phase 1 – Project Setup
- Initialized backend with Express.
- Configured MongoDB connection.
- Setup Jest for testing.
- Base folder structure for scalability.

### Phase 2 – Login API
- User login with **email & password**.
- Password hashing using **bcrypt**.
- JWT token generation and verification.
- Auth middleware to protect routes.
- Comprehensive tests for login endpoints.

### Phase 3 – User Profile API
- Get user profile: `GET /api/auth/profile`
- Update user profile: `PUT /api/auth/profile`
- Proper validation and error handling.
- Tests covering success, failure, and edge cases.

### Phase 4 – (Optional Next Steps)
- Logout endpoint.
- JWT refresh token logic.
- Extendable for sweet shop products, cart, and orders.

---

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Testing:** Jest
- **Version Control:** Git (Red → Green → Refactor commits)
- **Environment Management:** `.env` files

---

## Project Structure
sweet-shop-backend/
│
├─ src/
│ ├─ controllers/ # Handles request logic
│ ├─ models/ # Mongoose models
│ ├─ routes/ # API routes
│ ├─ services/ # Business logic
│ ├─ middleware/ # Auth & error handling
│ ├─ tests/ # Jest test files
│ └─ app.js # Express app setup
│
├─ .env.example # Sample env file
├─ package.json
├─ jest.config.js
└─ README.md



---


---

## How to Run

1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd sweet-shop-backend
```
2.Install dependencies:
```bash npm install ```
3.Create a .env file based on .env.example:
```bash
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
PORT=5000
```
4.run server
```bash
npm run dev
```
5.Run test
```bash
npm test
```


| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Login a user, return JWT      |
| GET    | `/api/auth/profile`  | Get logged-in user profile    |
| PUT    | `/api/auth/profile`  | Update logged-in user profile |


Contact

For any questions or collaboration:

Name: Nitesh Kumar

Email: niteshkumar24.com


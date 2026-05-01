# bank-app
# Mini Digital Banking System (Fintech Project)

A full-stack fintech-style banking application that simulates core digital banking operations. Users can create accounts, perform mock deposits and withdrawals, transfer funds, and view transaction history through a clean dashboard interface.

### Features

* User authentication (JWT-based)
* Wallet balance management
* Deposit & withdrawal (mock transactions)
* Secure money transfer between users
* Transaction history with status tracking (pending, success, failed)
* Interactive React dashboard UI

### Tech Stack

* **Backend:** Java, Spring Boot, Spring Security, JPA
* **Frontend:** React, TailwindCSS
* **Database:** SQL / Postgres
* **DevOps:** CI/CD ready (GitHub Actions), deployable to AWS / Render / Vercel

### Key Concepts Implemented

* Layered architecture (Controller → Service → Repository)
* RESTful API design
* Transaction consistency & validation (e.g., preventing negative balance)
* JWT authentication & request filtering
* API integration (client ↔ server communication)

### User Flow

Login → Dashboard → Perform Transactions → View History

### Notes

* This is a **mock fintech system** (no real payments involved)
* Focused on **clean architecture, correctness, and learning best practices**

---

A solid foundation for building real-world fintech applications.


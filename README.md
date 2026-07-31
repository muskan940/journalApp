<div align="center">

# 📔 Inkwell — Journal App Backend

**A secure REST API for personal journaling, built with Spring Boot, MongoDB, and JWT authentication.**

[![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-brightgreen?logo=spring)](https://spring.io/projects/spring-boot)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-Educational-blue)](#license)

[Frontend Repository](https://github.com/muskan940/journal-frontend-react) · [Report an Issue](https://github.com/muskan940/journalApp/issues)

</div>

---

## Overview

Inkwell's backend powers a private journaling app where users can register, authenticate, and manage their own journal entries. Every entry is automatically analyzed for sentiment, giving users lightweight insight into their mood over time.

## ✨ Features

- **🔐 JWT Authentication** — stateless, secure signup and login
- **📝 Journal CRUD** — full create, read, update, and delete for personal entries
- **🎭 Sentiment Analysis** — entries are auto-tagged with a mood (Happy, Sad, Angry, Anxious)
- **🌦️ Weather-aware Greetings** — personalized daily greeting via a live weather API
- **📧 Scheduled Emails** — background reminders powered by Spring's task scheduler
- **🗄️ MongoDB Atlas** — cloud-hosted, scalable document storage
- **⚡ Redis Caching** — optional caching layer for improved performance
- **🌐 CORS-ready** — designed to pair with a separate frontend application

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.5 |
| Security | Spring Security · JWT (JJWT) |
| Database | MongoDB (Spring Data MongoDB) |
| Cache | Redis (Spring Data Redis) |
| Build Tool | Maven |
| Email | Spring Boot Starter Mail |

## 📁 Project Structure

```
src/main/java/net/engineeringdigest/journalApp/
├── config/          Security, CORS, and application-level configuration
├── controller/       REST controllers — Journal, User, Admin, Public
├── entity/            MongoDB document models — User, JournalEntry
├── enums/              Sentiment enum
├── filter/              JWT authentication filter
├── repository/           Spring Data MongoDB repositories
├── Services/               Business logic — User, Email, Sentiment analysis
├── schedular/                Scheduled background jobs
└── utilis/                     JWT utility class
```

## 📡 API Reference

All routes are served under the context path `/journal`, e.g. `http://localhost:8080/journal/public/login`.

| Method | Endpoint | Description | Auth |
|---|---|---|:---:|
| `POST` | `/public/signup` | Create a new account | — |
| `POST` | `/public/login` | Authenticate and receive a JWT | — |
| `GET` | `/public/health-check` | Service health check | — |
| `GET` | `/journal` | List all entries for the current user | ✅ |
| `POST` | `/journal` | Create a new journal entry | ✅ |
| `GET` | `/journal/id/{id}` | Retrieve a single entry | ✅ |
| `PUT` | `/journal/id/{id}` | Update an entry | ✅ |
| `DELETE` | `/journal/id/{id}` | Delete an entry | ✅ |
| `GET` | `/user` | Personalized greeting for the current user | ✅ |

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven (or the bundled `mvnw` wrapper)
- A MongoDB Atlas cluster (or local MongoDB instance)
- *(Optional)* A Redis instance for caching

### 1. Clone the repository
```bash
git clone https://github.com/muskan940/journalApp.git
cd journalApp
```

### 2. Configure your environment
Credentials are intentionally kept out of version control. Create `src/main/resources/application-dev.yml` using this template:

```yaml
spring:
  data:
    mongodb:
      uri: your-mongodb-connection-string
      database: journaldb
  redis:
    host: your-redis-host
    port: your-redis-port
    password: your-redis-password
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password

server:
  port: 8080
  servlet:
    context-path: /journal

weather:
  api:
    key: your-weather-api-key
```

### 3. Run the application
```bash
./mvnw spring-boot:run
```
Or run `JournalApplication.java` from your IDE with the active profile set to `dev`.

The API will be available at **`http://localhost:8080/journal`**.

## 🔒 Security

This repository excludes all `application*.yml` files via `.gitignore`, since they contain database, cache, and email credentials. Use the template above to create your own local configuration — never commit real credentials.

## 📄 License

This project is for personal and educational use.

## 👩‍💻 Author

**Muskan Gupta**

- GitHub: [@muskan940](https://github.com/muskan940)
- LinkedIn: [Muskan Gupta](https://www.linkedin.com/in/muskan-gupta-699817304)
- LeetCode: [MuskanGupta_2005](https://leetcode.com/u/MuskanGupta_2005/)

---

<div align="center">
Built with ☕ and Spring Boot
</div>

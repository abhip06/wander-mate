# 🌍 Wander Mate

## “Find your journey, not just your destination.”

**Wander Mate** is an anti-social media platform designed to connect like-minded individuals who are interested in traveling together or attending events — either as partners, groups, or even strangers.  
The platform helps users discover travel companions for trips, events, and shared experiences without the noise and pressure of mainstream social media.

Users can search for or get matched with travel buddies based on preferences such as destination, budget, gender, travel style, or purpose of the trip.

---

## 🚀 Project Setup

### 🧩 Tech Stack Overview

| Layer | Technology | Description |
|-------|-------------|--------------|
| **Frontend** | React (Vite) | Fast, modern frontend build tool |
|  | TailwindCSS | Utility-first CSS framework for styling |
|  | Redux Toolkit | State management |
| **Backend** | Spring Boot | RESTful backend service |
|  | Spring Data JPA | ORM for database operations |
|  | Spring Security (JWT) | Authentication & authorization |
| **Database** | PostgreSQL | Relational database |
| **Deployment** | Vercel (Frontend) / AWS EC2 instance (Backend) | Cloud hosting platforms |

---

## 🖥️ Local Development Setup

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java 17+** (JDK 17 or newer)
- **Maven** (or use included wrapper)
- **PostgreSQL** (with an accessible database)
- **Git**

---

## 🧱 Backend Setup (Spring Boot)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhip06/wander-mate.git
   cd wander-mate/backend
   ```

2. **Configure Database**

   Create a PostgreSQL database for the project.

   ```sql
   CREATE DATABASE wander_mate;
   ```

3. **Set up Environment Variables**

    Navigate to the directory:

    ```bash
    cd backend/src/main/resources
    ```

    Open or create the file application.properties (you can also use application.yml if preferred)
    and add the following configuration:

    ```text
    # ===============================
    # = DATABASE CONFIGURATION =
    # ===============================
    spring.datasource.url=jdbc:postgresql://localhost:5432/wander_mate
    spring.datasource.username=your_db_username
    spring.datasource.password=your_db_password

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

    # ===============================
    # = JWT CONFIGURATION =
    # ===============================
    app.jwt.secret=your_jwt_secret_key
    app.jwt.expiration=86400000

    # ===============================
    # = SERVER CONFIGURATION =
    # ===============================
    server.port=8080
    ```

    🧠 Tip:
    For security reasons, don’t commit your real credentials or secret keys to GitHub.
    Use environment variables or a .env file (ignored via .gitignore) for production.

4. **Build & Run the Application**

    Make sure you’re inside the backend directory:

    ```bash
    cd backend
    ```

    Then, clean and build the project:

    ```bash
    mvn clean install
    ```

    Once the build is successful, start the Spring Boot application:

    ```bash
    mvn spring-boot:run
    ```

    Or, if you prefer running it directly through your IDE (IntelliJ / Eclipse),
    
    run the main class:

    ```bash
    com.wandermate.WanderMateApplication
    ```

    Once running successfully, the backend API will be available at:

    👉 http://localhost:8080

    You can verify it by visiting:

    ```bash
    http://localhost:8080/actuator/health
    ```

    (if you have Spring Actuator enabled)
# OpenFinance Engine (Banking Core) 🏦

![Java](https://img.shields.io/badge/Java-21-orange) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green) ![React](https://img.shields.io/badge/React-18-blue) ![Architecture](https://img.shields.io/badge/Architecture-Hexagonal-purple)
## 📋 Project Overview

**OpenFinance Engine** is a robust, modular banking core simulation built to demonstrate **Enterprise-grade** software architecture. It handles sensitive financial operations with strict ACID compliance, auditability, and security.

Unlike simple CRUD apps, this project focuses on:
* **Data Integrity:** Prevents "dirty reads" and race conditions using `SERIALIZABLE` isolation levels.
* **Auditability:** Implements an immutable ledger pattern for all transactions.
* **Architecture:** Decouples business logic from frameworks using **Hexagonal Architecture (Ports & Adapters)**.
* **Security:** Role-based access control (RBAC) with JWT and Idempotency keys for payment safety.

## 🏗 Architecture

The system follows the **Hexagonal Architecture** principles:

```mermaid
graph TD
    User((User)) --> API[API REST / Adapter]
    API --> Service[Application Services / Ports]
    Service --> Domain[Domain Model (Pure Java)]
    Service --> Repo[Persistence Adapter]
    Repo --> DB[(PostgreSQL)]
```

### Tech Stack

**Backend:**
* **Language:** Java 21
* **Framework:** Spring Boot 3.2 (Web, Data JPA, Security)
* **Database:** PostgreSQL 15
* **Testing:** JUnit 5, Mockito, **Testcontainers** (Integration Tests)
* **Tools:** Maven, Docker, Lombok

**Frontend:**
* **Framework:** React 18 (Vite + TypeScript)
* **State Management:** Zustand
* **Styling:** Tailwind CSS + Shadcn/UI
* **Charts:** Recharts

## 🚀 Getting Started

### Prerequisites
* Docker & Docker Compose
* Java 21 JDK
* Node.js 18+

### Quick Start (The "I want to see it run" mode)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/tu-usuario/open-finance-engine.git](https://github.com/tu-usuario/open-finance-engine.git)
    cd open-finance-engine
    ```

2.  **Start the Infrastructure (DB):**
    ```bash
    cd infrastructure
    docker-compose up -d
    ```

3.  **Run Backend:**
    ```bash
    cd ../backend
    ./mvnw spring-boot:run
    ```

4.  **Run Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

## 🛡 Key Features Implemented

### 1. Transactional Integrity
We use `@Transactional(isolation = Isolation.SERIALIZABLE)` for the `TransferUseCase`. This ensures that concurrent withdrawal requests cannot put an account into a negative balance illegally.

### 2. Immutable Audit Log
Every financial movement creates a `Transaction` record AND an `AuditLog` entry with a cryptographic checksum to detect data tampering.

### 3. Idempotency
The API requires an `Idempotency-Key` header for transfers, preventing double-spending if the client retries a request due to network timeouts.

## 🧪 Testing Strategy
* **Unit Tests:** For Domain Logic (Account rules).
* **Integration Tests:** Using **Testcontainers** to spin up a real ephemeral PostgreSQL instance to test the locking mechanisms. H2 is not used to ensure production parity.
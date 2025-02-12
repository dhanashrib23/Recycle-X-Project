# ♻️ RecycleX - Environmental Waste Management & Recycling Platform

## 📌 Project Description

**RecycleX** is an **environmental waste management and recycling platform** that connects waste suppliers with consumers who need processed recyclable materials. The system facilitates efficient waste recycling by linking suppliers and industries while ensuring seamless transactions and management.

### 👥 User Roles

- **Supplier** – Individuals or organizations that sell recyclable waste (plastic, metal, paper, etc.).
- **Consumer** – Industries or businesses that purchase processed recyclable materials for reuse.
- **Admin** – Manages users, monitors transactions, and ensures smooth operations.

---

## 🛠️ Tech Stack & Usage

### 📌 Backend (Node.js + MySQL)

- **Node.js with Express.js** → Handles API requests and business logic.
- **MySQL (JDBC Template with RowMapper)** → Stores and manages application data efficiently.
- **Bcrypt/SHA-256** → Encrypts passwords for enhanced security.
- **JWT (JSON Web Token)** → Manages authentication and session security.
- **JSend API Structure** → Ensures a standardized API response format.

### 🎨 Frontend (React.js)

- **React.js** → Builds the UI for suppliers, consumers, and admin.
- **React Router** → Handles client-side navigation seamlessly.
- **Module.css** → Provides component-specific styling.
- **Bootstrap (Previously used in Hierarchy Beast UI)** → Ensures responsive design elements.
- **Session Storage** → Stores user authentication details (`consumerId`, `token`).

### 🗄️ Database (MySQL + Views Approach)

- **Views (`consumer_v`, `supplier_v`, `consumerorders_v`, etc.)** → Used for interacting with data instead of direct table access.
- **Stored Procedures (`register_supplier`, etc.)** → Implements complex business logic.
- **Enums (`consumer_status`, `supplier_status`)** → Manages user statuses (Active, Inactive).

---

## 🔥 Key Features

✔️ **Secure Authentication** – Uses JWT for authentication and bcrypt for password encryption.  
✔️ **Role-Based Access Control** – Ensures different functionalities for Suppliers, Consumers, and Admin.  
✔️ **Optimized Data Handling** – Implements **views** for better performance and security.  
✔️ **Standardized API Response** – Uses **JSend format** for consistent API communication.  
✔️ **Scalable Architecture** – Built with modular design principles.

---

## 📞 Contact

**Dhanashri Bhosale**  
📧 Email: dhanashribhosale2002@gmail.com

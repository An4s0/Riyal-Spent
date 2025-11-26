CREATE TABLE
    users (
        -- Primary key
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        -- Basic user info
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        -- Security
        password_hash VARCHAR(255) NOT NULL,
        -- Account details
        member_since DATE,
        preferred_currency VARCHAR(10) DEFAULT 'SAR',
        -- Activity
        last_activity DATETIME
    );
CREATE TABLE
    expenses (
        -- Primary key
        expense_id INTEGER PRIMARY KEY,
        -- Relations
        user_id INT NOT NULL,
        category_id INT,
        -- Main data
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        description VARCHAR(255),
        -- Timestamps
        created_at DATETIME,
        last_modified DATETIME,
        -- Foreign keys
        FOREIGN KEY (user_id) REFERENCES user (user_id),
        FOREIGN KEY (category_id) REFERENCES category (category_id)
    );
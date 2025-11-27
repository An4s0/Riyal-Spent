CREATE TABLE
    categories (
        -- Primary key
        category_id INTEGER PRIMARY KEY,
        -- Relation
        user_id INT NOT NULL,
        -- Category info
        name VARCHAR(100) NOT NULL,
        icon VARCHAR(50),
        color_code VARCHAR(7), 
        -- Timestamp
        created_at DATE,
        -- Foreign key
        FOREIGN KEY (user_id) REFERENCES user (user_id)
    );
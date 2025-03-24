CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_category VARCHAR(50) NOT NULL,
    level_completed INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, game_category)
); 
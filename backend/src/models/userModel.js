const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const userModel = {
  async create(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;

    try {
      const result = await pool.query(query, [name, email, hashedPassword]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(userId, userData) {
    const { name, avatar } = userData;
    const query = `
      UPDATE users
      SET name = $1, avatar = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, name, email, avatar;
    `;

    try {
      const result = await pool.query(query, [name, avatar, userId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async createAdmin(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, 'admin')
      RETURNING id, name, email, role;
    `;

    try {
      const result = await pool.query(query, [name, email, hashedPassword]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async findAll() {
    const query = `
      SELECT id, name, email, role, avatar, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async delete(userId) {
    const query = 'DELETE FROM users WHERE id = $1';
    try {
      await pool.query(query, [userId]);
      return true;
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    const query = `
      SELECT id, name, email, role, avatar, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error en findById:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    const query = 'SELECT id, name, email, role FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
};

module.exports = userModel; 
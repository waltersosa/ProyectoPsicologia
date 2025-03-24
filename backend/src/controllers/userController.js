const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Verificar si el correo es del dominio pucese.edu.ec
      if (!email.endsWith('@pucese.edu.ec')) {
        return res.status(400).json({
          error: 'Solo se permiten correos con dominio @pucese.edu.ec'
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          error: 'El correo electrónico ya está registrado'
        });
      }

      // Crear el nuevo usuario
      const user = await userModel.create({ name, email, password });

      // Generar token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error al registrar el usuario'
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log('📧 Intento de login con email:', email);

      // Buscar usuario
      const user = await userModel.findByEmail(email);
      console.log('👤 Usuario encontrado:', {
        found: !!user,
        id: user?.id,
        email: user?.email,
        role: user?.role
      });

      if (!user) {
        console.log('❌ Usuario no encontrado');
        return res.status(401).json({
          error: 'Credenciales inválidas'
        });
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('🔑 Contraseña válida:', isValidPassword);
      console.log('🔐 Contraseña proporcionada:', password);
      console.log('🗝️ Hash almacenado:', user.password);

      if (!isValidPassword) {
        console.log('❌ Contraseña incorrecta');
        return res.status(401).json({
          error: 'Credenciales inválidas'
        });
      }

      // Generar token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('✅ Login exitoso');
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('❌ Error detallado:', error);
      res.status(500).json({
        error: 'Error al iniciar sesión'
      });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user.id; // Obtenido del middleware de autenticación
      const userData = req.body;

      const updatedUser = await userModel.updateProfile(userId, userData);
      res.json({
        message: 'Perfil actualizado exitosamente',
        user: updatedUser
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({
        error: 'Error al actualizar el perfil'
      });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userModel.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        error: 'Error al obtener la lista de usuarios'
      });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userModel.delete(id);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        error: 'Error al eliminar el usuario'
      });
    }
  },

  async getProfile(req, res) {
    try {
      const userId = req.user.id; // Obtenido del middleware de autenticación
      const user = await userModel.getUserById(userId);
      res.json(user); // Asegúrate de que se devuelvan todos los datos del usuario
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    }
  }
};

module.exports = userController; 
require('dotenv').config();
const userModel = require('../models/userModel');

async function createAdminUser() {
  try {
    const adminData = {
      name: 'Administrador',
      email: 'admin@pucese.edu.ec',
      password: 'Admin123',
    };

    console.log('Creando usuario administrador con:', {
      email: adminData.email,
      name: adminData.name
    });

    const admin = await userModel.createAdmin(adminData);
    console.log('✅ Usuario administrador creado exitosamente:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    });
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el administrador:', error);
    process.exit(1);
  }
}

createAdminUser(); 
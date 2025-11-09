// cnn_mongodb.js
import mongoose from 'mongoose';

let isConnected = false;

const conectarAMongoDB = async () => {
  if (isConnected) {
    console.log('Ya está conectado a MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isConnected = true;
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.log(' Error al conectar a MongoDB:'.red);
  }
};

const db = mongoose.connection;

db.on('error', (error) => {
  isConnected = false;
  console.log('Error al conectar a MongoDB:'.red, error);
});

db.on('open', () => {
  isConnected = true;
  console.log('Conexión abierta a MongoDB'.green);
});

db.on('disconnected', () => {
  isConnected = false;
  console.log('Desconectado de MongoDB'.yellow);
});

// Manejar cierre del proceso (Ctrl + C)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB desconectado por cierre de la aplicación'.yellow);
  process.exit(0);
});

export { conectarAMongoDB, isConnected };

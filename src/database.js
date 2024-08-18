import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/companydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,  // Tiempo de espera para la conexión, 10 segundos
})
  .then(() => console.log('DB is connected'))
  .catch(error => console.error('Base de datos no conectada...', error));

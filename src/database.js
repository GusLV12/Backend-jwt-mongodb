import mongoose from 'mongoose';

export const pool = mongoose.connect("mongodb://localhost/companydb", {
  useNewUrlParser: true,
  useInifiedTopoly: true
})
  .then(db => console.log('Db is connected', db))
  .catch(error => console.log(error))
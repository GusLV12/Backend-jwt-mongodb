import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/companydb", {
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("DB is connected"))
  .catch((error) => console.error("Base de datos no conectada...", error));

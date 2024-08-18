import app, { port } from "./app.js";
import "./database.js";

app.listen(port, () => {
  console.log('Escuhando node', port);
})
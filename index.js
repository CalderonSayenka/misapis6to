import Server from "./server/server.js";
import 'colors';
import dotenv from 'dotenv';

dotenv.config();

const server= new Server();
server.listen();

console.log('hola saleth');
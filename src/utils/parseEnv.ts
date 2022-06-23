import {config} from 'dotenv';

const env = config();
export const PORT = env.parsed?.SOCKET_PORT || 8080;

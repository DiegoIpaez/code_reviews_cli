import axios from 'axios';
import { CONFIG } from '../constants/index.js';

export const ghClient = axios.create({
  baseURL: CONFIG.GITHUB.API_URL,
  headers: {
    Authorization: `Bearer ${CONFIG.GITHUB.TOKEN}`,
  },
});

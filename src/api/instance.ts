import * as axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  timeout: 5000,
});

import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  usuario: {
    nombre: string;
    email: string;
    alias: string;
    registrado: boolean;
    token: number;
  }
}

export async function login(credentials: LoginCredentials) {
  const { email, password } = credentials;
  const { data } = await axios.post<LoginResponse>('/login', { email, password });
  return data.usuario;
}

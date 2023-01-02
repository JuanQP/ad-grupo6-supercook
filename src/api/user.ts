import axios from 'axios';

type GetUserResponse = {
  usuario: (Usuario & {
    id: number;
    preferencias: Etiqueta[];
    recetas: Receta[];
  });
}

type EmailResponse = {
  email: string;
}

type MessageResponse = {
  message: string;
}

type SignUpResponse = {
  email: string;
  alias: string;
}

type PatchUserResponse = Usuario & {
  preferencias: Etiqueta[];
}

type PatchUserData = Partial<Omit<Usuario, "fechaNacimiento"> & {
  id: number;
  fechaNacimiento: Date;
  preferenciaIds?: number[];
}>

export async function getUser() {
  const response = await axios.get<GetUserResponse>('/yo');
  return response.data;
}

export async function recuperarPassword({ email }: Pick<Usuario, "email">) {
  const { data } = await axios.post<EmailResponse>('/recuperarPassword', { email });
  return data;
}

export async function codigoCambioPassword({ email, codigo }: Pick<Usuario, "email" | "codigo">) {
  const { data } = await axios.post<EmailResponse>('/codigoCambioPassword', { email, codigo });
  return data;
}

export async function cambioPassword({ email, password }: Pick<Usuario, "email" | "password">) {
  const { data } = await axios.post<MessageResponse>('/cambioPassword', { email, password });
  return data;
}

export async function signup({ email, alias }: Pick<Usuario, "email" | "alias">) {
  const { data } = await axios.post<SignUpResponse>('/signup', { email, alias });
  return data;
}

export async function patchUser(values: PatchUserData) {
  const data = await axios.patch<PatchUserResponse>('/yo', values);
  return data;
}

// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Model, Response } from 'miragejs';

if (window.server) {
  window.server.shutdown();
}

const CODIGO_RECUPERAR_PASSWORD = '123456';

function middleware(request) {
  try {
    const token = request.requestHeaders.Authorization.split(' ')[1];
    if (Number.isNaN(token)) {
      throw new Error('No autorizado');
    }
    return token;
  } catch (error) {
    return null;
  }
}

const crearServer = () => createServer({
  models: {
    user: Model,
  },

  routes() {
    this.namespace = 'api';

    this.get('/', (schema, request) => {
      const userId = middleware(request);
      return schema.users.find(userId);
    });

    this.post('/login', (schema, request) => {
      const credentials = JSON.parse(request.requestBody);
      const user = schema.users.findBy({
        email: credentials.email,
        password: credentials.password,
      });
      if (!user) {
        return new Response(401, {}, { message: 'Usuario o contraseña incorrectas' });
      }
      const token = user.id;
      return new Response(200, {}, {
        nombre: user.nombre,
        email: user.email,
        alias: user.alias,
        token,
        registrado: user.registrado,
      });
    });

    this.post('/recuperarPassword', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const user = schema.users.findBy({ email: data.email });
      if (!user) {
        return new Response(401, {}, { message: 'No hay ningún usuario registrado con ese email.' });
      }
      user.update({ recuperandoPassword: true });
      return new Response(200, {}, { email: user.email });
    });

    this.post('/codigoCambioPassword', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const user = schema.users.findBy({ email: data.email, recuperandoPassword: true });
      if (!user) {
        return new Response(401, {}, { message: 'Este usuario no está cambiando su contraseña.' });
      }
      if (data.codigo !== CODIGO_RECUPERAR_PASSWORD) {
        return new Response(401, {}, { message: 'Código incorrecto.' });
      }
      return new Response(200, {}, { email: user.email });
    });

    this.post('/cambioPassword', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const user = schema.users.findBy({
        email: data.email,
        recuperandoPassword: true,
      });
      if (!user) {
        return new Response(401, {}, { message: 'Este usuario no está cambiando su contraseña.' });
      }
      user.recuperandoPassword = false;
      user.password = data.password;
      user.save();
      return new Response(200, {}, { message: 'Contraseña modificada exitosamente' });
    });

    this.post('/signup', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const userAlias = schema.users.findBy({
        alias: data.alias,
      });
      const userEmail = schema.users.findBy({
        email: data.email,
      });
      const aliasDisponible = !userAlias;
      const emailDisponible = !userEmail;
      if (!aliasDisponible || !emailDisponible) {
        return new Response(400, {}, {
          aliasDisponible,
          emailDisponible,
          message: 'No es posible registrarse con estos datos.',
        });
      }
      schema.create('user', {
        nombre: '',
        apellido: '',
        email: data.email,
        password: 'registracion',
        recuperandoPassword: false,
        alias: data.alias,
        registrado: false,
      });
      return new Response(200, {}, {
        email: data.email,
        alias: data.alias,
      });
    });

    this.patch('yo', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const userId = middleware(request);
      const user = schema.users.find(userId);
      return user.update({
        ...data,
      });
    });
  },

  seeds(server) {
    server.create('user', {
      nombre: 'Juan',
      apellido: 'Quinteros',
      email: 'juanquinteros@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'juanquinteros',
      registrado: false,
      fechaNacimiento: new Date(),
    });
    server.create('user', {
      nombre: 'Ezequiel',
      apellido: 'Grillo',
      email: 'egrillo@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'egrillo',
      registrado: true,
      fechaNacimiento: new Date(),
    });
    server.create('user', {
      nombre: 'María Laura',
      apellido: 'Severiens',
      email: 'mseveriens@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'mseveriens',
      registrado: true,
      fechaNacimiento: new Date(),
    });
    server.create('user', {
      nombre: 'Diego',
      apellido: 'García',
      email: 'diegofegarcia@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'diegofegarcia',
      registrado: true,
      fechaNacimiento: new Date(),
    });
  },
});

export default crearServer;

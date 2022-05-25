// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Model, Response } from 'miragejs';

if (window.server) {
  window.server.shutdown();
}

const CODIGO_RECUPERAR_PASSWORD = '123456';

const crearServer = () => createServer({
  models: {
    user: Model,
  },

  routes() {
    this.namespace = 'api';

    this.get('/', () => ({ message: 'Hola mundo' }));

    this.post('/login', (schema, request) => {
      const credentials = JSON.parse(request.requestBody);
      const user = schema.users.findBy({
        email: credentials.email,
        password: credentials.password,
      });
      if (!user) {
        return new Response(401, {}, { message: 'Usuario o contraseña incorrectas' });
      }
      return new Response(200, {}, {
        name: user.name,
        email: user.email,
        token: 'token',
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
      return new Response(200, { message: 'Contraseña modificada exitosamente' });
    });
  },

  seeds(server) {
    server.create('user', {
      name: 'Juan Quinteros',
      email: 'juanquinteros@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'juanquinteros',
    });
    server.create('user', {
      name: 'Ezequiel Grillo',
      email: 'egrillo@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'egrillo',
    });
    server.create('user', {
      name: 'María Laura Severiens',
      email: 'mseveriens@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'mseveriens',
    });
    server.create('user', {
      name: 'Diego García',
      email: 'diegofegarcia@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'diegofegarcia',
    });
  },
});

export default crearServer;

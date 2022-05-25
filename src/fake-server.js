// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Model, Response } from 'miragejs';

if (window.server) {
  window.server.shutdown();
}

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
        return new Response(401, {}, { errors: ['Usuario o contraseña incorrectas'] });
      }
      return new Response(200, {}, {
        name: user.name,
        email: user.email,
        token: 'token',
      });
    });
  },

  seeds(server) {
    server.create('user', { name: 'Juan Quinteros', email: 'juanquinteros@uade.edu.ar', password: 'test' });
    server.create('user', { name: 'Ezequiel Grillo', email: 'egrillo@uade.edu.ar', password: 'test' });
    server.create('user', { name: 'María Laura Severiens', email: 'mseveriens@uade.edu.ar', password: 'test' });
    server.create('user', { name: 'Diego García', email: 'diegofegarcia@uade.edu.ar', password: 'test' });
  },
});

export default crearServer;

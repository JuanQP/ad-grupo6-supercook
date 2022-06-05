// eslint-disable-next-line import/no-extraneous-dependencies
import {
  belongsTo, createServer, hasMany, Model, Response, RestSerializer,
} from 'miragejs';

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

function alphabeticalOrder(a, b) {
  return a.localeCompare(b);
}

function esFavorita(receta, favoritos) {
  return favoritos.some((f) => String(f.recetum) === receta.id);
}

const crearServer = () => createServer({
  serializers: {
    user: RestSerializer.extend({
      include: ['recetas', 'favoritos', 'preferencias'],
      embed: true,
    }),
    receta: RestSerializer.extend({
      include: ['user'],
      embed: true,
    }),
    favorito: RestSerializer.extend({
      include: ['user', 'receta'],
    }),
  },
  models: {
    user: Model.extend({
      recetas: hasMany('receta', { inverse: 'user' }),
      favoritos: hasMany('favorito'),
      preferencias: hasMany('preferencia', { inverse: 'user' }),
    }),
    receta: Model.extend({
      favoritos: hasMany('favorito'),
      user: belongsTo('user'),
    }),
    favorito: Model.extend({
      user: belongsTo('user'),
      receta: belongsTo('receta'),
    }),
    preferencia: Model.extend({
      user: belongsTo('user'),
    }),
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

    this.patch('/yo', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      const userId = middleware(request);
      const user = schema.users.find(userId);
      return user.update({
        ...data,
      });
    });

    this.get('/recomendados', function get(schema, request) {
      const userId = middleware(request);
      const { receta: recetas } = this.serialize(schema.receta.all());
      const { favoritos } = this.serialize(schema.favoritos.where({ userId }));
      return {
        recetas: recetas.map((r) => ({
          ...r,
          esFavorita: esFavorita(r, favoritos),
        })),
      };
    });

    this.get('/recetasUltimas', function get(schema, request) {
      const userId = middleware(request);
      const { receta: recetas } = this.serialize(schema.receta.all());
      const sortedRecetas = recetas.sort((a, b) => b.fecha - a.fecha);
      const { favoritos } = this.serialize(schema.favoritos.where({ userId }));
      return {
        recetas: sortedRecetas.map((r) => ({
          ...r,
          esFavorita: esFavorita(r, favoritos),
        })),
      };
    });

    this.get('/ingredienteDeLaSemana', function get(schema, request) {
      const userId = middleware(request);
      const { receta: recetas } = this.serialize(schema.receta.all());
      const { favoritos } = this.serialize(schema.favoritos.where({ userId }));
      return {
        recetas: recetas.map((r) => ({
          ...r,
          esFavorita: esFavorita(r, favoritos),
        })),
      };
    });

    this.get('/preferencias', function get(schema) {
      const { preferencia: preferencias } = this.serialize(schema.preferencia.all());
      return {
        preferencias: preferencias.sort((a, b) => alphabeticalOrder(a.descripcion, b.descripcion)),
      };
    });

    this.get('/recetas/:id', (schema, request) => {
      // return schema.receta.find(request.params.id);
      return {
        receta: {
          nombre: 'Katsu Kare カツカレー',
          userId: 1,
          fecha: new Date(2022, 1, 1),
          descripcion: 'Mi plato favorito de 🇯🇵\nCarne de cerdo frita rebosada en panko con curry 😍',
          fotos: [
            'Imagen 1',
            'Imagen 2',
            'Imagen 3',
          ],
          user: {
            nombre: 'Juan Ignacio',
            apellido: 'Quinteros Parada',
            provincia: 'Ciudad Autónoma de Buenos Aires'
          },
          personas: 6,
          ingredientes: [
            {
              nombre: 'Panko',
              cantidad: 500,
              unidad: 'gr'
            },
            {
              nombre: 'Huevos',
              cantidad: 4,
              unidad: 'u'
            },
            {
              nombre: 'Zanahoria',
              cantidad: 2,
              unidad: 'u'
            },
            {
              nombre: 'Papa',
              cantidad: 2,
              unidad: 'u'
            },
            {
              nombre: 'Carne de cerdo',
              cantidad: 500,
              unidad: 'gr'
            },
            {
              nombre: 'Cebolla',
              cantidad: 1,
              unidad: 'u'
            },
            {
              nombre: 'Golden Curry',
              cantidad: 4,
              unidad: 'u'
            },
            {
              nombre: 'Arroz doble carolina',
              cantidad: 500,
              unidad: 'gr'
            },
            {
              nombre: 'Harina',
              cantidad: 200,
              unidad: 'gr'
            },
          ],
          pasos: [
            {
              descripcion: 'Lavar el arroz doble carolina sumergiéndolo en agua y "masajearlo" hasta quitar todo el almidón',
              media: [],
            },
            {
              descripcion: 'Poner el arroz en olla con sal a gusto y dejarlo cocinar',
              media: [],
            },
            {
              descripcion: 'Rebosar la carne de cerdo primero pasándolo por harina, luego huevo y al final panko',
              media: [],
            },
            {
              descripcion: 'Pelar y cortar en cubitos la papa, zanahoria y cebolla',
              media: [],
            },
            {
              descripcion: 'Poner la papa, zanahoria y cebolla en la olla y agregar aceite por 3 minutos',
              media: [],
            },
            {
              descripcion: 'Agregar 2 vasos y medio de agua a la olla y esperar a que hierva',
              media: [],
            },
            {
              descripcion: 'Con el agua hirviendo, agregar los cubitos de Golden Curry, apagar el fuego y batir hasta que quede espeso',
              media: [],
            },
            {
              descripcion: 'En una sartén poner todas las milanesas de cerdo y fritar',
              media: [],
            },
            {
              descripcion: 'Cuando las 3 cosas estén listas, servir y disfrutar 😄',
              media: [],
            },
          ],
        }
      }
    });
  },

  seeds(server) {
    server.schema.preferencia.create({ descripcion: 'Pollo' });
    server.schema.preferencia.create({ descripcion: 'Hamburguesa' });
    server.schema.preferencia.create({ descripcion: 'Vegetariano' });
    server.schema.preferencia.create({ descripcion: 'Queso' });
    server.schema.preferencia.create({ descripcion: 'Salchicha' });
    server.create('user', {
      nombre: 'Juan',
      apellido: 'Quinteros',
      email: 'juanquinteros@uade.edu.ar',
      password: 'test',
      recuperandoPassword: false,
      alias: 'juanquinteros',
      registrado: false,
      fechaNacimiento: new Date(),
      preferenciaIds: [1, 2],
      descripcion: 'Me gusta la comida 🍕',
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
      preferenciaIds: [2, 3],
      descripcion: 'Me gusta la comida 🍕',
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
      preferenciaIds: [3, 4],
      descripcion: 'Me gusta la comida 🍕',
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
      preferenciaIds: [1, 2, 3, 4],
      descripcion: 'Me gusta la comida 🍕',
    });
    server.schema.receta.create({
      nombre: 'Hamburguesa',
      userId: 2,
      fecha: new Date(2022, 1, 1),
    });
    server.schema.receta.create({
      nombre: 'Fideos',
      userId: 2,
      fecha: new Date(2022, 1, 2),
    });
    server.schema.receta.create({
      nombre: 'Papas Fritas',
      userId: 3,
      fecha: new Date(2022, 1, 3),
    });
    server.schema.receta.create({
      nombre: 'Sushi',
      userId: 4,
      fecha: new Date(2022, 1, 4),
    });
    server.create('favorito', {
      userId: 1,
      recetaId: 1,
    });
    server.create('favorito', {
      userId: 2,
      recetaId: 2,
    });
    server.create('favorito', {
      userId: 3,
      recetaId: 3,
    });
    server.create('favorito', {
      userId: 4,
      recetaId: 4,
    });
  },
});

export default crearServer;

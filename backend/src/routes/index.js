import emailRoutes from './emails.js';

async function routes(fastify, options) {
  fastify.register(emailRoutes, { prefix: '/emails' });
}

export default routes;

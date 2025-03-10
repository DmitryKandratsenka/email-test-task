import { addEmail, getEmailById, getEmails } from '../services/email.service.js';

async function getEmailsHandler(request, reply) {
  const { search } = request.query;
  try {
    return await getEmails(search);
  } catch (error) {
    request.log.error(error);
    throw request.fastify.httpErrors.internalServerError('Database query failed');
  }
}

async function getEmailByIdHandler(request) {
  const { id } = request.params;
  try {
    const email = await getEmailById(id);

    if (!email) {
      throw request.fastify.httpErrors.notFound('Email not found');
    }

    return email;
  } catch (error) {
    request.log.error(error);
    throw request.fastify.httpErrors.internalServerError('Database query failed');
  }
}

async function createEmailHandler(request, reply) {
  const { to, cc, bcc, subject, body } = request.body;
  try {

    const [id] = await addEmail({ to, cc, bcc, subject, body });

    return { id, to, cc, bcc, subject, body };
  } catch (error) {
    request.log.error(error);
    throw request.fastify.httpErrors.internalServerError('Failed to add email');
  }
}

const getEmailsSchema = {
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string', nullable: true },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          to: { type: 'string' },
          cc: { type: 'string' },
          bcc: { type: 'string' },
          subject: { type: 'string' },
          body: { type: 'string' },
        },
      },
    },
  },
};

const getEmailByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        to: { type: 'string' },
        cc: { type: 'string' },
        bcc: { type: 'string' },
        subject: { type: 'string' },
        body: { type: 'string' },
      },
    },
  },
};

const createEmailSchema = {
  body: {
    type: 'object',
    required: ['to', 'subject', 'body'],
    properties: {
      to: { type: 'string' },
      cc: { type: 'string' },
      bcc: { type: 'string' },
      subject: { type: 'string' },
      body: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        to: { type: 'string' },
        cc: { type: 'string' },
        bcc: { type: 'string' },
        subject: { type: 'string' },
        body: { type: 'string' },
      },
    },
  },
};

async function emailRoutes(fastify) {
  fastify.get('/', { schema: getEmailsSchema }, getEmailsHandler);
  fastify.get('/:id', { schema: getEmailByIdSchema }, getEmailByIdHandler);
  fastify.post('/', { schema: createEmailSchema }, createEmailHandler);
}

export default emailRoutes;

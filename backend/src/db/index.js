import knexLib from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './db.sqlite'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, '../../migrations'),
  },
};

const knex = knexLib(knexConfig);

export class DB {
  static async addEmail(data) {
    return knex('emails').insert(data);
  }

  static async getEmails(search) {
    let query = knex('emails').orderBy('created_at', 'desc');
    if (search) {
      query.where((builder) => {
        builder
        .where('to', 'like', `%${search}%`)
        .orWhere('cc', 'like', `%${search}%`)
        .orWhere('bcc', 'like', `%${search}%`)
        .orWhere('subject', 'like', `%${search}%`)
        .orWhere('body', 'like', `%${search}%`);
      });
    }
    return query;
  }

  static async getEmailById(id) {
    return knex('emails').where({ id }).first();
  }
}

export default knexConfig;

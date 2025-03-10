import { DB } from '../db/index.js';

export async function getEmails(search) {
  return DB.getEmails(search);
}

export async function getEmailById(id) {
  return DB.getEmailById(id);
}

export async function addEmail({ to, cc, bcc, subject, body }) {
  return DB.addEmail({ to, cc, bcc, subject, body });
}

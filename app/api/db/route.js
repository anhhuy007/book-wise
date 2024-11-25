import { neon } from '@neondatabase/serverless';

export async function GET(request) {
  const data = await getData();

  return new Response(JSON.stringify({ data }));
}

async function getData() {
  const sql = neon(process.env.DATABASE_URL_DEV);
  const response = await sql`SELECT version()`;

  return response[0].version;
}

import { sql } from '@vercel/postgres';

// This helper function ensures we can run queries easily anywhere
export async function dbQuery(queryString: string, values: any[] = []) {
  try {
    const result = await sql.query(queryString, values);
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data');
  }
}

export { sql };
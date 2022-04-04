import { config } from 'dotenv-safe';
import postgres from 'postgres';

//
config();
const sql = postgres();
const scoreboard = await sql`
SELECT * FROM scoreboard`;
sql.end();

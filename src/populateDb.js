import pg from 'pg';
import axios from 'axios';

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
});


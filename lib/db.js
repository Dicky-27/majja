// import mysql from 'serverless-mysql';
import mysql2 from 'mysql2';

const db = mysql2.createPool({
  host: process.env.NEXT_PUBLIC_DATABASE_HOST,
  port:  process.env.NEXT_PUBLIC_DATABASE_PORT,
  database:  process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  user:  process.env.NEXT_PUBLIC_MYSQL_USER,
  password:  process.env.NEXT_PUBLIC_MYSQL_PASSWORD
});

export default async function excuteQuery({ query, values }) {
  try {
    const promisePool = db.promise();
    const [rows,fields] = await promisePool.query(query, values);
    return rows;
  } catch (error) {
    return { error };
  }
}
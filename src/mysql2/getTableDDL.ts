import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// データベース接続情報の設定
const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

// DDLを取得する関数
export async function getTableDDL(tableName: string): Promise<string> {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    // SHOW CREATE TABLE クエリを実行してDDLを取得
    const [rows] = await connection.execute(
      `SHOW CREATE TABLE \`${tableName}\``
    );

    // 結果を解析してDDLを返す
    if (Array.isArray(rows) && rows.length > 0 && 'Create Table' in rows[0]) {
      return (rows[0] as any)['Create Table'];
    } else {
      throw new Error(`Failed to retrieve DDL for table: ${tableName}`);
    }
  } catch (error) {
    console.error(`Error fetching DDL for table ${tableName}:`, error);
    throw error;
  } finally {
    // 接続を閉じる
    await connection.end();
  }
}

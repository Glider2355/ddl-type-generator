import { dbConnection } from '@/mysql2';

describe('getTableDDL', () => {
  const testDBConfig = {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
    port: 3306,
    charset: 'utf8mb4',
  };

  let connection: any;

  // テスト前にDB接続を確立
  beforeAll(async () => {
    connection = await dbConnection(testDBConfig);
  });

  // テスト後にDB接続を終了
  afterAll(async () => {
    if (connection) {
      await connection.closeConnection();
    }
  });

  it('DDLを取得する', async () => {
    const actual = (await connection.getTableDDL('Users')).trim(); // トリムして余分な改行を削除
    const expected = `
CREATE TABLE \`Users\` (
  \`userId\` varchar(12) NOT NULL,
  \`nameKanji\` varchar(34) DEFAULT NULL COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) DEFAULT NULL COMMENT '名前(カナ)',
  \`dateOfBirth\` date DEFAULT NULL COMMENT '生年月日',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='ユーザテーブル'`.trim(); // トリムして余分な改行を削除

    expect(actual).toBe(expected);
  });
});

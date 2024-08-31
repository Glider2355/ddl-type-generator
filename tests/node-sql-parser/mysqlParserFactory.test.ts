import { mysqlParserFactory } from '@/node-sql-parser';

describe('mysqlParserFactory', () => {
  it('テーブル名が正しく出力される', () => {
    const sql = `
      CREATE TABLE Users (
        userId varchar(12),
        nameKanji varchar(34) COMMENT '名前(漢字)',
        nameKana varchar(50) COMMENT '名前(カナ)',
        dateOfBirth date COMMENT '生年月日',
        PRIMARY KEY (userId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';
    `;

    const parserFactory = mysqlParserFactory(sql);
    const tableName = parserFactory.getTableName();

    expect(tableName).toBe('Users');
  });
});

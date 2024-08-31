import { mysqlParser } from '@/node-sql-parser';

describe('mysqlParserFactory', () => {
  const sql = `
      CREATE TABLE Users (
        userId varchar(12),
        nameKanji varchar(34) COMMENT '名前(漢字)',
        nameKana varchar(50) COMMENT '名前(カナ)',
        dateOfBirth date COMMENT '生年月日',
        PRIMARY KEY (userId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';
    `;
  const parserFactory = mysqlParser(sql);
  
  it('テーブル名を取得する', () => {
    const actual = parserFactory.getTableName();
    expect(actual).toBe('Users');
  });
 
  it('カラム名を取得する', () => {
    const actual = parserFactory.getColumnNames();
    const expected = [
      'userId',
      'nameKanji',
      'nameKana',
      'dateOfBirth'
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('カラムの型を取得する', () => {
    const actual = parserFactory.getColumnTypes();
    const expected = [
      'VARCHAR',
      'VARCHAR',
      'VARCHAR',
      'DATE',
    ];
    expect(actual).toStrictEqual(expected);
  });
});

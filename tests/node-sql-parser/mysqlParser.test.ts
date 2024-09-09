import { mysqlParser } from '@/node-sql-parser';

describe('mysqlParserFactory', () => {
  const sql = `
CREATE TABLE \`Users\` (
  \`userId\` varchar(12) NOT NULL,
  \`nameKanji\` varchar(34) DEFAULT NULL COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) DEFAULT '不明' COMMENT '名前(カナ)',
  \`age\` int DEFAULT 0 COMMENT '年齢',
  \`salary\` decimal(10, 2) DEFAULT 1000.00 COMMENT '給料',
  \`isActive\` boolean DEFAULT TRUE COMMENT 'アクティブか',
  \`rating\` float DEFAULT 3.5 COMMENT '評価',
  \`dateOfBirth\` date DEFAULT '1970-01-01' COMMENT '生年月日',
  \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  \`updatedAt\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
  \`uniqueId\` char(36) DEFAULT (UUID()) COMMENT 'UUID',
  \`fixedValue\` enum('A', 'B', 'C') DEFAULT 'A' COMMENT '固定値の例',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';`;
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
      'age',
      'salary',
      'isActive',
      'rating',
      'dateOfBirth',
      'createdAt',
      'updatedAt',
      'uniqueId',
      'fixedValue',
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('カラムの型を取得する', () => {
    const actual = parserFactory.getColumnTypes();
    const expected = [
      'VARCHAR',
      'VARCHAR',
      'VARCHAR',
      'INT',
      'DECIMAL',
      'BOOLEAN',
      'FLOAT',
      'DATE',
      'DATETIME',
      'DATETIME',
      'CHAR',
      'ENUM',
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('カラムのnullableのフラグを取得する', () => {
    const actual = parserFactory.getColumnNullableFlags();
    const expected = [
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('カラムのデフォルト値を取得する', () => {
    const actual = parserFactory.getColumnDefaults();
    const expected = [
      undefined,
      null,
      '不明',
      0,
      1000.0,
      true,
      3.5,
      '1970-01-01',
      'CURRENT_TIMESTAMP',
      'CURRENT_TIMESTAMP',
      'UUID',
      'A',
    ];
    expect(actual).toStrictEqual(expected);
  });
});

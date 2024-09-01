import { getTableDDL } from '@/mysql2';

// モックを作成
jest.mock('mysql2/promise', () => {
  return {
    createConnection: jest.fn().mockResolvedValue({
      execute: jest.fn().mockResolvedValue([
        [
          {
            Table: 'your_table_name',
            'Create Table': `
CREATE TABLE \`Users\` (
  \`userId\` varchar(12),
  \`nameKanji\` varchar(34) COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) COMMENT '名前(カナ)',
  \`dateOfBirth\` date COMMENT '生年月日',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';`,
          },
        ],
      ]),
      end: jest.fn().mockResolvedValue(undefined),
    }),
  };
});

describe('getTableDDL', () => {
  it('DDLを取得する', async () => {
    const actual = await getTableDDL('camps');
    const expected = `
CREATE TABLE \`Users\` (
  \`userId\` varchar(12),
  \`nameKanji\` varchar(34) COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) COMMENT '名前(カナ)',
  \`dateOfBirth\` date COMMENT '生年月日',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';`;

    expect(actual).toStrictEqual(expected);
  });
});

import { ddlRepositoryImpl } from '@/repository/ddlRepositoryImpl';

// dbConnectionとmysqlParserをモック化
jest.mock('@/mysql2', () => ({
  dbConnection: jest.fn(),
}));

describe('ddlRepositoryImpl', () => {
  it('DDLを取得する', async () => {
    // モックされたgetTableDDLの返り値を定義
    const mockConnection = {
      getTableDDL: jest.fn().mockResolvedValue(`
CREATE TABLE \`Users\` (
  \`userId\` varchar(12),
  \`nameKanji\` varchar(34) COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) COMMENT '名前(カナ)',
  \`dateOfBirth\` date COMMENT '生年月日',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';`),
    };

    // dbConnectionがモックされた接続を返すように設定
    const { dbConnection } = require('@/mysql2');
    dbConnection.mockResolvedValue(mockConnection);

    // テスト実行
    const repository = await ddlRepositoryImpl();
    const actual = await repository.getDDL('Users');

    const expected = {
      tableName: 'Users',
      columns: [
        {
          name: 'userId',
          type: 'VARCHAR',
          nullable: false,
          default: null,
        },
        {
          name: 'nameKanji',
          type: 'VARCHAR',
          nullable: false,
          default: null,
        },
        {
          name: 'nameKana',
          type: 'VARCHAR',
          nullable: false,
          default: null,
        },
        {
          name: 'dateOfBirth',
          type: 'DATE',
          nullable: false,
          default: null,
        },
      ],
    };

    expect(actual).toStrictEqual(expected);
  });
});

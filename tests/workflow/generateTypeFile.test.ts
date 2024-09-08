import { ddlRepositoryImpl } from '@/repository/ddlRepositoryImpl';
import { generateTypeFile } from '@/workflow';

// dbConnectionとmysqlParserをモック化
jest.mock('@/mysql2', () => ({
  dbConnection: jest.fn(),
}));

describe('generateTypeFile', () => {
  it('DDLを元にTypeをtsファイルで生成する', async () => {
    // モックされたgetTableDDLの返り値を定義
    const mockConnection = {
      getTableDDL: jest.fn().mockResolvedValue(`
CREATE TABLE \`Users\` (
  \`userId\` varchar(12) NOT NULL,
  \`nameKanji\` varchar(34) DEFAULT NULL COMMENT '名前(漢字)',
  \`nameKana\` varchar(50) DEFAULT NULL COMMENT '名前(カナ)',
  \`dateOfBirth\` date DEFAULT NULL COMMENT '生年月日',
  PRIMARY KEY (\`userId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';`),
    };

    // dbConnectionがモックされた接続を返すように設定
    const { dbConnection } = require('@/mysql2');
    dbConnection.mockResolvedValue(mockConnection);

    // テスト実行
    const actual = await generateTypeFile('Users');

    const expected = `export type Users = {
  userId: string,
  nameKanji?: string | null,
  nameKana?: string | null,
  dateOfBirth?: Date | null
};`;
    expect(actual).toStrictEqual(expected);
  });
});

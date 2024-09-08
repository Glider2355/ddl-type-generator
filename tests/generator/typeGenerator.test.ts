import { typeStringGenerator } from '@/generator';
import { DDLType } from '@/types';

// dbConnectionとmysqlParserをモック化
jest.mock('@/mysql2', () => ({
  dbConnection: jest.fn(),
}));

describe('typeFileGenerator', () => {
  it('typeを生成する', async () => {
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

    const typeScriptType: DDLType = {
      typeName: 'Users',
      typeElements: [
        'userId: string',
        'nameKanji?: string | null',
        'nameKana?: string | null',
        'dateOfBirth?: Date | null',
      ],
    };
    const actual = await typeStringGenerator(typeScriptType);

    const expected = `export type Users = {
  userId: string,
  nameKanji?: string | null,
  nameKana?: string | null,
  dateOfBirth?: Date | null
};`;
    expect(actual).toStrictEqual(expected);
  });
});

import { typeStringGenerator } from '@/generator';
import { DDLType } from '@/types';

describe('typeStringGenerator', () => {
  it('typeを文字列で生成する', async () => {
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

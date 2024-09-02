import { typeGenerator } from '@/generator';
import { DDLType } from '@/types';

describe('typeGenerator', () => {
  it('typeを生成する', () => {
    const typeScriptType: DDLType = {
      typeName: 'Users',
      typeElements: [
        'userId: string',
        'nameKanji?: string | null',
        'nameKana?: string | null',
        'dateOfBirth?: Date | null',
      ],
    };
    const actual = typeGenerator(typeScriptType);

    const expected = `export type Users = {
  userId: string,
  nameKanji?: string | null,
  nameKana?: string | null,
  dateOfBirth?: Date | null
};`;
    expect(actual).toStrictEqual(expected);
  });
});

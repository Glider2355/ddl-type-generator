import { typeConverter } from '@/converter';
import { DDL, DDLType } from '@/types';

describe('typeConverter', () => {
  it('DDLを元にtypeをstringで返す', () => {
    const ddl: DDL = {
      tableName: 'Users',
      columns: [
        {
          name: 'userId',
          type: 'VARCHAR',
          nullable: false,
        },
        {
          name: 'nameKanji',
          type: 'VARCHAR',
          nullable: true,
        },
        {
          name: 'nameKana',
          type: 'VARCHAR',
          nullable: true,
        },
        {
          name: 'dateOfBirth',
          type: 'DATE',
          nullable: true,
        },
      ],
    };
    const actual = typeConverter(ddl);
    const expected: DDLType = {
      typeName: 'Users',
      typeElements: [
        'userId: string',
        'nameKanji?: string | null',
        'nameKana?: string | null',
        'dateOfBirth?: Date | null',
      ],
    };
    expect(actual).toStrictEqual(expected);
  });
});

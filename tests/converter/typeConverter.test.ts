import { typeConverter } from '@/converter';
import { DDL } from '@/types';

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
    expect(actual).toBe('a');
  });
});

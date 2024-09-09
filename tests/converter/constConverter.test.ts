import { constConverter } from '@/converter';
import { ConstType, DDL } from '@/types';

describe('constConverter', () => {
  it('DDLからConstTypeに変換される', () => {
    const ddl: DDL = {
      tableName: 'user_data',
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

    const expected: ConstType = {
      constName: 'userData',
      constElements: [
        "userId: ''",
        'nameKanji: null',
        'nameKana: null',
        'dateOfBirth: null',
      ],
    };
    expect(constConverter(ddl)).toStrictEqual(expected);
  });
});

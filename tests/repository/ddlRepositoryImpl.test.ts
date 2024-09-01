import { ddlRepositoryImpl } from '@/repository/ddlRepositoryImpl';

describe('ddlRepositoryImpl', () => {
  it('DDLを取得する', () => {
    const actual = ddlRepositoryImpl().getDDL('Users');

    const expected = {
      tableName: 'Users',
      columns: [
        {
          name: 'id',
          type: 'int',
          nullable: false,
          default: null,
        },
        {
          name: 'name',
          type: 'varchar(255)',
          nullable: false,
          default: null,
        },
        {
          name: 'age',
          type: 'int',
          nullable: true,
          default: null,
        },
      ],
    };

    expect(actual).toStrictEqual(expected);
  });
});

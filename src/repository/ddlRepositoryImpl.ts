import { DDL } from '@/types';

interface ddlRepository {
  getDDL(tableName: string): DDL;
}

export function ddlRepositoryImpl(): ddlRepository {
  return {
    getDDL(tableName): DDL {
      const columns = [
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
      ];

      return { tableName, columns };
    },
  };
}

import { dbConnection } from '@/mysql2';
import { mysqlParser } from '@/node-sql-parser';
import { Column, DDL } from '@/types';

interface ddlRepository {
  getDDL(tableName: string): Promise<DDL>;
}

export async function ddlRepositoryImpl(): Promise<ddlRepository> {
  const connection = await dbConnection();

  return {
    async getDDL(tableName): Promise<DDL> {
      const ddlString = await connection.getTableDDL(tableName);
      const parser = mysqlParser(ddlString);
      const columnNames = parser.getColumnNames();
      const columnTypes = parser.getColumnTypes();

      let columns: Column[] = [];

      columnNames.forEach((name, index) => {
        columns.push({
          name: name,
          type: columnTypes[index],
          nullable: false,
          default: null,
        });
      });

      return { tableName, columns };
    },
  };
}

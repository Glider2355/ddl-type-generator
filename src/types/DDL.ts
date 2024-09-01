import { MySQLType } from './MySQLType';

export type DDL = {
  tableName: string;
  columns: Column[];
};

export type Column = {
  name: string;
  type: MySQLType;
  nullable: boolean;
};

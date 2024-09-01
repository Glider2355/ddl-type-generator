export type DDL = {
  tableName: string;
  columns: Column[];
};

export type Column = {
  name: string;
  type: string;
  nullable: boolean;
};

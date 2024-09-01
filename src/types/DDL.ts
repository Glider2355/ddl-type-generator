export type DDL = {
  tableName: string;
  columns: Column[];
};

type Column = {
  name: string;
  type: string;
  nullable: boolean;
  default: string | null;
};

import { Column, DDL, DDLType } from '@/types';
import { mapMySQLTypeToTypeScript } from './mapMySQLTypeToTypeScript';

export function typeConverter(ddl: DDL): DDLType {
  const typeName = ddl.tableName;
  const typeElemens = createTypeElementsString(ddl.columns);

  const type: DDLType = {
    typeName: typeName,
    typeElements: typeElemens,
  };
  return type;
}

// カラムの情報を使用して "userId: number" 形式の文字列を作成する関数
function createTypeElementsString(columns: Column[]): string[] {
  return columns.map((column) => {
    const typeScriptType = mapMySQLTypeToTypeScript(column.type);
    if (column.nullable === true) {
      return `${column.name}?: ${typeScriptType} | null`;
    }
    return `${column.name}: ${typeScriptType}`;
  });
}

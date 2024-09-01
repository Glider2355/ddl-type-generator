import { MySQLType, TypeScriptType } from '@/types';

export function mapMySQLTypeToTypeScript(mysqlType: MySQLType): TypeScriptType {
  switch (mysqlType.toUpperCase()) {
    case 'INT':
    case 'SMALLINT':
    case 'TINYINT':
    case 'MEDIUMINT':
    case 'BIGINT':
    case 'FLOAT':
    case 'DOUBLE':
    case 'DECIMAL':
    case 'YEAR':
      return 'number';

    case 'CHAR':
    case 'VARCHAR':
    case 'TEXT':
    case 'TINYTEXT':
    case 'MEDIUMTEXT':
    case 'LONGTEXT':
    case 'TIME':
    case 'ENUM':
    case 'SET':
      return 'string';

    case 'BOOLEAN':
    case 'TINYINT(1)':
      return 'boolean';

    case 'DATE':
    case 'DATETIME':
    case 'TIMESTAMP':
      return 'Date';

    case 'BINARY':
    case 'VARBINARY':
    case 'BLOB':
    case 'TINYBLOB':
    case 'MEDIUMBLOB':
    case 'LONGBLOB':
      return 'Buffer';

    case 'JSON':
      return 'any';

    case 'GEOMETRY':
    case 'POINT':
    case 'LINESTRING':
    case 'POLYGON':
      return 'string';

    default:
      throw new Error(`Unsupported MySQL type: ${mysqlType}`);
  }
}

import { MySQLType } from '@/types';
import { AST, Create, Parser } from 'node-sql-parser';

interface ParserFactory {
  getTableName(): string;
  getColumnNames(): string[];
  getColumnTypes(): MySQLType[];
  getColumnNullableFlags(): boolean[];
}

export function mysqlParser(sql: string): ParserFactory {
  const parser = new Parser();

  const astArray: AST | AST[] = parser.astify(sql, { database: 'MySQL' });
  const ast: AST = Array.isArray(astArray) ? astArray[0] : astArray;
  // `Create` 型であることを確認し、三項演算子で限定する
  const createAST: Create =
    ast.type === 'create'
      ? ast
      : (() => {
          throw new Error('ASTはCreate型ではありません。');
        })();

  const tableList = parser.tableList(sql, { database: 'MySQL' });
  const columnList = parser.columnList(sql, { database: 'MySQL' });

  const astString = JSON.stringify(ast, null, 2);
  const astJson = JSON.parse(astString);

  return {
    getTableName(): string {
      const tableName = tableList[0].replace(/.*::(.*)/, '$1');
      return tableName;
    },

    getColumnNames() {
      const uniqueColumns = new Set<string>();

      columnList.forEach((column: string) => {
        // 特定のフォーマットにマッチした部分を取り除く
        const match = column.match(/::.*::(.*)/);
        if (match) {
          uniqueColumns.add(match[1]); // 元のカラム名を追加
        } else {
          uniqueColumns.add(column); // 通常のカラム名を追加
        }
      });
      return Array.from(uniqueColumns);
    },

    getColumnTypes() {
      let columnTypes: MySQLType[] = [];
      if (createAST.create_definitions) {
        createAST.create_definitions.map((definition) => {
          if (definition.resource === 'column') {
            columnTypes.push(definition.definition.dataType as MySQLType);
          }
        });
      }
      return columnTypes;
    },

    getColumnNullableFlags() {
      let columnNullableFlags: boolean[] = [];
      if (createAST.create_definitions) {
        createAST.create_definitions.map((definition) => {
          if (definition.resource === 'column') {
            if (definition?.nullable?.type === 'not null') {
              columnNullableFlags.push(false);
            } else {
              columnNullableFlags.push(true);
            }
          }
        });
      }
      return columnNullableFlags;
    },
  };
}

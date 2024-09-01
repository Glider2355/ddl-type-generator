import { Parser } from 'node-sql-parser';

interface ParserFactory {
  getTableName(): string;
  getColumnNames(): string[];
  getColumnTypes(): string[];
  getColumnNullableFlags(): boolean[];
}

export function mysqlParser(sql: string): ParserFactory {
  const parser = new Parser();
  const parsedResult = parser.astify(sql, { database: 'MySQL' });
  const tableList = parser.tableList(sql, { database: 'MySQL' });
  const columnList = parser.columnList(sql, { database: 'MySQL' });

  const astString = JSON.stringify(parsedResult, null, 2);
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
      let columnTypes: string[] = [];
      astJson.forEach((ast: any) => {
        if (ast.create_definitions) {
          ast.create_definitions.map((definition: any) => {
            if (definition.resource === 'column') {
              columnTypes.push(definition.definition.dataType);
            }
          });
        }
      });
      return columnTypes;
    },

    getColumnNullableFlags() {
      let columnTypes: boolean[] = [];
      astJson.forEach((ast: any) => {
        if (ast.create_definitions) {
          ast.create_definitions.map((definition: any) => {
            if (definition.resource === 'column') {
              if (definition?.nullable?.type === 'not null') {
                columnTypes.push(false);
              } else {
                columnTypes.push(true);
              }
            }
          });
        }
      });
      return columnTypes;
    },
  };
}

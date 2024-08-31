import { Parser } from "node-sql-parser";

const parser = new Parser();
const sql = `
CREATE TABLE Users (
  userId varchar(12),
  nameKanji varchar(34) COMMENT '名前(漢字)',
  nameKana varchar(50) COMMENT '名前(カナ)',
  dateOfBirth date COMMENT '生年月日',
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='ユーザテーブル';
`
const parsedResult = parser.astify(sql, { database: 'MySQL' });
const tableList = parser.tableList(sql, { database: 'MySQL' })[0];
const columnList = parser.columnList(sql, { database: 'MySQL' });
const astString = JSON.stringify(parsedResult, null, 2);
const astJson = JSON.parse(astString);
const tableName = astJson

// console.log(tableList);
// console.log(columnList);
// console.log(astString);
console.log(tableName[0].table[0].table);

import { Parser } from 'node-sql-parser';

interface ParserFactory {
    getTableName(): string;
}

export function mysqlParserFactory(sql: string): ParserFactory {
    const parser = new Parser();
    const parsedResult = parser.astify(sql, { database: 'MySQL' });
    const astString = JSON.stringify(parsedResult, null, 2);
    const astJson = JSON.parse(astString);

    return {
        getTableName(): string {
            return astJson[0].table[0].table;
        }
    }
}

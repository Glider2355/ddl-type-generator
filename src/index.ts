import { generateTypeFile } from './workflow';

// コマンドラインからの呼び出し
if (require.main === module) {
  const tableName = process.argv[2];
  generateTypeFile(tableName);
}

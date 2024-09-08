import * as fs from 'fs';
import * as path from 'path';

export async function tsFileGenerator(
  fileName: string,
  content: string,
  generateFilePath: string = 'gen'
) {
  const filePath = path.join(generateFilePath, `${fileName}.ts`);

  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync(generateFilePath)) {
    fs.mkdirSync(generateFilePath, { recursive: true });
  }

  // ファイルの書き込み
  fs.writeFileSync(filePath, content, 'utf8');
}

import * as fs from 'fs';
import * as path from 'path';
import { typeStringGenerator } from './typeStringGenerator';
import { ddlRepositoryImpl } from '@/repository';

export async function typeFileGenerator(generateFilePath: string) {
  const filePath = path.join(generateFilePath, `testFile.ts`);

  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync(generateFilePath)) {
    fs.mkdirSync(generateFilePath, { recursive: true });
  }

  // ファイルの書き込み
  fs.writeFileSync(filePath, 'export const test = 42;', 'utf8');
}

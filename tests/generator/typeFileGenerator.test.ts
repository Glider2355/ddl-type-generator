import * as fs from 'fs';
import * as path from 'path';
import { typeFileGenerator } from '@/generator';

describe('typeFileGenerator', () => {
  const testDirectory = './test-generated';
  const testFileName = 'testFile';
  const testContent = 'export const test = 42;';

  afterEach(() => {
    // テスト後に生成されたファイルをクリーンアップ
    if (fs.existsSync(testDirectory)) {
      fs.rmSync(testDirectory, { recursive: true, force: true });
    }
  });

  it('typeのtsファイルが正しく生成される', () => {
    const filePath = path.join(testDirectory, `${testFileName}.ts`);

    typeFileGenerator(testDirectory);
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBe(true);

    if (fileExists) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      expect(fileContent).toBe(testContent);
    }
  });
});

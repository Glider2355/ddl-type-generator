import { typeConverter } from '@/converter';
import { tsFileGenerator, typeStringGenerator } from '@/generator';
import { ddlRepositoryImpl } from '@/repository';
import { DDL, DDLType } from '@/types';

export async function generateTypeFile(tableName: string): Promise<void> {
  const repository = await ddlRepositoryImpl();
  const ddl: DDL = await repository.getDDL(tableName);
  const type: DDLType = typeConverter(ddl);
  const typeString: string = typeStringGenerator(type);
  tsFileGenerator(type.typeName, typeString, 'gen');
}

// コマンドラインからの呼び出し
if (require.main === module) {
  const tableName = process.argv[2];
  generateTypeFile(tableName);
}

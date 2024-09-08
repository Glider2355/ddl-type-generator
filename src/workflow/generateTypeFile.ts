import { typeConverter } from '@/converter';
import { typeStringGenerator } from '@/generator';
import { ddlRepositoryImpl } from '@/repository';
import { DDL, DDLType } from '@/types';

export async function generateTypeFile(tableName: string) {
  const repository = await ddlRepositoryImpl();
  const ddl: DDL = await repository.getDDL(tableName);
  const type: DDLType = typeConverter(ddl);
  const typeString: string = typeStringGenerator(type);
  return typeString;
}

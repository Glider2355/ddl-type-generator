import { typeConverter } from '@/converter';
import { ddlRepositoryImpl } from '@/repository';
import { DDLType } from '@/types';

export async function typeStringGenerator(ddlType: DDLType): Promise<string> {
  const repository = await ddlRepositoryImpl();
  const ddl = await repository.getDDL('Users');
  const type = typeConverter(ddl);
  const typeName = type.typeName;
  const typeElements = type.typeElements;

  return `export type ${typeName} = {
  ${typeElements.join(',\n  ')}
};
 `.trim();
}

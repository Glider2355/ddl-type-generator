import { typeConverter } from '@/converter';
import { ddlRepositoryImpl } from '@/repository';
import { DDLType } from '@/types';

export function typeStringGenerator(ddlType: DDLType): string {
  const typeName = ddlType.typeName;
  const typeElements = ddlType.typeElements;

  return `export type ${typeName} = {
  ${typeElements.join(',\n  ')}
};
 `.trim();
}

import { DDLType } from '@/types';

export function typeGenerator(ddlType: DDLType): string {
  return `
export type Users = {
  userId: string,
  nameKanji?: string | null,
  nameKana?: string | null,
  dateOfBirth?: Date | null
};
 `.trim();
}

import { ConstType, DDL } from '@/types';

export function constConverter(ddl: DDL): ConstType {
  const constType: ConstType = {
    constName: 'userData',
    constElements: [
      "userId: ''",
      'nameKanji: null',
      'nameKana: null',
      'dateOfBirth: null',
    ],
  };
  return constType;
}

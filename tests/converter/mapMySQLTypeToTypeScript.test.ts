import { mapMySQLTypeToTypeScript } from '@/converter';

describe('mapMySQLTypeToTypeScript', () => {
  it('INTはnumber型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('INT');
    expect(actual).toBe('number');
  });
  it('VARCHARはstring型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('VARCHAR');
    expect(actual).toBe('string');
  });
  it('BOOLEANはboolean型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('BOOLEAN');
    expect(actual).toBe('boolean');
  });
  it('DATETIMEはDate型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('DATETIME');
    expect(actual).toBe('Date');
  });
  it('BLOBはBuffer型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('BLOB');
    expect(actual).toBe('Buffer');
  });
  it('JSONはany型に変換される', () => {
    const actual = mapMySQLTypeToTypeScript('JSON');
    expect(actual).toBe('any');
  });
});

import { camelCaseConverter } from '@/converter';

describe('camelCaseConverter', () => {
  const converter = camelCaseConverter();
  it('スネークケースでLowerCamelCaseに変換される', () => {
    expect(converter.lowerCamelCase('hello_world_example')).toBe(
      'helloWorldExample'
    );
  });
  it('スネークケースでUpperCamelCaseに変換される', () => {
    expect(converter.upperCamelCase('hello_world_example')).toBe(
      'HelloWorldExample'
    );
  });
});

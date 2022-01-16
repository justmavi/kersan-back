export class ValidationHelpers {
  private static booleanVariantsMap = new Map<string | boolean, boolean>([
    ['true', true],
    ['false', false],
    [true, true],
    [false, false],
  ]);

  public static get booleanVariants() {
    return this.booleanVariantsMap;
  }

  public static parseToJson(value: string | Record<string, unknown>) {
    try {
      if (typeof value === 'object') return value;

      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}

export class ValidationHelpers {
  private static booleanVariantsMap = new Map<string | boolean, boolean>([
    ['true', true],
    ['false', false],
    [true, true],
    [false, false],
  ]);

  public static get booleanVariants() {
    return ValidationHelpers.booleanVariantsMap;
  }

  public static compileValueErrorMessage(type: string) {
    return `Invalid value passed to $property. It must be ${type}`;
  }

  public static parseToJson(value) {
    try {
      if (typeof value === 'object') return value;

      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}

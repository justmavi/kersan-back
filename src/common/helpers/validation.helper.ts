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
}

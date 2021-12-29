export class ValidationHelpers {
  public static compileValueErrorMessage(type: string) {
    return `Invalid value passed to $property. It must be ${type}`;
  }
}

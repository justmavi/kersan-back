export class ValidationHelpers {
  public static compileDefaultErrorMessage(type: string) {
    return `Invalid value passed to $property. It must be ${type}. Value: $value`;
  }
}

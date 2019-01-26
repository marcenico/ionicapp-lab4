export class StringsRegex {
    public static onlyIntegerNumbers: string = '^[0-9]+$';
    public static onlyFloatNumbers: string = '^[+-]?([0-9]*[.])?[0-9]+$';
    public static cuit: string = "^[0-9]{2}-[0-9]{8}-[0-9]$";
    public static latitude: string = "^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$";
    public static longitude: string = '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$';
    public static greaterThanZero: string = '^[1-9]+[0-9]*$';
    public static noNegative: string = '^[0-9]+[0-9]*$';
    public static percentage: string = '^[0-9][0-9]?$|^100$';

}

export interface Result {
    input: string;
    result: any;
}
export interface Eater {
    (input: string): Result;
}
export declare type Token = string | Object | TokenArray;
export interface TokenArray extends Array<Token> {
}
export declare var eat: Eater;
export default eat;

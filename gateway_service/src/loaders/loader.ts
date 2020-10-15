
export default interface Loader {

    init(): Promise<unknown>;
    terminate(): Promise<unknown>;
    success(): void;
    error(error: Error): void;
}

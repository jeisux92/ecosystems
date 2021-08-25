export default interface IBaseRepository<T> {
    getAllAsync(): Promise<T[]>;
    createAsync(model: T): Promise<void>;
}
export interface DataList<T> {
    collection: T[];
    total: number;
    start: number;
    count: number;
    sortBy: string;
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent {
    @Output() pageChange = new EventEmitter<any>();

    private _start: number = 0;    // Offset from 0 for page to start from
    private _count: number = 10;   // number of records to show
    private _total: number = 500;        // total number of records
    private _currentPage: number = 1;
    private _nextDisabled: boolean = true;
    private _previousDisabled: boolean = true;

    public nextPage(): void {
        this._currentPage = this._currentPage + 1;
        this.changePage(null);
    }

    public previousPage(): void {
        this._currentPage = this._currentPage - 1;
        this.changePage(null);
    }

    private changePage(event): void {
        console.log('PageChange');
        this.testLimits();
        this._start = (this._currentPage - 1) * this._count;
        this.pageChange.emit(true);
    }

    public testLimits(): void {
        let pageCount: number = this.pageCount();
        this._previousDisabled = false;
        this._nextDisabled = false;
        if (this._currentPage <= 1) {
            this._currentPage = 1;
            this._previousDisabled = true;
        } else if (this._currentPage >= pageCount) {
            this._currentPage = pageCount;
            this._nextDisabled = true;
        }
        console.log('previous: ' + this._previousDisabled);
        console.log('next: ' + this._nextDisabled);
    }

    public pageCount(): number {
        return Math.ceil(this._total / this._count);
    }

    public get currentPage(): number {
        return this._currentPage;
    }

    public set currentPage(currentPage: number) {
        this._currentPage = currentPage;
    }
    public get start(): number {
        return this._start;
    }

    public set start(start: number) {
        this._start = start;
    }

    public get count(): number {
        return this._count;
    }

    public set count(count: number) {
        this._count = count;
    }

    public get total(): number {
        return this._total;
    }

    public set total(total: number) {
        this._total = total;
    }

    public get previousDisabled(): boolean {
        return this._previousDisabled;
    }

    public set previousDisabled(previousDisabled: boolean) {
        this._previousDisabled = previousDisabled;
    }

    public get nextDisabled(): boolean {
        return this._nextDisabled;
    }

    public set nextDisabled(nextDisabled: boolean) {
        this._nextDisabled = nextDisabled;
    }

}

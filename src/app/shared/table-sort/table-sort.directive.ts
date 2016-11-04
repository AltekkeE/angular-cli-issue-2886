import {Directive, EventEmitter, Input, Output, HostListener} from '@angular/core';

@Directive({selector: '[ng-TableSort]'})
export class TableSortingDirective {
  @Input() public ngTableSort: any;
  @Input() public column: any;
  @Output() public sortChanged:EventEmitter<any> = new EventEmitter();

  @Input()
  public get config():any {
    return this.ngTableSort;
  }

  public set config(value:any) {
    this.ngTableSort = value;
  }

  @HostListener('click', ['$event', '$target'])
  public onToggleSort(event:any):void {
    if (event) {
      event.preventDefault();
    }

    if (this.ngTableSort && this.column && this.column.sort !== false) {
      switch (this.column.sort) {
        case 'asc':
          this.column.sort = 'desc';
          break;
        case 'desc':
          this.column.sort = '';
          break;
        default:
          this.column.sort = 'asc';
          break;
      }

      this.sortChanged.emit(this.column);
    }
  }
}
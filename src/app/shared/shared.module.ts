import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        FormsModule,
    ],
    declarations: [
        PaginationComponent,
    ],
    exports: [
        PaginationComponent,
    ],
})
export class SharedModule {}

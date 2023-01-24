import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        MenuModule,
        SplitButtonModule,
        ContextMenuModule
    ],
    exports: [
        TableModule,
        ButtonModule,
        InputTextModule,
        MenuModule,
        SplitButtonModule,
        ContextMenuModule
    ]
})
export class SharedPrimengModule { }

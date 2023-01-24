import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturasComponent } from './lecturas.component';

const routes: Routes = [
    {
        path: '',
        component: LecturasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LecturasRoutingModule { }

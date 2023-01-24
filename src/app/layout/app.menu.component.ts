import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Seguridad',
                items: [
                    { label: 'Roles', icon: 'pi pi-fw pi-id-card', routerLink: ['/seguridad/roles'] },
                    { label: 'Perfiles', icon: 'pi pi-fw pi-check-square', routerLink: ['/seguridad/perfiles'] },
                    { label: 'Paginas', icon: 'pi pi-fw pi-bookmark', routerLink: ['/seguridad/paginas'] },
                    { label: 'Clientes', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/seguridad/clientes'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/seguridad/usuarios'] },
                ]
            },
            {
                label: 'Procesos',
                items: [
                    { label: 'Lecturas', icon: 'pi pi-fw pi-eye', routerLink: ['/procesos/lecturas'], badge: 'NEW' },
                    { label: 'Vehiculos', icon: 'pi pi-fw pi-eye', routerLink: ['/procesos/vehiculos'], badge: 'NEW' },
                ]
            },
        ];
    }
}

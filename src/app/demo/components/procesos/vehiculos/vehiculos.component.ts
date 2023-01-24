import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { Vehicle } from 'src/app/demo/models/vehicle.model';
import { HttpBaseService } from 'src/app/demo/service/httpBase.service';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-vehiculos',
    templateUrl: './vehiculos.component.html',
    styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

    public arrayVehicles: Vehicle[] = [];
    public cols: any[] = [];
    public vehicleSelDetails!: Vehicle;
    public menuItems: MenuItem[] = [];

    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.cols = [
            { header: 'Identificador' },
            { header: 'Placa' },
            { header: 'Región' },
            { header: 'Score' },
            { header: 'Tipo' },
        ]
        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-fw pi-check',
                command: () => this.details(this.vehicleSelDetails)
            },
            {
                label: 'Imprimir reporte',
                icon: 'pi pi-fw pi-check',
                command: () => this.printReport(this.vehicleSelDetails)
            },
        ];
        this.findAllVehicle();
    }

    findAllVehicle() {
        this._httpBase.getMethod('vehicles').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayVehicles = GeneralUtils.cloneObject(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar vehiculos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar vehiculos', detail: error.message });
            }
        });
    }

    details(vehicle: Vehicle) {
        console.log(vehicle);
    }

    printReport(vehicle: Vehicle) {
        const pdfDefinition: any = {
            content: [
                {
                    text: 'Hola mundo',
                }
            ]
        }

        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
    }

}

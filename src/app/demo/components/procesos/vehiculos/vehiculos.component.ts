import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { IVehicle } from 'src/app/demo/models/vehicle.model';
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

    public arrayVehicles: IVehicle[] = [];
    public cols: any[] = [];
    public vehicleSelDetails!: IVehicle;
    public menuItems: MenuItem[] = [];

    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) { }

    /**
     * Metodo para inicializar las variables del componente
     */
    ngOnInit(): void {
        this.cols = [
            { header: 'Placa' },
            { header: 'Tipo' },
            { header: 'Fecha lectura' },
            { header: 'Identificación' },
            { header: 'Nombre completo' },
            { header: 'Ciudad' },
            { header: 'Infracción' },
            { header: 'Valor infracción' },
        ]
        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-fw pi-car',
                command: () => this.details(this.vehicleSelDetails._id)
            },
            {
                label: 'Imprimir reporte',
                icon: 'pi pi-fw pi-file-pdf',
                command: () => this.printReport(this.vehicleSelDetails)
            },
        ];
        this.findAllVehicle();
    }

    /**
     * Metodo para realizar la busqueda de todos los registros de manera paginada, TODO: Aplicar filtros dinamicos, para buscar por criterios
     */
    findAllVehicle(): void {
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

    /**
     * Metodo para realizar el redireccionamiento a la vista de detalle del vehiculo
     * @param id Codigo unico del registro
     */
    details(id: string): void {
        console.log(id);
    }

    /**
     * Metodo para identificar el tipo de reporte a imprimir
     * @param vehicle Objeto con la informacion del vehiculo que se le va a realizar el reporte.
     */
    printReport(vehicle: IVehicle): void {
        switch (vehicle.typeInfraction) {
            case 'SOAT':
                this.reportSoat(vehicle);
                break;
            case 'TECNICOMECANICA':
                this.reportTecnicoMecanica(vehicle);
                break;
            default:
                break;
        }
    }

    // TODO: El procesamiento de los reportes va en otra capa.

    /**
     * Metodo que realiza la construccion del reporte por vencimiento del SOAT
     * @param vehicle Objeto con la informacion del vehiculo que se le va a realizar el reporte.
     */
    reportSoat(vehicle: IVehicle): void {
        const pdfDefinition: any = {
            content: [
                {
                    text: 'Reporte para SOAT Vencido',
                }
            ]
        }

        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
    }

    /**
     * Metodo que realiza la construccion del reporte por vencimiento de la tecnicomecanica
     * @param vehicle Objeto con la informacion del vehiculo que se le va a realizar el reporte.
     */
    reportTecnicoMecanica(vehicle: IVehicle): void {
        const pdfDefinition: any = {
            content: [
                {
                    text: 'Reporte para Tecnicomecanica vencida',
                }
            ]
        }

        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
    }
}

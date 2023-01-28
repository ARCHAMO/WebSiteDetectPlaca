import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { PlateRecognizer } from 'src/app/demo/models/plateRecognizer.model';
import { HttpBaseService } from 'src/app/demo/service/httpBase.service';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';

@Component({
    selector: 'app-lecturas',
    templateUrl: './lecturas.component.html',
    styleUrls: ['./lecturas.component.scss']
})
export class LecturasComponent implements OnInit {

    public arrayLecturas: PlateRecognizer[] = [];
    public cols: any[] = [];
    public plateSelDetails!: PlateRecognizer;
    public menuItems: MenuItem[] = [];

    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) { }

    /**
     *
     */
    ngOnInit(): void {
        this.cols = [
            { header: 'Identificador' },
            { header: 'Tiempo' },
            { header: 'Nombre archivo' },
            { header: 'Fecha creación' },
        ]
        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-fw pi-check',
                command: () => this.details(this.plateSelDetails)
            },
        ];
        this.findAllPlate();
    }

    /**
     *
     */
    findAllPlate() {
        this._httpBase.getMethod('plateRecognizers').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayLecturas = GeneralUtils.cloneObject(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar lecturas', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar lecturas', detail: error.message });
            }
        });
    }

    /**
     *
     * @param plate
     */
    details(plate: PlateRecognizer) {
        console.log(plate);
    }

    /**
     *
     */
    processImage() {
        this._httpBase.postMethod('plateRecognizerExecSlope', {}).subscribe({
            next: (response: ResponseWebApi) => {
                console.log(response);

                if (response.status === true) {

                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar lecturas', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar lecturas', detail: error.message });
            }
        });
    }
}

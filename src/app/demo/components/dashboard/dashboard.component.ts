import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpBaseService } from '../../service/httpBase.service';
import { ResponseWebApi } from '../../api/ResponseWebApi';
import { IDashboard } from '../../models/dashboard.model';
import { GeneralUtils } from '../../utils/general-utils';
import { faker } from '@faker-js/faker';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    chartDataPlateForMonth: any;
    chartDataInfractionForMonth: any;

    chartOptionsPlateForMonth: any;
    chartOptionsInfractionForMonth: any;

    subscription!: Subscription;

    public dataDashboard: IDashboard = {
        effectivePlates: 0,
        totalInfraction: 0,
        totalReadings: 0,
        effectivePlatesForMonth: [],
        totalInfractionForMonth: [],
        totalReadingsForMonth: []
    };

    constructor(
        public layoutService: LayoutService,
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
    ) {
    }

    ngOnInit() {
        this.getDataDashBoard();
    }

    getDataDashBoard() {
        this._httpBase.getMethod('dashboardGeneralData').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.dataDashboard = response.data;
                    this.initCharPlateForMonth()
                    this.initChatInfractionForMonth();
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar data', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar data', detail: error.message });
            }
        });
    }

    initCharPlateForMonth() {
        // Armamos el array de labels
        const data = GeneralUtils.cloneObject(this.dataDashboard.effectivePlatesForMonth)
        let labelsSeries = [];
        let labelsGraficaX = [];

        // Recorremos para identificar las diferentes series (Tipos de infraccion) y los diferentes labels de la grafica (meses) que existen
        data.forEach(element => {
            const existLeyend = labelsSeries.includes(element._id.typeInfraction);
            if (!existLeyend) {
                labelsSeries.push(element._id.typeInfraction);
            }

            let labelX = Number.parseInt('' + element._id.anio + ('' + element._id.mes).padStart(2, '0'));
            const existPuntoX = labelsGraficaX.includes(labelX);
            if (!existPuntoX) {
                labelsGraficaX.push(labelX);
            }
        });

        labelsSeries = GeneralUtils.cloneObject(labelsSeries.sort());
        labelsGraficaX = GeneralUtils.cloneObject(labelsGraficaX.sort());

        console.log(labelsSeries);
        console.log(labelsGraficaX);

        // Recorremos cada serie para armar su proio dataset.
        const dataSetArray = [];
        labelsSeries.forEach(serie => {
            const colorSerie = faker.color.rgb();
            const arrayData = [];
            labelsGraficaX.forEach(labelX => {
                const dataSet = this.buscarTotal(serie, labelX, data);
                arrayData.push(dataSet);
            });

            const dataSetSerie = {
                label: serie,
                data: arrayData,
                fill: false,
                backgroundColor: colorSerie,
                borderColor: colorSerie,
                tension: .4
            };
            dataSetArray.push(dataSetSerie);
        });

        this.chartDataPlateForMonth = {
            labels: labelsGraficaX,
            datasets: dataSetArray
        };
    }

    /**
     *
     * @param element
     * @param data
     */
    buscarTotal(serie: string, labelXIn: number, data) {
        let total = 0;
        data.forEach(element => {
            let label = Number.parseInt('' + element._id.anio + ('' + element._id.mes).padStart(2, '0'));
            if (element._id.typeInfraction === serie && label === labelXIn && total === 0) {
                total = element.total;
            }
        });
        return total;
    }

    initChatInfractionForMonth() {
        // Armamos el array de labels
        const data = GeneralUtils.cloneObject(this.dataDashboard.totalInfractionForMonth)
        let labelsSeries = [];
        let labelsGraficaX = [];

        // Recorremos para identificar las diferentes series (Tipos de infraccion) y los diferentes labels de la grafica (meses) que existen
        data.forEach(element => {
            const existLeyend = labelsSeries.includes(element._id.typeInfraction);
            if (!existLeyend) {
                labelsSeries.push(element._id.typeInfraction);
            }

            let labelX = Number.parseInt('' + element._id.anio + ('' + element._id.mes).padStart(2, '0'));
            const existPuntoX = labelsGraficaX.includes(labelX);
            if (!existPuntoX) {
                labelsGraficaX.push(labelX);
            }
        });

        labelsSeries = GeneralUtils.cloneObject(labelsSeries.sort());
        labelsGraficaX = GeneralUtils.cloneObject(labelsGraficaX.sort());

        console.log(labelsSeries);
        console.log(labelsGraficaX);

        // Recorremos cada serie para armar su proio dataset.
        const dataSetArray = [];
        labelsSeries.forEach(serie => {
            const colorSerie = faker.color.rgb();
            const arrayData = [];
            labelsGraficaX.forEach(labelX => {
                const dataSet = this.buscarTotal(serie, labelX, data);
                arrayData.push(dataSet);
            });

            const dataSetSerie = {
                label: serie,
                data: arrayData,
                fill: false,
                backgroundColor: colorSerie,
                borderColor: colorSerie,
                tension: .4
            };
            dataSetArray.push(dataSetSerie);
        });

        this.chartDataInfractionForMonth = {
            labels: labelsGraficaX,
            datasets: dataSetArray
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

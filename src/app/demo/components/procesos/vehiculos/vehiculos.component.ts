import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { IVehicle } from 'src/app/demo/models/vehicle.model';
import { HttpBaseService } from 'src/app/demo/service/httpBase.service';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';

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
    public display: boolean = false;
    /**
     * Formulario para crear o editar un cliente
     */
    public formGroupVehicle: FormGroup;

    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router,
        private _formBuilder: FormBuilder,

    ) { }

    /**
     * Metodo para inicializar las variables del componente
     */
    ngOnInit(): void {
        console.log(window.location);

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
                command: () => this.details(this.vehicleSelDetails)
            },
            {
                label: 'Imprimir reporte',
                icon: 'pi pi-fw pi-file-pdf',
                command: () => this.printReport(this.vehicleSelDetails)
            },
        ];
        this.findAllVehicle();
        this.initFormsVehicle();
    }

    initFormsVehicle(): void {
        this.formGroupVehicle = this._formBuilder.group({
            // Informacion personal
            identification: ['', Validators.compose([Validators.required])],
            fullName: ['', Validators.compose([Validators.required])],
            addressCustomer: ['', Validators.compose([Validators.required])],

            // Informacion vehicular
            plate: ['', Validators.compose([Validators.required])],
            type: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            soatExpirationDate: ['', Validators.compose([Validators.required])],

            // Informacion de la infraccion
            appearanceNumber: ['', Validators.compose([Validators.required])],
            infraction: ['', Validators.compose([Validators.required])],
            addressInfraction: ['', Validators.compose([Validators.required])],
            evidenceDate: ['', Validators.compose([Validators.required])],
            datePlateImage: ['', Validators.compose([Validators.required])],
            valueOfTheFine: ['', Validators.compose([Validators.required])],
        });

        this.formGroupVehicle.disable();
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
    details(vehicle: IVehicle): void {
        this.vehicleSelDetails = GeneralUtils.cloneObject(vehicle);
        this.formGroupVehicle.patchValue(this.vehicleSelDetails);
        this.display = true;
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
                this.reportSoat(vehicle);
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
    reportSoat(vehicle: IVehicle) {
        const urlHostOrigin = window.location.origin + '/';
        const pdfDefinition: any = {
            pageMargins: [20, 20, 20, 20],
            content: [
                {
                    columns: [
                        {
                            alignment: 'left',
                            image: 'logoHeaderIzq',
                            width: 150,
                            height: 40
                        },
                        {
                            alignment: 'center',
                            text: [
                                { qr: vehicle.appearanceNumber },
                                '\n',
                                'ORDEN DE COMPARENDO',
                                '\n',
                                vehicle.appearanceNumber
                            ],
                        },
                        {
                            alignment: 'right',
                            image: 'logoHeaderDer',
                            width: 150,
                            height: 40
                        }
                    ],
                },
                '\n',
                {
                    columns: [
                        {
                            lineHeight: 1.5,
                            text: [
                                vehicle.fullName,
                                '\n',
                                vehicle.addressCustomer,
                                '\n',
                                vehicle.city,
                            ]
                        },
                        {
                            alignment: 'justify',
                            text: 'El instituto Departamental de Tránsito del Cesar en virtud de lo preceptuado en el artículo 8 de la Ley 1843 se permite notificar por este medio la orden de comparendo \n No: [NUMERO DE COMPARENDO]',
                        },
                    ]
                },
                '\n',
                {
                    columns: [
                        {
                            width: '30%',
                            alignment: 'left',
                            text: '[IMAGEN DE LA INFRACCION]',
                        },
                        {
                            width: '20%',
                            alignment: 'center',
                            text: '[IMAGEN DE LA PLACA]',
                        },
                        {
                            width: '50%',
                            alignment: 'right',
                            widths: ['auto', 'auto'],
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [{ text: 'Placa', alignment: 'left', bold: true }, { text: vehicle.plate.toUpperCase(), alignment: 'left' }],
                                    [{ text: 'Infracción', alignment: 'left', bold: true }, { text: vehicle.infraction, alignment: 'left' }],
                                    [{ text: 'Dirección infracción', alignment: 'left', bold: true }, { text: vehicle.addressInfraction, alignment: 'left' }],
                                    [{ text: 'Fecha evidencia', alignment: 'left', bold: true }, { text: moment(vehicle.datePlateImage).format("L"), alignment: 'left' }],
                                    [{ text: 'Hora evidencia', alignment: 'left', bold: true }, { text: moment(vehicle.datePlateImage).format("hh:mm A"), alignment: 'left' }],
                                    [{ text: 'Fecha venc. SOAT', alignment: 'left', bold: true }, { text: moment(vehicle.soatExpirationDate).format("L"), alignment: 'left' }],
                                ]
                            },
                        },
                    ]
                },
                '\n',
                {
                    alignment: 'justify',
                    text: [
                        'Sírvase comparecer a la Oficinas del Instituto Departamental de Tránsito del Cesar, a más tardar dentro de los once (11) días hábiles siguientes contados a partir de la fecha de recibo de la presente citación, para que haga uso de su derecho de defensa e informe si se encontraba conduciendo el vehículo de su propiedad, al momento de cometerse la infracción, con el fin que la autoridad de tránsito pueda continuar el proceso contravencional con el respectivo infractor, so pena de incurrir en la conducta descrita en el Artículo 51 del CPACA, aplicable por remisión expresa del Artículo 9 de la Ley 1843 de 2017.',
                        '\n\n',
                        'Se le informa al citado, que en caso que comparezca y reconozca la comisión de la infracción, podrá hacer uso los descuentos contemplados en el artículo 136 del Estatuto de Tránsito, de lo contrario, luego de informar los datos (Nombre completo, identificación y dirección para notificaciones) de quien iba conduciendo al momento de la infracción, quedará desvinculado del proceso contravencional, el cual será seguido exclusivamente contra el infractor, sin que exista solidaridad entre ambos. La autoridad de tránsito garantiza el respeto del derecho al debido proceso del propietario, otorgándole la posibilidad de exonerarse del pago de la multa, si cumple con la obligación legal de entregar la información de quien fuera el infractor, en el evento que el propietario no haya cometido la infracción personalmente, por lo tanto, si el propietario no comparece sin justa causa comprobada dentro de los términos de la citación, y habiendo transcurridos 30 días calendario contados a partir de la presunta comisión de la infracción, la autoridad podrá en el ejercicio de sus funciones, continuar el respectivo proceso contravencional, de la forma como lo dispone el inciso tercero del Artículo 137 de la Ley 769 de 2.002, fallándose en audiencia pública y notificándose en estrados. En la misma audiencia, si fuere posible se practicarán las pruebas y se sancionará o absolverá al inculpado. Si fuere declarado contraventor, se le impondrá la obligación pago del cien por ciento (100%) del valor de la sanción prevista en la ley, según lo establecido en el artículo 205 del Decreto 19 de 2012.',
                        '\n\n',
                        'La sanción que se imponga al propietario del vehículo en el que se cometió la infracción, que no comparezca dentro del término otorgado por el Código Nacional de Tránsito, o que presentándose incurra en la conducta descrita en el Artículo 51 del CPACA, consistirá exclusivamente en la obligación de pagar la multa, es decir, que no le serán aplicables los demás efectos que puedan derivarse de la infracción.',
                        '\n\n',
                        'Se le informa que, al momento de comparecer, deberá portar consigo y hacer entrega, del documento de identificación, licencia de conducción, tarjeta de propiedad del vehículo y tarjeta de operación si se trata de servicio público, para efectos de verificar su identidad. Si su comparecencia es a través de apoderado, este deberá aportar documento de identificación, tarjeta profesional y poder con nota de presentación personal ante notaría, de acuerdo con lo estipulado en el Artículo 138 de la Ley 769 de 2002.'
                    ],
                },
                '\n',
                {
                    columns: [
                        {
                            width: '50%',
                            alignment: 'right',
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [
                                        {
                                            colSpan: 2,
                                            alignment: 'right',
                                            bold: true,
                                            fontSize: 10,
                                            text: [
                                                { text: 'Valor de la multa: ', bold: true },
                                                { text: vehicle.valueOfTheFine }
                                            ]
                                        },
                                        {}
                                    ],
                                    [
                                        { text: 'Para comparecer o pagar', colSpan: 2, alignment: 'left', bold: true },
                                        {}
                                    ],
                                    [
                                        { text: 'Sede operativa', alignment: 'left', bold: true },
                                        { text: '[DIRECCION SEDE]', alignment: 'left' },
                                    ],
                                    [
                                        { text: 'Horario', alignment: 'left', bold: true },
                                        { text: '[HORARIO ATENCION]', alignment: 'left' },
                                    ],
                                    [
                                        { text: 'Celular', alignment: 'left', bold: true },
                                        { text: '[TELEFONO DE CONTACTO]', alignment: 'left' },
                                    ],
                                    [
                                        { text: 'Email', alignment: 'left', bold: true },
                                        { text: '[DIRECCION DE CORREO]', alignment: 'left' },
                                    ],
                                ]
                            },
                        },
                        {
                            width: '50%',
                            alignment: 'right',
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [
                                        { text: 'Descuentos', alignment: 'left', bold: true, fontSize: 10 },
                                        { text: 'Formas de pago', alignment: 'left', bold: true, fontSize: 10 }
                                    ],
                                    [
                                        {
                                            text: [
                                                '\n',
                                                '\n',
                                                { text: '1 a 11 días hábiles: 50%', alignment: 'left' },
                                                '\n',
                                                { text: '12 a 20 días hábiles: 25%', alignment: 'left' },
                                            ]
                                        },
                                        {
                                            alignment: 'left',
                                            ul: [
                                                'En las cajas ubicadas en nuestra oficina.',
                                                'Bco. Davivienda – Cuenta de Ahorros No: 4828 0001 1561',
                                                'En SIMIT en cualquier oficina de Tránsito del país. - www.simit.org.co',
                                            ]
                                        }
                                    ],
                                ]
                            },
                        },
                        {

                        }
                    ]
                },
                '\n',
                {
                    text: 'FIRMA Y FECHA DE VALIDACION',
                    fontSize: 6
                },
                {
                    text: '[IMAGEN DE FIRMA]',
                },
                '\n',
                {
                    text: '[NOMBRE DE FIRMA]',
                },
                '\n',
                {
                    text: [
                        { text: 'Sede Administrativa IDTRACESAR: ', bold: true },
                        { text: '[DIRECCION SEDE ADM]' },
                    ],
                },
                {
                    text: [
                        { text: 'Sede operativa: ', bold: true },
                        { text: '[DIRECCION SEDE OPE]' },
                    ],
                },
                {
                    text: [
                        { text: 'Telefonos: ', bold: true },
                        { text: '[TELEFONO SEDE]' },
                    ],
                },
                {
                    text: [
                        { text: 'Pagina Web: ', bold: true },
                        { text: '[PAGINA WEB]' },
                    ],
                },
            ],
            defaultStyle: {
                fontSize: 12,
                bold: false
            },
            images: {
                logoHeaderIzq: urlHostOrigin + 'assets/img/logos/logoHeaderIzq.png',
                logoHeaderDer: urlHostOrigin + 'assets/img/logos/logoHeaderDer.png'
            },
            styles: {
                logoHeaderIzq: {},
                logoHeaderDer: {}
            }
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

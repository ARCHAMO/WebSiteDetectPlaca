import { cloneDeep } from "lodash";

export let GeneralUtils = {
    cloneObject(object: any) {
        return cloneDeep(object);
    },
    /**
   * Metodo para convertir id del mes en letras
   * @param id del mes a buscar
   * @returns string con el nombre del mes
   */
    convertirMesNumeroALetras(id: number): string {
        let value: string = "";
        var meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        for (var i = 1; i <= meses.length; i++) {
            if (i === id) {
                value = meses[i - 1];
            }
        }
        return value;
    },
}

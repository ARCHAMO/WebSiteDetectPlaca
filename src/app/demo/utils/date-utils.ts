export let DateUtils = {
    formatDate: (dataDate: Date, format: string) => {
        const dateFormat = '';
        return dateFormat;
    },
    /**
     * Metodo usado para ordenar un json version 2
     * @param data array de objetos que se desean ordenar
     * @param key llave por la cual se desea ordenar
     * @param orden descendente o ascendente
     * @returns json ordenado
     */
    getSortJsonV2(data: any[], key: string | number, orden: string) {
        return data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
            const x = a[key];
            const y = b[key];
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    },
    /**
     * Metodo para ordenar un json version 3
     * @param argumentos - necesarios para el ordenamiento, [0] array a ordenar
     * @returns nuevo objeto ordenado
     */
    getSortJsonV3(argumentos: any[]) {
        const args = argumentos;
        const array = argumentos[0];
        let caseSensitive: boolean;
        let keysLength: number;
        let key: any[];
        let desc: boolean;
        let a: string;
        let b: string;
        let i: number;

        if (typeof argumentos[argumentos.length - 1] === 'boolean') {
            caseSensitive = argumentos[argumentos.length - 1];
            keysLength = argumentos.length - 1;
        } else {
            caseSensitive = false;
            keysLength = argumentos.length;
        }

        return array.sort((obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) => {
            for (i = 1; i < keysLength; i++) {
                key = args[i];
                if (typeof key !== 'string') {
                    desc = key[1];
                    key = key[0];
                    a = obj1[args[i][0]];
                    b = obj2[args[i][0]];
                } else {
                    desc = false;
                    a = obj1[args[i]];
                    b = obj2[args[i]];
                }

                if (caseSensitive === false && typeof a === 'string') {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                }

                if (!desc) {
                    if (a < b) { return -1; }
                    if (a > b) { return 1; }
                } else {
                    if (a > b) { return -1; }
                    if (a < b) { return 1; }
                }
            }
            return 0;
        });
    },

    /**
     * Metodo utilizado para obtener un arreglo de un objeto con sus key ordenadas de mayor a menor
     * @param entities arraglo que se desea ordenar
     * @returns arreglo ordenado
     */
    sortKeyMaxToMin(entities: any): any {
        let entitiesSort: Array<any> = [];
        const keysSort = Object.keys(entities).sort((b, a) => (+a) - (+b));
        keysSort.map(key => entitiesSort.push(entities[key]));
        return entitiesSort;
    }
}

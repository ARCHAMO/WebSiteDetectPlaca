/**
 *
 */
export interface IDashboard {
    totalReadings: number,
    effectivePlates: number,
    totalInfraction: number,
    totalReadingsForMonth: IObjectSeriesnumber[],
    effectivePlatesForMonth: IObjectSeriesnumber[],
    totalInfractionForMonth: IObjectSeriesnumber[],
}

/**
 *
 */
export interface IObjectSeriesnumber {
    key: number,
    value: number
}

/**
 *
 */
export interface IObjectSeriesString {
    key: String,
    value: String
}

/**
 *
 */
export interface IObjectSeriesAny {
    key: any,
    value: any
}

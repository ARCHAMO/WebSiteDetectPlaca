export interface PlateRecognizer {
    _id: string;
    processing_time: number,
    results: any[],
    filename: string,
    version: number,
    camera_id: any,
    fileNameClient: string,

    userCreationId?: string,
    userModificationId?: string,
    createdAt?: Date,
    updatedAt?: Date
}

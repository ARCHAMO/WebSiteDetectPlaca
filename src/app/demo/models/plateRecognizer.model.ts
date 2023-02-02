export interface IPlateRecognizer {
    _id: string;
    processing_time: number,
    results: any[],
    filename: string,
    version: number,
    camera_id: any,
    fileNameClient: string,
    datePlateImage: Date,

    userCreationId?: string,
    userModificationId?: string,
    createdAt?: Date,
    updatedAt?: Date
}

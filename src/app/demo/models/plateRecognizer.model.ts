export interface PlateRecognizer {
    _id: string;
    processing_time: Number,
    results: any[],
    filename: String,
    version: Number,
    camera_id: any,

    userCreationId?: String,
    userModificationId?: String,
    createdAt?: Date,
    updatedAt?: Date
}

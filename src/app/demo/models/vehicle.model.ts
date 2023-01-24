export interface Vehicle {
    _id: string;
    plate: String,
    codeRegion: String,
    score: Number,
    type: String,

    userCreationId: String,
    userModificationId: String,
    createdAt: Date,
    updatedAt: Date
}

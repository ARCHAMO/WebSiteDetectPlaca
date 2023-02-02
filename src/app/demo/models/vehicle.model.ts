export interface IVehicle {
    _id: string;
    plate: string,
    codeRegion: string,
    score: number,
    type: string,
    fullName: string,
    identification: string,
    infraction: string,
    addressInfraction: string,
    addressCustomer: string,
    typeInfraction: string,
    evidenceDate: Date,
    soatExpirationDate: Date,
    city: string,
    appearanceNumber: string,
    valueOfTheFine: number
    datePlateImage: Date,
    plateRecognizerId: string,

    userCreationId?: string,
    userModificationId?: string,
    createdAt?: Date,
    updatedAt?: Date
}

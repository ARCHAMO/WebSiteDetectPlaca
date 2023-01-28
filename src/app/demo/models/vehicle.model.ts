export interface Vehicle {
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

    userCreationId?: string,
    userModificationId?: string,
    createdAt?: Date,
    updatedAt?: Date
}

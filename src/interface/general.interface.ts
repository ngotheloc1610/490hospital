export interface ISpecialty {
    id: string
    department: {
        coding: string,
        display: string,
    },
    code: string,
    display: string,
    photo: string,
    description: string,
    detail: string,
    specialistTeamPhoto: string,
    specialistTeamDescription: string,
}

export interface IDepartment {
    id: string,
    codeableConcept: {
        coding: ICoding[],
        display: string,
    },
    emojiPhoto: string,
    photo: string,
    describe: string,
    specialty: any,
    descriptions: string
}

export interface ICoding {
    system: string,
    version: any,
    code: string,
    display: string,
    userSelected: string,
}


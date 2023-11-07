export interface ISpecialty {
    id: string
    department: {
        coding: string,
        display: string,
    },
    code: string,
    name: string,
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
    describe: string,
    photo: string,
    title: string
    titleDetail: string
}

export interface ICoding {
    system: string,
    version: any,
    code: string,
    display: string,
    userSelected: string,
}


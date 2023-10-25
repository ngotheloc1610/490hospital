export interface IService {
    serviceName: string,
    photo: string,
    serviceDescription: string,
    departments: null,
    rankServices: [],
    vouchers: [],
    id: string
}

export interface IParamSearchDoctor {
    nameDoctor: string;
    department: string;

}

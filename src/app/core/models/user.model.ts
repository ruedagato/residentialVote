export interface User {
    role: number;
    ID_CONJUNTO: string;
    estatus: boolean;
    info?: UserInfo;
}

export interface UserInfo {
    nombre: string;
    correo: string;
    apartamentos?: string[];
    nombreConjunto?: string;
    direccion?: string;
}

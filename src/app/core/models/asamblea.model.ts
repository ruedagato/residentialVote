export interface AsambleaModel {
  name: string;
  active: boolean;
  uid: string;
  residents?: {
    name: string;
    uid: string;
  }[];
  questions?: Questions[];
}

export interface Questions {
  uid: string;
  name: string;
  options?: {
    name: string;
    uid: string;
    numSelected: number;
  }[];
}

export interface AptoTypes {
  tipo: string;
  area: number;
  porcentaje: number;
}

export interface Aptos {
  torre: number;
  piso: number;
  apto: number;
  tipo: string;
}

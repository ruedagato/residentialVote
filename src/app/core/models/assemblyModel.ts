export interface AssemblyModel {
  uid: string;
  conjuntoUId: string;
  name: string;
  description?: string;
  active: boolean;
  questions?: Questions[];
}

export interface Questions {
  uid: string;
  label: string;
  status: boolean;
  assemblyUid: string;
  options?: OptionQuestions[];
  votes?: { [key: string]: string };
}

export interface OptionQuestions {
  name: string;
  uid: string;
  numSelected: number;
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

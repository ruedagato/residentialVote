import { UserRole } from 'app/core/models/user.model';

export interface AdminModel {
  role: UserRole;
  email: string;
  status: boolean;
  info?: {
    idConjunto: string;
    address: string;
    name: string;
    nameConjunto: string
  };
}

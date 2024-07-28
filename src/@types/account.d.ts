type IUserRoleType = 'ADMIN' | 'CUSTOMER' | 'EMPLOYEE' 

interface IUser {
  id: string;
  name: string;
  email: string;
  role: IUserRoleType;
  is_active: boolean;
}
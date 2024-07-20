export interface User {
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  role: {
    roleName: string;
    roleDescription: string;
  }[];
}

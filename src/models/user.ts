export interface User {
  firstName: string;
  middleNames?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  modifiedByID?: string;
  roleID: string;
  organizationID?: string;
  designationID: string;
  allocatedLeaveDays: number;
  username: string;
  password?: string;
}
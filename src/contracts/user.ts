export interface ChangeData {
  first_name: string;
  second_name: string;
  display_name: string,
  login: string;
  email: string;
  phone: string;
}

export interface ChangePassData {
  oldPassword: string;
  newPassword: string;
}

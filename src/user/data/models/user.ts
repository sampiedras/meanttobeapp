export type UserModel = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  avatar?: string;
};

export type FormCompleteAccountModel = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
};

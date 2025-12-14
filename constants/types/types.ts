export type UserDataType = {
  name: string;
  image?: any;
}

export type UserType = {
  uid?: string;
  email?: string| null;
  name: string|null;
  image?: any
} | null;

export type ImageUploadProps = {
  file?: any;
  onSelect: (file: any) => void;
  onClear: () => void;
  containerStyle?: any;
  imageStyle?: any;
  plaholder?: string;
}

export type AuthContextType = {
  user: UserType;
  setUser: Function;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{sucess: boolean; msg?: string}>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{sucess: boolean; msg?: string}>;
  updateUserData: (userId: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export type ResponseType = {
  sucess: boolean;
  msg?: string;
  data?: any;
}
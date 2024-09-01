export interface IMetadata {
  total: number;
}

export interface ISResponse<T> {
  metadata: IMetadata;
  data: T[];
}

export interface IMResponse<T> {
  data: T;
}

export interface IUserProfile {
  googleId: string;
  email: string;
  name: string;
}

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

export interface IQuestionData {
  title: string;
  description: string;
  image_url: string | null;
  source: string;
}

export interface IOptionData {
  option: number;
  option_text: string;
  is_correct: boolean;
}

export interface ISubjectData {
  name: string;
  description: string;
}

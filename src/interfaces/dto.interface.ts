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
  subject_id: number;
  author_id: number;
  question_text: string;
  question_type: string;
  correct_answer: string;
  explanation: string;
  image_url: string | null;
  source: string;
}

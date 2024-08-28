import { Identifier } from 'sequelize';

export interface IInfoJWTPayload {
  id: Identifier;
  googleId: string;
  email: string;
}

export interface IJWTDecoded extends IInfoJWTPayload {
  iat: number;
  exp: number;
}

import { auth } from '../controllers/auth.controller';
import passport from '../utils/passport';
import { AuthRequest } from '../interfaces/http.interface';
import { Response, NextFunction } from 'express';

jest.mock('../services/auth.service');
jest.mock('../utils/passport');

describe('Auth Controller', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn(),
      end: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('auth', () => {
    it('패스포트를 통해 Google OAuth 인증을 진행한다', async () => {
      passport.authenticate = jest.fn().mockImplementation((_, __) => {
        return (___: AuthRequest, ____: Response, next: NextFunction) => {
          next();
        };
      });
      auth(mockReq as AuthRequest, mockRes as Response, mockNext);
      expect(passport.authenticate).toHaveBeenCalledWith('google', {
        scope: ['profile', 'email'],
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });
});

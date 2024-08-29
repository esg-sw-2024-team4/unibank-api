import jwt from 'jsonwebtoken';
import { issueToken, deleteUser } from '../services/auth.service';
import User from '../models/user.model';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

jest.mock('jsonwebtoken');
jest.mock('../models/user.model');

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('issueToken', () => {
    test('페이로드에 따라 JWT 토큰을 발행한다', () => {
      const payload = {
        id: 1,
        googleId: 'this-is-google-id',
        email: 'unibank-tester@unibank.test.io',
      };
      const token = 'test-jwt-token';
      (jwt.sign as jest.Mock).mockReturnValue(token);
      const result = issueToken(payload);
      expect(jwt.sign).toHaveBeenCalledWith(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      expect(result).toBe(token);
    });
  });

  describe('deleteUser', () => {
    test('사용자가 이미 존재하는 경우에만 사용자를 삭제한다', async () => {
      const user = { destroy: jest.fn() };
      (User.findByPk as jest.Mock).mockResolvedValue(user);
      await deleteUser(1);
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(user.destroy).toHaveBeenCalled();
    });

    test('존재하지 않는 사용자에 대한 삭제 요청에 대해서 오류를 발생시킨다', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);
      await expect(deleteUser(1)).rejects.toThrow('Invalid request...');
    });
  });
});

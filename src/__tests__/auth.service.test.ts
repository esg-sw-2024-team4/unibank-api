import { Transaction } from 'sequelize';

import sequelize from '../config/db';

import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

import {
  issueToken,
  deleteUser,
  createOrUpdateUser,
} from '../services/auth.service';

import User from '../models/user.model';

let transaction: Transaction;

describe('Auth Service', () => {
  describe('with transaction', () => {
    beforeEach(async () => {
      transaction = await sequelize.transaction();
    });

    afterEach(async () => {
      await transaction.rollback();
    });

    describe('deleteUser', () => {
      test('존재하지 않는 사용자에 대한 삭제 요청에 대해서 오류를 발생시킨다', async () => {
        expect(deleteUser(1, transaction)).rejects.toThrow(
          'Invalid request...',
        );
      });

      test('존재하는 사용자에 대한 삭제 요청에 대해서 사용자를 삭제한다', async () => {
        const user = await createOrUpdateUser(
          {
            googleId: 'this-is-google-id',
            email: 'unibank-tester@unibank.test.io',
            name: 'unibank-tester',
          },
          transaction,
        );
        await deleteUser(user.dataValues.id, transaction);
        expect(await User.findByPk(user.id)).toBeNull();
      });
    });
  });

  describe('without transaction', () => {
    describe('issueToken', () => {
      test('Payload 에 따라 JWT 토큰을 발행한다', () => {
        const payload = {
          id: 1,
          googleId: 'this-is-google-id',
          email: 'unibank-tester@unibank.test.io',
        };
        const token = jwt.sign(payload, JWT_SECRET!, {
          expiresIn: JWT_EXPIRES_IN || '3h',
        });
        const result = issueToken(payload);
        expect(result).toBe(token);
      });
    });
  });
});

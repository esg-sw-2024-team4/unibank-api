import { Transaction } from 'sequelize';

import sequelize from '../config/db';

import { deleteUser, createOrUpdateUser } from '../services/auth.service';

import models from '../models';

const { User } = models;

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
        expect(deleteUser(transaction, 1)).rejects.toThrow(
          'Invalid request...',
        );
      });

      test('존재하는 사용자에 대한 삭제 요청에 대해서 사용자를 삭제한다', async () => {
        const user = await createOrUpdateUser(transaction, {
          googleId: 'this-is-google-id',
          email: 'unibank-tester@unibank.test.io',
          name: 'unibank-tester',
        });
        await deleteUser(transaction, user.dataValues.id);
        expect(await User.findByPk(user.id)).toBeNull();
      });
    });
  });
});

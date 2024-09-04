import { Transaction } from 'sequelize';
import sequelize from '../config/db';
import {
  addQuestion,
  findQuestionById,
  findQuestions,
  modifyQuestion,
  removeQuestion,
} from '../services/question.service';

import models from '../models';
import { assert } from 'console';

const { Question, Subject, User, Option } = models;

let transaction: Transaction;

const mockQuestionData = {
  title: 'What is 2+2?',
  description: 'Basic arithmetic.',
  image_url: 'http://example.com/image1.png',
  source: 'Basic Arithmetic Textbook',
};

const mockOptionsData = [
  { option: 2, option_text: '2번 답', is_correct: false },
  { option: 3, option_text: '3번 답', is_correct: false },
  { option: 4, option_text: '4번 답', is_correct: true },
  { option: 5, option_text: '5번 답', is_correct: false },
];

describe('Question Service', () => {
  describe('with Transaction', () => {
    beforeEach(async () => {
      transaction = await sequelize.transaction();
    });

    describe('addQuestion', () => {
      test.skip('문제 생성 확인', async () => {
        await Subject.create(
          {
            name: 'Advanced Mathematics',
            description: 'Advanced course in Mathematics',
          },
          { transaction },
        );
        await User.create(
          {
            googleId: 'example',
            email: 'example@gmail.com',
            name: 'test',
          },
          { transaction },
        );
        const newQuestion = await addQuestion(
          transaction,
          1,
          1,
          mockQuestionData,
          mockOptionsData,
        );
        expect(newQuestion).toBeDefined();
        expect(newQuestion).toHaveProperty('id');
        expect(newQuestion?.title).toBe('What is 2+2?');
        expect(newQuestion?.source).toBe('Basic Arithmetic Textbook');
      });
    });

    // describe('findQuestions', () => {
    //   test('문제 목록 조회 확인', async () => {
    //     const question = await findQuestions();
    //     expect(question.metadata.total).toBe(await Question.count());
    //     expect(question.data).toBeDefined();
    //   });
    // });

    // describe('findQuestionById', () => {
    //   test('문제 조회 확인', async () => {
    //     const newQuestion = await addQuestion(
    //       mockQuestionData,
    //       mockOptionsData,
    //       transaction,
    //     );
    //     const retrievedQuestion = await findQuestionById(newQuestion.id);
    //     expect(retrievedQuestion).toBeDefined();
    //     expect(retrievedQuestion.id).toBe(newQuestion.id);
    //   });
    // });

    // describe('modifyQuestion', () => {
    //   test('문제 수정 확인', async () => {
    //     const newQuestion = await addQuestion(
    //       mockQuestionData,
    //       mockOptionsData,
    //       transaction,
    //     );
    //     const updatedQuestionData = {
    //       title: 'What is 3+3?',
    //       description: 'Basic arithmetic.',
    //       image_url: 'http://example.com/image3.png',
    //       source: 'Updated Arithmetic Textbook',
    //     };
    //     const updatedOptions = [
    //       { option: 4, is_correct: false },
    //       { option: 5, is_correct: false },
    //       { option: 6, is_correct: true },
    //     ];
    //     await modifyQuestion(
    //       newQuestion.id,
    //       updatedQuestionData,
    //       updatedOptions,
    //       transaction,
    //     );
    //     const modifiedQuestion = await Question.findByPk(newQuestion.id);
    //     expect(modifiedQuestion).toBeDefined();
    //     expect(modifiedQuestion?.title).toBe('What is 3+3?');
    //     expect(modifiedQuestion?.source).toBe('Updated Arithmetic Textbook');
    //     expect(modifiedQuestion?.options).toBeDefined();
    //     expect(modifiedQuestion?.options?.length).toBe(3);
    //   });
    // });

    // describe('removeQuestion', () => {
    //   test('존재하지 않는 문제 삭제 시, 오류 출력', async () => {
    //     expect(removeQuestion(1, transaction)).rejects.toThrow('');
    //   });
    //   test('존재하는 문제일 시, 삭제', async () => {
    //     const newQuestion = await addQuestion(
    //       mockQuestionData,
    //       mockOptionsData,
    //       transaction,
    //     );
    //     await removeQuestion(newQuestion.id, transaction);
    //     expect(await Question.findByPk(newQuestion.id)).toBeNull();
    //   });
    // });
  });
});

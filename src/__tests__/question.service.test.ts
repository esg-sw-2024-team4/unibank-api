import { Transaction } from 'sequelize';
import sequelize from '../config/db';
import {
  addQuestion,
  findQuestionById,
  findQuestions,
  modifyQuestion,
  removeQuestion,
} from '../services/question.service';
import Question from '../models/question.model';
import Subject from '../models/subject.model';
import User from '../models/user.model';

let transaction: Transaction;

const mockQuestion = {
  subject_id: 1,
  author_id: 1,
  question_text: 'What is 2+2?',
  correct_answer: '4',
  explanation: 'Basic arithmetic.',
  image_url: 'http://example.com/image1.png',
  source: 'Basic Arithmetic Textbook',
};

describe('Question Service', () => {
  describe('with Transaction', () => {
    beforeEach(async () => {
      transaction = await sequelize.transaction();
      const newSubject = await Subject.create(
        {
          name: 'Advanced Mathematics',
          description: 'Advanced course in Mathematics',
        },
        { transaction },
      );

      const newUser = await User.create(
        {
          googleId: 'example',
          email: 'example@gmail.com',
          name: 'test',
        },
        { transaction },
      );
    });
    afterEach(async () => {
      await transaction.rollback();
    });

    describe('addQuestion', () => {
      test('문제 생성 확인', async () => {
        const newQuestion = await addQuestion(mockQuestion, transaction);
        expect(newQuestion).toHaveProperty('id');
        expect(newQuestion.questionText).toBe('What is 2+2?');
        expect(newQuestion.source).toBe('Basic Arithmetic Textbook');
      });
    });

    describe('findQuestions', () => {
      test('문제 목록 조회 확인', async () => {
        const question = await findQuestions();
        expect(question.metadata.total).toBe(await Question.count());
        expect(question.data).toBeDefined();
      });
    });

    describe('findQuestionById', () => {
      test('문제 조회 확인', async () => {
        const newQuestion = await addQuestion(mockQuestion, transaction);
        const retrievedQuestion = await findQuestionById(newQuestion.id);
        expect(retrievedQuestion).toBeDefined();
        expect(retrievedQuestion.id).toBe(newQuestion.id);
      });
    });

    describe('modifyQuestion', () => {
      test('문제 수정 확인', async () => {
        const newQuestion = await addQuestion(mockQuestion, transaction);

        const updateData = {
          question_text: 'What is 3+3?',
          correct_answer: '6',
          explanation: 'Basic arithmetic.',
          image_url: 'http://example.com/image3.png',
          source: 'Updated Arithmetic Textbook',
        };

        await modifyQuestion(newQuestion.id, updateData, transaction);

        const modifiedQuestion = await Question.findByPk(newQuestion.id);

        expect(modifiedQuestion).toBeDefined();
        expect(modifiedQuestion?.questionText).toBe('What is 3+3?');
        expect(modifiedQuestion?.correctAnswer).toBe('6');
      });
    });

    describe('removeQuestion', () => {
      test('존재하지 않는 문제 삭제 시, 오류 출력', async () => {
        expect(removeQuestion(1, transaction)).rejects.toThrow('');
      });
      test('존재하는 문제일 시, 삭제', async () => {
        const newQuestion = await addQuestion(mockQuestion, transaction);

        await removeQuestion(newQuestion.id, transaction);

        expect(await Question.findByPk(newQuestion.id)).toBeNull();
      });
    });
  });
});

import { Transaction } from 'sequelize';
import sequelize from '../config/db';
import { findSubjectsByKeyword } from '../services/subject.service';

import models from '../models';

const { Subject } = models;

let transaction: Transaction;

describe('Subject Service', () => {
  describe('with Transaction', () => {
    beforeEach(async () => {
      transaction = await sequelize.transaction();
    });

    afterEach(async () => {
      await transaction.rollback();
    });

    test('키워드로 검색 시, 해당되는 과목들 조회', async () => {
      await Subject.create(
        { name: '기하학', description: '기하학' },
        { transaction },
      );
      await Subject.create(
        { name: '대수학', description: '대수학' },
        { transaction },
      );
      await Subject.create(
        { name: '미적분학', description: '미적분학' },
        { transaction },
      );
      let search = '';
      let subjects = await findSubjectsByKeyword(search);
      expect(subjects.metadata.total).toBe(3);
      expect(subjects.data.length).toBe(3);
      search = '기하';
      subjects = await findSubjectsByKeyword(search);
      expect(subjects.metadata.total).toBe(1);
      expect(subjects.data.length).toBe(1);
      search = '분학';
      subjects = await findSubjectsByKeyword(search);
      expect(subjects.metadata.total).toBe(1);
      expect(subjects.data.length).toBe(1);
      search = '학';
      subjects = await findSubjectsByKeyword(search);
      expect(subjects.metadata.total).toBe(3);
      expect(subjects.data.length).toBe(3);
    });

    test('과목 생성 확인', async () => {
      const newSubject = await Subject.create(
        { name: '기하학', description: '기하학' },
        { transaction },
      );
      expect(newSubject).toHaveProperty('id');
      expect(newSubject.name).toBe('기하학');
      expect(newSubject.description).toBe('기하학');
    });

    test('과목 조회 확인', async () => {
      const newSubject = await Subject.create(
        { name: '기하학', description: '기하학' },
        { transaction },
      );
      const matchedSubject = await Subject.findByPk(newSubject.id);
      expect(matchedSubject).toBeDefined();
      expect(matchedSubject?.id).toBe(newSubject.id);
      expect(matchedSubject?.name).toBe('기하학');
      expect(matchedSubject?.description).toBe('기하학');
    });
  });
});

import User from './user.model';
import Question from './question.model';
import Subject from './subject.model';

// 관계 설정
Question.belongsTo(Subject, {
  foreignKey: 'subjectId',
  targetKey: 'id',
});
Question.belongsTo(User, {
  foreignKey: 'authorId',
  targetKey: 'id',
});

Subject.hasMany(Question, { foreignKey: 'subjectId', sourceKey: 'id' });
User.hasMany(Question, { foreignKey: 'authorId', sourceKey: 'id' });

const models = {
  User,
  Question,
  Subject,
};

export default models;

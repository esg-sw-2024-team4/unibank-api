import User from './user.model';
import Question from './question.model';
import Subject from './subject.model';
import Option from './option.model';
import SubjectQuestion from './subject-question.model';
import UserAnswerQuestion from './user-answer-question.model';
import UserFavoriteQuestion from './user-favorite-question.model';

Subject.belongsToMany(Question, {
  through: SubjectQuestion,
  foreignKey: {
    name: 'subject_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
Question.belongsToMany(Subject, {
  through: SubjectQuestion,
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

User.hasMany(Question, {
  foreignKey: 'author_id',
  as: 'questions',
});
Question.belongsTo(User, {
  foreignKey: {
    name: 'author_id',
    allowNull: false,
  },
  targetKey: 'id',
  onDelete: 'CASCADE',
});

Question.hasMany(Option, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
  as: 'options',
});
Option.belongsTo(Question, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
  as: 'question',
  onDelete: 'CASCADE',
});

User.hasMany(UserAnswerQuestion, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'answers',
});
UserAnswerQuestion.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Question.hasMany(UserAnswerQuestion, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
});
UserAnswerQuestion.belongsTo(Question, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

User.hasMany(UserFavoriteQuestion, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  as: 'favorites',
});
UserFavoriteQuestion.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Question.hasMany(UserFavoriteQuestion, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
});
UserFavoriteQuestion.belongsTo(Question, {
  foreignKey: {
    name: 'question_id',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

const models = {
  User,
  Question,
  Subject,
  Option,
  SubjectQuestion,
  UserAnswerQuestion,
  UserFavoriteQuestion,
};

export default models;

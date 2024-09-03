import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/db';
import Question from './question.model';
import Subject from './subject.model';

class SubjectQuestion extends Model<
  InferAttributes<SubjectQuestion>,
  InferCreationAttributes<SubjectQuestion>
> {
  declare id: CreationOptional<number>;
  declare subjectId: ForeignKey<Subject['id']>;
  declare questionId: ForeignKey<Question['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SubjectQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'subject_questions',
  },
);

export default SubjectQuestion;

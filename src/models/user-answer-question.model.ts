import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';
import Question from './question.model';

class UserAnswerQuestion extends Model<
  InferAttributes<UserAnswerQuestion>,
  InferCreationAttributes<UserAnswerQuestion>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User['id']>;
  declare question_id: ForeignKey<Question['id']>;
  declare answer: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserAnswerQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'user_answer_questions',
  },
);

export default UserAnswerQuestion;

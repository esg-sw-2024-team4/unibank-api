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

class UserFavoriteQuestion extends Model<
  InferAttributes<UserFavoriteQuestion>,
  InferCreationAttributes<UserFavoriteQuestion>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User['id']>;
  declare question_id: ForeignKey<Question['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserFavoriteQuestion.init(
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
    tableName: 'user_favorite_questions',
  },
);

export default UserFavoriteQuestion;

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  NonAttribute,
  Association,
  HasManySetAssociationsMixin,
} from 'sequelize';

import sequelize from '../config/db';
import Question from './question.model';
import UserAnswerQuestion from './user-answer-question.model';
import UserFavoriteQuestion from './user-favorite-question.model';

class User extends Model<
  InferAttributes<
    User,
    {
      omit: 'questions' | 'answers' | 'favorites' | 'answers' | 'favorites';
    }
  >,
  InferCreationAttributes<
    User,
    {
      omit: 'questions' | 'answers' | 'favorites' | 'answers' | 'favorites';
    }
  >
> {
  declare id: CreationOptional<number>;
  declare googleId: string;
  declare email: string;
  declare name: string;
  declare point: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getQuestions: HasManyGetAssociationsMixin<Question>;
  declare createQuestion: HasManyCreateAssociationMixin<Question>;

  declare questions?: NonAttribute<Question[]>;

  declare getAnswers: HasManyGetAssociationsMixin<UserAnswerQuestion>;
  declare createAnswer: HasManyCreateAssociationMixin<UserAnswerQuestion>;

  declare answers?: NonAttribute<Question[]>;

  declare getFavorites: HasManyGetAssociationsMixin<UserFavoriteQuestion>;
  declare createFavorite: HasManyCreateAssociationMixin<UserFavoriteQuestion>;
  declare setFavorites: HasManySetAssociationsMixin<
    UserFavoriteQuestion,
    number
  >;

  declare favorites?: NonAttribute<Question[]>;

  declare static associations: {
    answers: Association<User, UserAnswerQuestion>;
    favorites: Association<User, UserFavoriteQuestion>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'users',
  },
);

export default User;

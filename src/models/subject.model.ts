import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import sequelize from '../config/db';
import Question from './question.model';

class Subject extends Model<
  InferAttributes<Subject, { omit: 'questions' }>,
  InferCreationAttributes<Subject, { omit: 'questions' }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;

  declare getQuestions: HasManyGetAssociationsMixin<Question>;

  declare questions?: NonAttribute<Question[]>;

  declare static associations: {
    questions: Association<Subject, Question>;
  };
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subjects',
  },
);

export default Subject;

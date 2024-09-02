import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/db';
import Subject from './subject.model';
import User from './user.model';

class Question extends Model<
  InferAttributes<Question>,
  InferCreationAttributes<Question>
> {
  declare id: CreationOptional<number>;
  declare subjectId: number;
  declare authorId: number;
  declare questionText: string;
  declare correctAnswer: string;
  declare explanation: string;
  declare imageUrl: string | null;
  declare source: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Subject, key: 'id' },
      onDelete: 'CASCADE',
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
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
    tableName: 'questions',
    timestamps: true,
  },
);

export default Question;

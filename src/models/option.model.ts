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

class Option extends Model<
  InferAttributes<Option>,
  InferCreationAttributes<Option>
> {
  declare id: CreationOptional<number>;
  declare questionId: ForeignKey<Question['id']>;
  declare option: number;
  declare optionText: string;
  declare isCorrect: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    option: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    optionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'options',
  },
);

export default Option;

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/db';

class Subject extends Model<
  InferAttributes<Subject>,
  InferCreationAttributes<Subject>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
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

import sequelize from '../config/db';
import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import Subject from './subject.model';
import User from './user.model';
import Option from './option.model';

class Question extends Model<
  InferAttributes<Question, { omit: 'subjects' | 'options' }>,
  InferCreationAttributes<Question, { omit: 'subjects' | 'options' }>
> {
  declare id: CreationOptional<number>;
  declare authorId: ForeignKey<User['id']>;
  declare title: string;
  declare description: string;
  declare imageUrl: string | null;
  declare source: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getSubjects: BelongsToManyGetAssociationsMixin<Subject>;
  declare setSubjects: BelongsToManySetAssociationsMixin<Subject, number>;

  declare subjects?: NonAttribute<Subject[]>;

  declare getOptions: HasManyGetAssociationsMixin<Option>;
  declare createOption: HasManyCreateAssociationMixin<Option>;

  declare options?: NonAttribute<Option[]>;

  declare isAccepted?: NonAttribute<boolean>;
  declare isFavorite?: NonAttribute<boolean>;

  declare static associations: {
    subjects: Association<Question, Subject>;
    options: Association<Question, Option>;
  };
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
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
  },
);

export default Question;

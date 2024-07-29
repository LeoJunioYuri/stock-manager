import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';


interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}


interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}


class Product extends Model<ProductAttributes, ProductCreationAttributes> 
  implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl?: string;
}


const ProductModel = Product.init(
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default ProductModel;

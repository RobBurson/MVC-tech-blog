const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment model
class Comment extends Model {}

Comment.init(
    { // define the schema
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // notEmpty: true, // i think this would also have worked
                len: [1]
            }
        },
        // need references to other associated tables
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
          },
          post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'post',
              key: 'id'
            }
          }
    },
    { // configure metadata
        sequelize,
        freezeTableName: true,
        underscored: true, // camelcase by default
        modelName: 'comment'
    }
);

module.exports = Comment;
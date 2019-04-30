'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Course.associate = function (models) {
    // associations can be defined here
    Course.belongsTo(models.User, { foreignKey: 'userId' })
    Course.hasMany(models.Assignment, { foreignKey: 'courseId' })
    Course.belongsToMany(models.User, {
      through: models.StudentCourse,
      foreignKey: 'courseId'
    })
  };
  return Course;
};
const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    }
  );
  User.associate = (models) => {
    // associations can be defined here  0777026637
    User.hasMany(models.Book, {
      foreignKey: "createdby",
      target: 'id',
      allowNull: false,
      onDelete: "CASCADE"
    });
  };
  return User;
};

export default UserModel;

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

  return User;
};

export default UserModel;

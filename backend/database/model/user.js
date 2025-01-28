module.exports = (connection, DataTypes) => {
   
    const User = connection.define(
      "Users",
      {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, 
            allowNull: false
                
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin',"seller"),
            defaultValue: 'user',
            allowNull: false,
        },
    }, {timestamps: true},
      
   
    )
    return User;
  };
  
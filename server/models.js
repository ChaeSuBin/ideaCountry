import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

// export const sequelize = new Sequelize(
//     process.env.DATABASE_URL || 'postgres://bablkjkqvudvvl:52649b965a8c41931012628c37622060220dcee81b2544195bf5f461df173cd0@ec2-34-230-153-41.compute-1.amazonaws.com:5432/d8h9jh5bvb9scm', 
//     {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false // ★このように書いてこのプロパティを追加
//       }
//     },}
//   );

export const sequelize = new Sequelize(
    "tempdb",      //DB名
    "postgres",      //ユーザー名
    "password",     //パスワード
    {
      dialect: "postgres"   //DBの製品名
    }
);

export const Pepper = sequelize.define("pepper", {
    teamid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    filehash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  { underscored: true },
);

export const Players = sequelize.define("players", {
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { underscored: true },
);

export const Teams = sequelize.define(
  "teams",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recruit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ideaToken: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    good: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jenre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    file2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { underscored: true },
);

export const TeamPlayers = sequelize.define(
  'team_play',
  {
    status: DataTypes.INTEGER
  },
  { timestamps: false }
);
export const PlayersPiece = sequelize.define(
  'piece_play',
  {},
  { timestamps: false }
);

export const Holds = sequelize.define("holds",
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokn: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { underscored: true },
);

export const Reply = sequelize.define(
  "replys",
  {
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accept: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  { underscored: true },
)

export const Piece = sequelize.define(
  "piece",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { underscored: true },
);

Players.belongsToMany(Teams, { through: TeamPlayers });
Teams.belongsToMany(Players, { through: TeamPlayers });

Players.belongsToMany(Piece, { through: PlayersPiece });
Piece.belongsToMany(Players, { through: PlayersPiece });
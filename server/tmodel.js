import { 
    sequelize, Players, Teams, Pepper, 
    TeamPlayers, Piece, Holds, Reply } from "./models.js";

//await sequelize.sync({ force: true }); //all table initilizing
//await Holds.sync({force: true});
await Teams.sync({alter: true});

console.log('o------------SYNC');
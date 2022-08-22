import { Teams, Players, Pepper, Holds
} from '../models.js';
import { getOwnerReturnId } from './getOwner.js';
import { sequelize } from '../models.js';

export const addPush = (body) => {
    return new Promise(resolve => {
        Players.findOne({
            where: { sub: body.userId }
            }).then(user => {
            if(user.token < body.pushAmount){
                resolve(false);
            }
            else{
                user.token -= body.pushAmount;
                user.save();
                findTeamAndPlusTokn(body);
                createPepper(body);
                createHold(body, false);
                resolve(true);
            }
        })
    });
}

const findTeamAndPlusTokn = (body) => {
    Teams.findOne({
        where: { id: body.teamId}
        }).then(team => {
        team.holdtoken += parseInt(body.pushAmount, 10);
        if(team.holdtoken >= team.ideaToken){
            createHold(body, true);
            team.progress = 1;
            sequelize.query(`update teams set exedate=(select now() + interval '${team.days}day') where id=${body.teamId}`)
        }
        team.save();
    })
}
const createPepper = (body) => {
    Pepper.create({
        teamid: body.teamId,
        userid: body.userId,
        token: body.pushAmount
    })
}
const createHold = async(body, execute) => {
    const teamOwnerId = await getOwnerReturnId(body.teamId);
    let record = {
        teamId: body.teamId,
        receiver: teamOwnerId,
    }
    let record2 = null;
    if(execute){
        record2 = { status: 1 }
    }
    else{
        record2 = { status: 0, tokn: body.pushAmount }
    }
    Object.assign(record, record2);
    Holds.create(record);
}
import { Teams, Pepper, Holds, sequelize
} from '../models.js';
import { getPlayerId } from './getPID.js';
import { getOwnerReturnId } from './getOwner.js';

export const timeOut = () => {
    return new Promise(resolve => {
        Teams.findAll({
            where: {type: 1}
        }).then(teams => {
            let iter = teams.length;
            for(iter; iter > 0; --iter){
                if(teams[iter-1].days !== null)
                    subtractDays(teams[iter-1]);
            }
            resolve(true);
        })
    });
}
const subtractDays = (_team) => {
    _team.days -= 1;
    if(_team.days === 0){
        _team.type = 2;
        //sendAlertToOwner(_team.id);
        findWinner(_team.id);
    }
    else{
        console.log(122);
    }
    _team.save();
}
const findWinner = (_teamId) => {
    console.log(100002, _teamId);
    Pepper.findAll({
        where: {teamid: _teamId},
        order: [['token', 'DESC']]
    }).then(winner => {
        sendAlertToWinner(winner[0].userid, _teamId);
    });
}
const sendAlertToWinner = async(_userAddr, _teamId) => {
    const PID = await getPlayerId(_userAddr);
    Holds.create({
        teamId: _teamId,
        receiver: PID,
        status: 1
    })
}
const sendAlertToOwner = async(_teamId) => {
    const PID = await getOwnerReturnId(_teamId);
    Holds.create({
        teamId: _teamId,
        receiver: PID,
        status: 2
    })
}
const setVoteDate = (_user) => {
    _user.days = 3;
    _user.save();
}


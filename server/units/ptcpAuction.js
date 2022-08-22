import { Teams, Holds, Pepper, Players
} from '../models.js';
import { getOwnerReturnId } from './getOwner.js';

export const ptcpInAuction = (body) => {
    return new Promise(resolve => {
        Teams.findOne({
            where: { id: body.teamId}
          }).then(team => {
            team.ideaToken = body.bidtoken;
            if(body.first){
              team.days = 3;
            }
            team.save();
            createPepper(body.teamId, body.userId, body.bidtoken);
            deductTokn(body.userId, body.bidtoken);
            //sendMessageToOwner(body);
            resolve(true);
        })
    });
}
const createPepper = (_teamId, _userAddr, _token) => {
    Pepper.create({
        teamid: _teamId,
        userid: _userAddr,
        token: _token,
        blocked: false
    });
    console.log(20001);
}
const deductTokn = (_account, _bidTokn) => {
    Players.findOne({
        where: { sub: _account }
    }).then(user => {
        user.token -= _bidTokn;
        user.save();
    })
}
const sendMessageToOwner = (body) => {
    getOwnerReturnId(body.teamId).then(teamOwnerId => {
        const record = {
            teamId: body.teamId,
            receiver: teamOwnerId,
            tokn: body.bidtoken,
            status: 0
        }
        Holds.create(record);
        console.log(20002);
    });
}
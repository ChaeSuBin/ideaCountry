import { Teams, Players, Pepper
} from '../models.js';

// return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });

export const AddGood = (body) => {
    return new Promise(resolve => {
        Pepper.findOrCreate({
        where: {userid: body.userId},
        defaults: {
          teamid: body.teamId,
          token: 0
        }
      }).then(([pepper, create]) => {
        if(create){
          findTeamAndPlusGood(body.teamId);
          findOwnerAndPlusTokn(body.owner);
          resolve(0);
        }
        else{
          resolve(1);
        }
      })
    });
}
const findTeamAndPlusGood = (_teamId) => {
    Teams.findOne({
        where: { id: _teamId },
      }).then(team => {
        team.good += 1;
        team.save();
    })
    console.log(20001);
}

const findOwnerAndPlusTokn = (_ownerId) => {
    Players.findOne({
        where: { sub: _ownerId }
      }).then(owner => {
        owner.token += 1;
        owner.save();
    })
    console.log(20002);
}
import { Holds, Reply, Teams
} from '../models.js';
import { getPlayerId } from './getPID.js';

export const typeChange = (body) => {
  let alrimType;
    return new Promise(resolve => {
        Teams.findOne({ 
            where: {id: body.teamId}
        }).then(team => {
            team.type = body.type;
            if(body.type ===3){
              alrimType=1;
              dltOldHold(body.teamId)
            }
            else{
              alrimType=7;
              team.ideaToken=body.price;
            }
            team.save();
            createHold(body.type, team.id, alrimType);
            resolve(true);
        })
    });
}
const createHold = (_type, _teamId, _alrimType) => {
  Reply.findAll({
    where: { 
        location: _teamId,
        accept: true }
  }).then(async(cooper) => {
    let len = cooper.length;
    while(len > 0){
      let record = {
        teamId: _teamId,
        receiver: await getPlayerId(cooper[len-1].account),
        status: _alrimType
      }
      console.log(record);
      Holds.create(record);
      --len;
    }
  })
}
const dltOldHold = (_teamId) => {
  Holds.destroy({
    where: {
      teamId: _teamId,
      status: [2, 4]
    }
  }).then(holds => {
    console.log(19999);
  })
}
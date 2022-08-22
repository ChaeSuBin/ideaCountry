import Sequelize from 'sequelize';
import { Reply, Teams
} from '../models.js';

const Op = Sequelize.Op;

export const findCoopTeams = (_userAddr) => {
    return new Promise(resolve => {
        Reply.findAll({
            where: { 
                account: _userAddr,
                accept: { [Op.ne]: null }
            }
        }).then(async(myCoop) => {
            resolve(await findTeams(myCoop));
        })
    });
}
const findTeams = (_coops) => {
    return new Promise(resolve => {
        let teamIds = [];
        for(let fori=0; _coops.length > fori; ++fori){
            teamIds.push(_coops[fori].location);
        }
        Teams.findAll({
            where: { id: teamIds }
        }).then(teams => {
            resolve(teams);
        })
    })
}
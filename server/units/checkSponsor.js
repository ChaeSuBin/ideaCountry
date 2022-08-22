import { sequelize } from '../models.js';

export const checkSponsor = (_teamId, _userAddr) => {
    return new Promise(resolve => {
        sequelize.query(`select * from peppers where teamid=${_teamId} and userid='${_userAddr}' and token !=0`)
        .then(([pushed, count]) => {
            if(count.rowCount === 1)
            resolve(pushed[0].token);
            else
            resolve(0);
        })
    })
    
}
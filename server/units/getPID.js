import { Players
} from '../models.js';

export const getPlayerId = (_userAddr) => {
    return new Promise(resolve => {
        Players.findOne({
            where: {sub: _userAddr}
          }).then(pid => {
            resolve(pid.id);
        });
    })
}
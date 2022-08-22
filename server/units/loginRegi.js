import { Players
} from '../models.js';

export const loginProc = async(body) => {
    return new Promise(resolve => {
        Players.findOne({
            where: {sub: body.playerid}
        }).then(user => {
            try {
                if(user.pass === body.userpass)
                    resolve(true);
                else
                  resolve(false);
            } catch (error) {
                resolve(false);
            }
        })
    })
}
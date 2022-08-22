import { Holds 
} from '../models.js';
import { getPlayerId } from './getPID.js';

export const sendMessage = async(_from, _to, _desc, _teamId) => {
    const receiverId = await getPlayerId(_to);
    return new Promise((resolve) => {
        const record = {
            teamId: _teamId,
            receiver: receiverId,
            description: _desc,
            status: 5
        }
        Holds.create(record);
        resolve(true);
    });
}
import { Holds, Reply
} from '../models.js';
import filestream from "fs";
import { getPlayerId } from './getPID.js';

export const acceptAdvice = (body) => {
    return new Promise(resolve => {
        Reply.findOne({
            where: {id: body.replId}
        }).then(repl => {
            if(repl.accept){
                resolve(false);
            }
            else{
                acceptCoop(repl, body);
                resolve(true);
            }
        })
    });
}
const acceptCoop = (_repl, body) => {
    if(body.accept){
        _repl.accept = true;
        _repl.save();
        createHold(body.teamId, body.replWriter, 4);
    }
    else{
        try {
            if(body.replFile !== null){
                filestream.unlinkSync(`dcuFileSys/${body.replFile}.pdf`);
                console.log('削除しました。');
            }
            Reply.destroy({ where: {id: body.replId} })
            createHold(body.teamId, body.replWriter, 3);
            } catch (error) {
            throw error;
        }
    }
}
const createHold = async(_teamId, _replWriter, _status) => {
    const adviceWirterId = await getPlayerId(_replWriter);
    let record = {
        teamId: _teamId,
        receiver: adviceWirterId,
        status: _status
    }
    Holds.create(record);
}
import { Holds, Reply
} from '../models.js';
import { getOwnerReturnId } from './getOwner.js';
import { UploadFile } from './fileUploader.js';

export const adviceIdea = (body) => {
    return new Promise(resolve => {
        Reply.create({
            account: body.userAddr,
            description: body.Desc,
            location: body.teamId,
            tokn: body.stake,
            accept: false,
            filename: body.name,
            hash: null,
        }).then(repl => {
            createHold(body);
            fileCheck(body);
            resolve(true);
        })
    });
}
const createHold = async(body) => {
    const teamOwnerId = await getOwnerReturnId(body.teamId);
    let record = {
        teamId: body.teamId,
        receiver: teamOwnerId,
        status: 2
    }
    Holds.create(record);
}
const fileCheck = (body) => {
    if(body.existFile)
        UploadFile(body, false, false);
}
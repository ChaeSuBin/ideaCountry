import { Teams } from '../models.js';
import { UploadFile } from './fileUploader.js';
import filestream from "fs";

export const updateFilez = (body) => {
    return new Promise(async(resolve) => {
        Teams.findOne({ 
            where: {id: body.teamId}
        }).then(team => {
            deleteOldFile(team.file2).then(result=>{
                team.file2 = body.name;
                team.save();
            })
            UploadFile(body, true, false);
            resolve(true);
        })
    });
}
const deleteOldFile = (_oldFileName) => {
    return new Promise(resolve => {
        if(_oldFileName !==null){
            filestream.unlinkSync(`dcuFileSys/${_oldFileName}`);
            console.log('削除しました。');
        }
        resolve(true);
    })
}
import { Teams, Players
} from '../models.js';
import { UploadFile } from "./fileUploader.js";

export const ideaUploader = (body) => {
    return new Promise(resolve => {
        Teams.findOrCreate({
            where: { title: body.name },
            defaults: {
              title: body.name,
              description: body.desc,
              recruit: body.rcrt,
              ideaToken: body.price,
              good: 0,
              type: body.mode,
              jenre: body.genre,
              file: body.file,
            }
          }).then(([team, create]) => {
            if(create){
              setOwner(team, body.useraddr);
              fileUpload(body);
              resolve(true);
            }
            else{
              resolve(false);
            }
        })
    });
}
const setOwner = (_team, _userAddr) => {
    Players.findOne({
        where: { sub: _userAddr },
        }).then(user => {
        user.addTeams(_team, { through: { status: 0}});
        user.token += 30;
        user.save();
      })
    console.log(20001);
}
const fileUpload = (body) => {
  if(body.file){
    UploadFile(body, false, true);
  }
  else
    console.log(20002);
}
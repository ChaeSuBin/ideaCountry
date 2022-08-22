import express from "express";
//import sequelize from "sequelize";
import { sequelize } from "./models.js";
import filestream from "fs";
import https from 'https';
import cors from "cors";
import { 
  Teams, Players, TeamPlayers, Pepper,
  Holds, Reply
} from "./models.js";
import { AddGood } from "./units/addGood.js";
import { addPush } from "./units/addPush.js";
import { typeChange } from "./units/typeChange.js";
import { adviceIdea } from "./units/adviceIdea.js";
import { getOwner } from "./units/getOwner.js";
import { ptcpInAuction } from "./units/ptcpAuction.js";
import { timeOut } from "./units/timeOut.js";
import { getPlayerId } from "./units/getPID.js";
import { ideaUploader } from "./units/ideaUploader.js";
import { loginProc } from "./units/loginRegi.js";
import { readFileBuffer } from "./units/SHA256.js";
import { acceptAdvice } from "./units/acceptAdvice.js";
import { findCoopTeams } from "./units/coopTeam.js";
import { sendMessage } from "./units/sendMessage.js";
import { updateFilez } from "./units/updateFilez.js";
import { coinToPoint, countAllPoint, pointToCoin } from "./units/pointToCoin.js";

const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.json({limit: '30mb'})); // jsonをパースする際のlimitを設定
//app.use(express.urlencoded({limit: '30mb', extended: true}));// urlencodeされたボディをパースする際のlimitを設定

var options = {
  key:  filestream.readFileSync('./certification/key.pem'),
  cert: filestream.readFileSync('./certification/cert.pem')
};
var server = https.createServer(options,app);

// process.env.TZ = 'Asia/Tokyo';
const port = process.env.PORT || 3039;
server.listen(port, () => {
    console.log(`Listening at ${port} port`);
});

app.get("/", function (req, res) {
    res.send("(╯°ㅁ°)╯︵┻━┻");
});

app.get("/teamsview/:mode/:category", async (req, res) => {
  const mode = parseInt(req.params.mode, 10);
  const limit = +req.query.limit || 30;
  const offset = +req.query.offset || 0;
  
  if(req.params.category < 0){
    sequelize.query(`select id, title, description, jenre, type from teams where type=${mode} order by id desc`)
    .then(([ideas, count]) => {
      res.json(ideas);
    })
  }
  else{
    sequelize.query(`select id, title, description, jenre, type from teams where type=${mode} and jenre=${req.params.category}`)
    .then(([ideas, count]) => {
      console.log(ideas.length);
      res.json(ideas);
    })
  }
});
app.get("/teamsearch/:querystr", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const[result, temp] = await sequelize.query(`select id, title, description, jenre, type from teams where type=0 and title like '%${req.params.querystr}%'`);
  res.json(result);
})
app.get("/countallpoint", async (req, res) => {
  const result = await countAllPoint();
  res.json(result);
})
app.get("/myidea/:useraddr", async (req, res) => {
  const pid = await getPlayerId(req.params.useraddr);
  TeamPlayers.findAll({
    where: { 
      playerId: pid,
      status: 0,
    } }).then(myidea => {
    res.json(myidea);
  })
})
app.get("/mycooper/:useraddr", async (req, res) => {
  const teams = await findCoopTeams(req.params.useraddr);
  console.log(teams);
  res.json(teams);
})
app.get("/teamsreply/:teamid", async (req, res) => {
  const[result, temp] = await sequelize.query(`select id, account, description, tokn, accept, filename from replys where location=${req.params.teamid}`);
  console.log('v: ', result);
  res.json(result);
});
app.get("/playerview/:teamid", (req, res) => {
  sequelize.query(`select * from peppers where teamid=${req.params.teamid} and token !=0`)
  .then(([ptcps, count]) => {
    console.log(count.rowCount);
    res.json(ptcps);
  })
});
app.get("/playerinfo/:useraddr", (req, res) => {
  sequelize.query(`select id, nickname, token, coin from players where sub='${req.params.useraddr}'`).then(([userinfo, rowCount]) => {
    res.json(userinfo[0]);
  })
})
app.get("/teamown/:ideaid", async (req, res) => {
  const result = await getOwner(req.params.ideaid);
  res.json(result);
});
app.get("/oneidea/:teamid", (req, res) => {
  Teams.findOne({
    where: { id: req.params.teamid },
  }).then(idea => { res.json(idea); })
});
app.get("/playerid/:playeraddr", async (req, res) => {
  const PID = await getPlayerId(req.params.playeraddr);
  res.json(PID);
});
app.get('/dropalert/:userid', async(req, res) => {
  let result = [];
  const[alerts, count] = await sequelize.query(`select * from holds where receiver=${req.params.userid}`);
  for(let iter = 0; iter < count.rowCount; ++iter){
    result.push(alerts[iter]);
  }
  res.json(result);
})
app.get("/getremaintime/:teamid", async(req, res) => {
  Teams.findOne({
    where: {id: req.params.teamid}
  }).then(team => {
    sequelize.query(`select age(now() - interval '${team.days}day')`)
    .then(([result, count]) => {
      res.json(result[0].age);
    })
  })
})
app.get('/tempt', (req, res) => {
  sequelize.query(`select now() at time zone 'Asia/Tokyo'`).then(result => {
    res.json(result);
  })
});
app.get("/viewdocx/:docxtitle", async(req, res) => {
  filestream.readFile(`dcuFileSys/${req.params.docxtitle}.pdf`, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'application/pdf'})
    res.end(data) // Send the file data to the browser.
  })
});
app.get("/viewcoopfile/:docxtitle", async(req, res) => {
  filestream.readFile(`dcuFileSys/${req.params.docxtitle}`, function(err, data) {
    if (err) throw err // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})
    res.end(data) // Send the file data to the browser.
  })
});
app.put("/filereadfact", (req, res) => {
  const result = readFileBuffer(req.body.docuName);
  Pepper.findOne({
    where: {teamid: req.body.teamId, userid: req.body.userId}
  }).then(winner => {
    if(winner.filehash === null){
      try{
        winner.filehash = result;
        winner.save();
        return res.json(true);
      }catch(error){
        return res.json(false);
      }
    }
    else{
      return res.json(false);
    }
  })
})
app.put("/moditype", async(req, res) => {
  const result = await typeChange(req.body);
  res.json(result);
})
app.put("/acceptcoop", async(req, res) => {
  const result = await acceptAdvice(req.body);
  res.json(result);
})
app.put("/usercheckin", async(req, res) => {
  const result = await loginProc(req.body);
  res.json(result);
})
app.put("/timeout", async(req, res) => {
  const result = await timeOut();
  res.json(result);
});
app.put("/addgood", async(req, res) => {
  const result = await AddGood(req.body);
  res.json(result);
});
app.put("/addpush", async(req, res) => {
  const result = await addPush(req.body);
  res.json(result);
});
app.put("/bididea", async(req, res) => {
  const result = await ptcpInAuction(req.body);
  res.json(result);
})
app.put("/updatecoopdoc", async(req, res) => {
  const result = await updateFilez(req.body);
  res.json(result);
})
app.put("/pointtocoin", async(req, res) => {
  let result;
  if(req.body.PtoC){
    result = await pointToCoin(req.body.account, req.body.point);
  }
  else{
    result = await coinToPoint(req.body.account, req.body.point);
  }
  res.json(result);
})
app.post("/sendmessage", async(req, res) => {
  const result = await sendMessage(
    req.body.from,
    req.body.to,
    req.body.desc,
    req.body.teamId
    );
  res.json(result);
})
app.post("/offeridea", async(req, res) => {
  const result = await adviceIdea(req.body);
  res.json(result);
})
app.post("/regiplayer", async(req, res) => {
  Players.findOrCreate({
    where: {sub: req.body.playerId},
    defaults: {
      sub: req.body.playerId,
      nickname: req.body.userName,
      pass: req.body.userPass,
      token: 0,
      coin: 10.0
    }
  }).then(([newUser, create]) => {
    if(create)
      return res.json(true);
    else
      return res.json(false);
  })
});
app.post("/addreply", async(req, res) => {
  Reply.findOrCreate({
    where: { description: req.body.content },
    defaults: {
      account: req.body.account,
      description: req.body.content,
      location: req.body.location,
    }
  }).then(([reply, create]) => {
    if(create)
      return res.json(true);
    else
      return res.json(false);
  })
});
app.post("/ideacreate", async(req, res) => {
  const result = await ideaUploader(req.body);
  res.json(result);
});
app.delete("/dlthold/:holdId", async(req, res) => {
  await Holds.destroy({
    where: {id: req.params.holdId}
  })
  console.log('o------destroyed')
});
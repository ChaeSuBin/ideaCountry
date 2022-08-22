import { getPlayersId, postUserRegi } from "../api.js";

export const registChecker = async(_useraddr) => {
    const playerId = await getPlayersId(_useraddr);
    try{
      console.log('p: ', playerId);
      return playerId;
    }catch(err){
      return 0;
    }
}

const playerRegister = async(_useraddr) => {
    const record = { addr: _useraddr}
    await postUserRegi(record);
}
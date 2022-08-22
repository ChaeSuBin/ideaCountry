async function request(path, options = {}) {
    //const url = `http://localhost:3039${path}`;
    const url = `https://giparang.asuscomm.com:3039${path}`;
    //const url = `https://ideaideaserver.herokuapp.com${path}`;
    const response = await fetch(url, options);
    return response.json();
}
export async function getHolds(_userId) {
    return request(`/dropalert/${_userId}`);
}
export async function getAllPoints(_userId) {
  return request(`/countallpoint`);
}
export async function getPlayerInfo(_userAddr) {
  return request(`/playerinfo/${_userAddr}`);
}
export async function getTeamsCount() {
    return request(`/teamscount`);
}
export async function getMyCoops(_userAddr) {
  return request(`/mycooper/${_userAddr}`);
}
export async function getMyIdeas(_userAddr) {
  return request(`/myidea/${_userAddr}`);
}
export async function getFileData(_fileName) {
  return request(`/viewdocx/${_fileName}`);
}
export async function getIdeas(_mode, _category) {
    return request(`/teamsview/${_mode}/${_category}`);
}
export async function getIdeaOwner(_ideaId) {
    return request(`/teamown/${_ideaId}`);
}
export async function getPicPlayers(_picId) {
    return request(`/playpiece/${_picId}`);
}
export async function getImgView(_picTitle) {
    return request(`/viewimg/${_picTitle}`);
}
export async function getImgBlob(_picTitle) {
    return request(`/readimg/${_picTitle}`);
}
export async function getDcuDown(_docTitle) {
    console.log(_docTitle);
    return request(`/downloadfile/${_docTitle}`);
}
export async function getIdeaOne(_teamId) {
    return request(`/oneidea/${_teamId}`);
}
export async function getPlayers(_teamId) {
    return request(`/playerview/${_teamId}`);
}
export async function getPlayersId(_playerAddr) {
    return request(`/playerid/${_playerAddr}`);
}
export async function getTeamPlayers(_teamId) {
    return request(`/teamplayers/${_teamId}`);
}
export async function getSearchIdea(_query) {
    return request(`/teamsearch/${_query}`);
}
export async function getRemainTime(_teamId) {
    return request(`/getremaintime/${_teamId}`);
}
export async function getReply(_teamId) {
    return request(`/teamsreply/${_teamId}`);
}
export async function putTimeOut() {
  return request(`/timeout`, {
    headers: {"Content-Type": "application/json"},
    method: "PUT",
  });
}
export async function putChangeCoin(record) {
  return request(`/pointtocoin`, {
    body: JSON.stringify(record),
    headers: {"Content-Type": "application/json"},
    method: "PUT",
  });
}
export async function putAcceptIdea(record) {
  return request(`/acceptcoop`, {
    body: JSON.stringify(record),
    headers: {"Content-Type": "application/json"},
    method: "PUT",
  });
}
export async function putFileReadFact(record) {
  return request(`/filereadfact`, {
    body: JSON.stringify(record),
    headers: {"Content-Type": "application/json"},
    method: "PUT",
  });
}
export async function putAddGood(record) {
    return request(`/addgood`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putAddPush(record) {
    return request(`/addpush`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putLogin(record) {
    return request(`/usercheckin`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putExitBlock(record) {
    return request(`/blockexit`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putPrice(record) {
    console.log('v', JSON.stringify(record));
    return request(`/priceupdate`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putUpdateHold(record) {
    console.log('v', JSON.stringify(record));
    return request(`/alertupdate`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putUpdateTokn(record) {
    return request(`/tokenudt`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putUpdateIdea(record) {
    return request(`/moditype`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putBidIdea(record) {
    console.log('v', JSON.stringify(record));
    return request(`/bididea`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putCoopFile(record) {
    return request(`/updatecoopdoc`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function putNftLimit(record) {
    console.log('v', JSON.stringify(record));
    return request(`/nftlimit`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "PUT",
    });
}
export async function postHold(record) {
    console.log('v', JSON.stringify(record));
    return request(`/requirenego`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
}
export async function postSendMsg(record) {
    return request(`/sendmessage`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
}
export async function postCreateIdea(record) {
    return request(`/ideacreate`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
}
export async function postUserRegi(record) {
    console.log('v', JSON.stringify(record));
    return request(`/regiplayer`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
}
export async function putAdviceIdea(record) {
  return request(`/offeridea`, {
    body: JSON.stringify(record),
    headers: {"Content-Type": "application/json"},
    method: "POST",
  });
}
export async function postTeamReply(record) {
    console.log('v', JSON.stringify(record));
    return request(`/addreply`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
}
export async function dltHold(_holdId) {
    console.log('v', _holdId);
    return request(`/dlthold/${_holdId}`, {
      headers: {"Content-Type": "application/json"},
      method: "DELETE",
    });
}
export async function dltPush(record) {
    return request(`/dltpush`, {
      body: JSON.stringify(record),
      headers: {"Content-Type": "application/json"},
      method: "DELETE",
    });
}
export async function dltTeam(_holdId) {
    console.log('v', _holdId);
    return request(`/dltteam/${_holdId}`, {
      headers: {"Content-Type": "application/json"},
      method: "DELETE",
    });
}
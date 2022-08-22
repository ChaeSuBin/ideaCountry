import React, { useEffect, useState } from "react";
import { putBidIdea, getPlayerInfo } from "../api.js";
import { registChecker } from "./registCatch.js";

export const AuctionInput = ({showFlag, account, onClose, cont, ptcps}) => {

  const [recognize, setRecog] = useState(false);

  const getNow = () => {
    const genzai = Date.now();
    console.log(genzai);
  }
  const recogBtn = () => {
    if(account !== null) setRecog(true);
    else alert('!로그인 후 이용해주세요');
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <div>
          { recognize ? <>
            <p>입찰</p>
            <InputForm useraddr={account} contents={cont} ptcps={ptcps}/>
            <button onClick={onClose}>close</button>
          </>:<>
            <ol>
              <li>경매 낙찰시 해당 아이디어의 저작권을 승계받습니다</li>
              <li>현재호가 또는 시작가보다 많은 포인트를 보유하고 있어야 경매 참여가 가능합니다</li>
              <li>경매 불찰시 입찰한 포인트는 다시 회수됩니다</li>
              <li>경매는 첫 참여자 참여후 3일간 진행됩니다</li>
            </ol>
          <button onClick={recogBtn}>위 사항을 숙지하였습니다.</button>
          </>}
          
        </div>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}

function InputForm({useraddr, contents, ptcps}) {
  const [price , setPrice] = useState(contents.ideaToken);
  const [playerId , setId] = useState();
  const [playerPoint, setPoint] = useState();
  const [call , setCall] = useState();
  const name = contents.title;
  
  useEffect(()=>{
    regiCheck();
  },[]);

  const regiCheck = () => {
    setId(registChecker(useraddr));
    getPlayerInfo(useraddr).then(result => {
      setPoint(result.token);
    })
  }
  
  const sendBtn = () => {
    if(price <= playerPoint){
      if(call > price) ptcpInAuction();
      else alert('입찰할 토큰 수량은 ' + price + '보다 커야합니다.');
    }
    else alert('보유 포인트가 본 경매에 참여하기에 부족합니다');
  }
  
  const ptcpInAuction = () => {
    let firstPtcp = true;
    if(ptcps > 0)
      firstPtcp = false;
    const result = putBidIdea({  //result = false or true
      teamId: contents.id, 
      userId: useraddr,
      bidtoken: call,
      first: firstPtcp
    }).then(success => {
      if(success)
        alert('입찰 되었습니다');
      else
        console.log('err 334');
    })
  }

  return(
    <>
      아이디어 이름: {name} <br/>
      <p style={{margin: 0, fontSize: "18px"}}>현재 호가 또는 시작가: {price} point</p>
      <p style={{margin: 0, fontSize: "18px"}}>경매 참여자 수: {ptcps}</p>
      <br/>내가 소지한 포인트: {playerPoint} point
      <p>입찰할 포인트 :
      <input type='number' min={price} max={999999} step={1} onChange={(evt)=>setCall(evt.target.value)}></input></p>
      <br/>
      <button className="App-exeButton2" onClick={sendBtn}>send</button>
    </>
  )
}
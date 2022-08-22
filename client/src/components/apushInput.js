import React, { useState } from "react";
import { dltPush, putAddPush, putBidIdea } from "../api.js";

export const PushInput = ({showFlag, account, onClose, cont}) => {

  const [recognize, setRecog] = useState(false);
  
  const recogBtn = () => {
    setRecog(true);
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <div>
          { recognize ? <>
            <p>아이디어 후원하기</p>
            <InputForm account={account} contents={cont}/>
            <button onClick={onClose}>close</button>
          </>:<>
            <ol>
              <li>아이디어 후원은 에스크로에 토큰을 이체하는 것으로 이루어집니다.</li>
              <li>후원한 토큰은 아이디어가 '완료'상태가 되기 전까지 언제든지 회수할 수 있습니다.</li>
              <li>아이디어의 '완료'는 후원자들의 투표에 의해 정해집니다.</li>
              <li>아이디어가 '완료'상태가 되면 에스크로에 이체된 토큰은 아이디어 작성자에게 전해집니다. </li>
            </ol>
          <button onClick={recogBtn}>위 사항을 확인하였습니다.</button>
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

function InputForm({account, contents}) {
  const [inpuTokn , setAmount] = useState();
  
  const pushBtn = async() => {
    const record = {
      teamId: contents.id,
      userId: account,
      pushAmount: inpuTokn
    }
    console.log(record);
    await putAddPush(record).then((data) => {
      if(data)
        alert('후원 되었습니다 감사합니다');
      else
        alert('보유 토큰이 부족합니다');
    })
  }

  return(
    <>
      <input name="bid" onChange={(evt) => setAmount(evt.target.value)} placeholder='후원할 토큰갯수'/>
      <button onClick={pushBtn}>후원하기</button>
    </>
  )
}

export const RetreatPush = ({showFlag, account, onClose, cont, recant}) => {

  const dltPushed = () => {
    const record = {
      userId: account,
      teamId: cont.id,
      token: recant
    }
    //console.log(recant);
    dltPush(record).then((result) => {
      if(result)
        alert('철회 되었습니다');
      else
        alert('err00032');
    })
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <div>
          <p>후원을 철회하시겠습니까?<br/>
          리턴되는 포인트: {recant} point</p>
          <button onClick={dltPushed}>네</button>
          <button onClick={onClose}>아니요</button>
        </div>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
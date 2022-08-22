import React, { useEffect, useState } from "react";
import { putVoteResult } from "../api";

export const StatusGuide = ({showFlag, userAddr, onClose, ideaState, teamId}) => {
    const [voteMode , setVote] = useState(false);
  
  useEffect(()=>{
    if(ideaState === 2){
    }
  },[]);

  const evalBtn = (_point) => {
    const record = {
      teamId: teamId,
      userAddr: userAddr,
      eval: _point
    }
    putVoteResult(record).then(result => {
      if(result)
        alert('평가가 반영되었습니다');
      else
        alert('err! not found user account');
    })
  }

  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        {voteMode ? <>
          <p>해당 제안이 잘 완료되었습니까?</p>
          <button style={{width: '-webkit-fill-available'}} onClick={() => evalBtn(9)}>네 잘 완료되었습니다</button>
          <button style={{width: '-webkit-fill-available'}} onClick={() => evalBtn(0)}>아니요 완료되지 못했습니다</button>
        </>:<ol>
          <li>아이디어의 상태는 'open-execute-vote-success(or fail)'로 이루어집니다.</li>
          <li>후원자는 아이디어가 open 상태에서만 후원과 철회를 할 수 있습니다.</li>
          <li>후원 포인트가 목표치에 도달하면 아이디어 상태는 execute로 변경됩니다.<br/>
          (execute 상태는 설정 프로젝트 기간동안 지속됩니다)</li>
          <li>execute 상태 종료 후 vote 상태로 전환됨과 함께 후원자들은 투표를 통해 아이디어 성공여부를 결정합니다.</li>
          <li>성공으로 정해졌을 시 후원된 포인트는 아이디어 제안자에게 돌아가며 실패가 되었을 땐 후원자에게 환급됩니다.</li>
        </ol>}
      
        <button onClick={onClose}>close</button>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
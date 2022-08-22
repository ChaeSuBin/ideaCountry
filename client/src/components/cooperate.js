import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CooperInput, CoopAccept, CoopMessage, CoopDocu } from "./cooperInput";
import { putUpdateIdea, getReply } from "../api";

export const Cooperate = ({content, account, writer}) => {
  const navigate = useNavigate();
  const [definition, setDefinition] = useState();
  const [flag , setFlag] = useState(false);
  const [flag2 , setFlag2] = useState(false);
  const [flag3 , setFlag3] = useState(false);
  const [advices, setAdvices] = useState([]);
  const [repl, setRepl] = useState({filename:'', account:'', id:null});
  const [acceptNum , setAccept] = useState(0);
  const [waiteNum , setWaite] = useState(0);
  
  useEffect(()=>{
    let acceptNum = 0;
    let waiteNum = 0;
    getReply(content.id).then(result => {
      for(let fori=0; fori < result.length; ++fori){
        if(result[fori].accept)
          ++acceptNum;
        else
          ++waiteNum;
      }
      setAccept(acceptNum);
      setWaite(waiteNum);
      setAdvices(result);
    })
  },[]);
  const sendMessage = (_to) => {
    setDefinition(_to);
    setFlag3(true);
  }
  const acceptCoop = (_repl) => {
    if(account === writer){
      setRepl({filename: _repl.filename, account: _repl.account, id:_repl.id});
      setFlag2(true);
    }
    else alert('실행권한 없음');
  }
  const closeRcrt = () => {
    if(account === writer){
      putUpdateIdea({teamId: content.id, type: 3}).then(result => {
        if(result){
          alert('아이디어의 상태가 진행 으로 변경되었습니다');
          navigate(`/ideadetails/${content.id}/3`);
        }
      })
    }
    else alert('실행권한 없음');
  }
  return(
    <>
      {account===writer ? <section className='fixposition'>
      <button onClick={closeRcrt}>아이디어 진행</button>
      </section>:<></>}
      <ul>
        <li style={{margin: 'inherit'}}>협력 요구사항 / 참여상황</li>
        {content.recruit}<br/><br/>
        <p style={{margin: 0}}>참여자 수: {acceptNum}</p>
        <p style={{margin: 0}}>대기자 수: {waiteNum}</p>
        <br/>
        <button className='button02' onClick={()=>setFlag(true)}>이 아이디어에 참여하기</button>
      </ul>
      {advices.map((replys, index) => (
        <li key={index}>
          <p onClick={() => sendMessage(replys.account)} style={{fontSize:'17px', margin:'auto', color:'#577070'}}>{replys.account}님의 제안</p>
          {replys.description}
          <section>
            {replys.accept===false ? <p className='replState' onClick={()=>acceptCoop(replys)}>요구지분: {replys.tokn}%  상태: 수락대기</p>:<p className='replState'>요구지분: {replys.tokn}%  상태: 협력중</p>}
            {replys.filename===null ? <>제안문서 없음</>:<p className='replState' onClick={()=>openInNewTab(replys.filename)}>제안문서 열기</p>}
          </section>
        </li>
      ))}
      <CooperInput 
      showFlag={flag} account={account} 
      cont={content} owner={writer}
      onClose={()=>setFlag(false)}/>
      <CoopMessage
        showFlag={flag3}
        from={account}
        to={definition}
        teamId={content.id}
        onClose={()=>setFlag3(false)} />
      <CoopAccept
        showFlag={flag2}
        teamId={content.id}
        replInfo={repl}
        onClose={()=>setFlag2(false)}/>
    </>
  )
}

export const StartedIdea = ({content, account, writer}) => {
  const [definition, setDefinition] = useState();
  const [flag , setFlag] = useState(false);
  const [flag2 , setFlag2] = useState(false);
  const [advices, setAdvices] = useState([]);

  useEffect(()=>{
    getReply(content.id).then(result => {
      setAdvices(result);
    })
  },[]);
  
  const sendMessage = (_to) => {
    setDefinition(_to);
    setFlag(true);
  }
  return(
    <ul>
      <li style={{margin: 'inherit'}}>협력 요구사항 / 참여상황</li>
      {content.recruit}<br/><br/>
      <button className="button02" onClick={()=>setFlag2(true)}>아이디어 파일 열람/갱신</button>
      <li>
        아이디어 제안자
        <p onClick={() => sendMessage(writer)} style={{fontSize:'17px', margin:'auto', color:'#577070'}}>{writer}</p>
        <br/>
      </li>
      {advices.map((replys, index) => (
        <li key={index}>
          <p onClick={() => sendMessage(replys.account)} style={{fontSize:'17px', margin:'auto', color:'#577070'}}>{replys.account}님의 참여 정보</p>
          {replys.description}
          <section>
            지분: {replys.tokn}%
            {replys.filename===null ? <> 제안문서 없음</>:<p className='replState' onClick={()=>openInNewTab(replys.filename)}> 제안문서 열기</p>}
          </section>
        </li>
      ))}
      <CoopMessage
        showFlag={flag}
        from={account}
        to={definition}
        teamId={content.id}
        onClose={()=>setFlag(false)}
      />
      <CoopDocu
         showFlag={flag2}
         teamId={content.id}
         file2={content.file2}
         onClose={()=>setFlag2(false)}
      />
    </ul>
  )
}

export const AuctionIdeaInfo = ({content, account, writer}) => {
  const [definition, setDefinition] = useState();
  const [flag , setFlag] = useState(false);
  const [flag2 , setFlag2] = useState(false);
  const [advices, setAdvices] = useState([]);

  useEffect(()=>{
    getReply(content.id).then(result => {
      setAdvices(result);
    })
  },[]);
  
  const sendMessage = (_to) => {
    setDefinition(_to);
    setFlag(true);
  }

  return(
    <ul>
      <li style={{margin: 'inherit'}}>아이디어 상세 정보</li>
      <button className="button02" onClick={()=>openInNewTab(content.file2, true)}>아이디어 파일 열람</button>
        <br/><br/>
        아이디어 제안자
        <p onClick={() => sendMessage(writer)} style={{fontSize:'17px', margin:'auto', color:'#577070'}}>{writer} 님</p>
        <br/>
      
      아이디어 참여자<br/>
      <ol>
      {advices.map((replys, index) => (
        <li key={index}>
          <p onClick={() => sendMessage(replys.account)} style={{fontSize:'17px', margin:'auto', color:'#577070'}}>{replys.account}님의 참여 정보</p>
          {replys.description}
          <section>
            지분: {replys.tokn}%
            {replys.filename===null ? <> pr문서 없음</>:<p className='replState' onClick={()=>openInNewTab(replys.filename)}> pr문서 열기</p>}
          </section>
        </li>
      ))}</ol>
      <CoopMessage
        showFlag={flag}
        from={account}
        to={definition}
        teamId={content.id}
        onClose={()=>setFlag(false)}
      />
      <CoopDocu
         showFlag={flag2}
         teamId={content.id}
         file2={content.file2}
         onClose={()=>setFlag2(false)}
      />
    </ul>
  )
}

const openInNewTab = (_title, _bluePrint) => {
  let file;
  if(_bluePrint){
    if(_title!==null){
      file = `https://docs.google.com/viewer?url=https://giparang.asuscomm.com:3039/viewcoopfile/${_title}&embedded=true`;
    }
    else{
      alert('파일이 없습니다');
      return 0
    }
  }
  else{
    file = `https://giparang.asuscomm.com:3039/viewdocx/${_title}`;
  }
  const newWindow = window.open(file, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
}
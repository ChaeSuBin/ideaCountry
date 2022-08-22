import React, { useState } from "react";
import { postSendMsg, putAcceptIdea, putAdviceIdea, putCoopFile } from "../api";

export const CoopAccept = ({showFlag, teamId, replInfo, onClose}) => {
  const acceptBtn = (_accept) => {
    const record = {
      replId: replInfo.id,
      replWriter: replInfo.account,
      replFile: replInfo.filename,
      teamId: teamId,
      accept: _accept,
    }
    //console.log(record);
    putAcceptIdea(record).then(result => {
      if(result){
        if(!alert('반영되었습니다')) window.location.reload();
      }
      else{
        alert('!이미 협력중인 제안은 상태를 변경할 수 없습니다');
      }
    })
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <p>협력요청</p>
        <ul>
          <li>이 제안을 아이디어에 편입합니다.</li>
        </ul>
        <button onClick={() => acceptBtn(true)}>수락</button>
        <button onClick={() => acceptBtn(false)}>거부</button>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
export const CooperInput = ({showFlag, account, onClose, cont, owner}) => {

  const [recognize, setRecog] = useState(false);
  
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
            <p>아이디어 참여하기</p>
            <InputForm useraddr={account} contents={cont} owner={owner}/>
            <button onClick={onClose}>close</button>
          </>:<>
            <ol>
              <li>업로드한 내용은 아이디어 작성자에게만 공개됩니다. </li>
              <li>참여가 거부되면 작성내용은 자동으로 삭제됩니다.</li>
              <li>참여가 수락되면 추후 아이디어가 거래되었을 시 참여 지분만큼 포인트를 얻습니다.</li>
            </ol>
          <button onClick={recogBtn}>위 사항을 이해하였습니다.</button>
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
export const CoopMessage = ({showFlag, teamId, from, to, onClose}) => {

  const [desc, setDesc] = useState('');

  const sendBtn = () => {
    const record = {
      from: from,
      to: to,
      desc: desc,
      teamId: teamId
    }
    console.log(record);
    postSendMsg(record).then(result => {
      if(result){
        if(!alert('전송되었습니다')) window.location.reload();
      }
      else{
        alert('!err229');
      }
    })
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <p>send Message</p>
        <p>to {to}</p>
        <textarea name="desc" rows='5' cols='55' placeholder="보낼 내용 입력" 
            onChange={(evt) => setDesc(evt.target.value)}/><br/>
        <button onClick={sendBtn}>send</button>
        <button onClick={onClose}>close</button>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
export const CoopDocu = ({showFlag, teamId, file2, onClose}) => {
  const file = `https://giparang.asuscomm.com:3039/viewcoopfile/${file2}`;
  const [name, setName] = useState('');
  const [bolb, setBolb] = useState('');
  
  const openInNewTab = () => {
    if(file2!==null){
      const newWindow = window.open(file, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
    else
      alert('아직 파일이 업로드되지 않았습니다');
  }

  const docUpdate = () => {
    const record = {
      teamId: teamId,
      name: name, //fileName
      fbolb: bolb
    }
    putCoopFile(record).then(result => {
      if(result)
        alert('파일이 업로드 되었습니다');
    })
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <p>아이디어 파일 업로드/다운로드</p>
        아이디어 파일을 갱신할 땐 기존 문서의 내용을 지우지 말고<br/>이어쓰기 한 문서를 업로드 하여주십시오.<br/>
        <input type='file' accept=".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onChange={(e)=>onFileInput(e, setName, setBolb)}/>
        <button onClick={openInNewTab}>view</button>
        <button onClick={docUpdate}>update</button>
        <button onClick={onClose}>close</button>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
function InputForm({useraddr, contents, owner}) {
  const [fbolb, setBolb] = useState();
  const [file, setFile] = useState(false);
  const [filename, setName] = useState();
  const [desc, setDesc] = useState('');
  const [stake, setStake] = useState();
  const name = contents.title;
  
  const onFileInput = (e) => {
    const reader = new FileReader();
    const fileByteArray = [];
    
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = (_evt) => {
      if (_evt.target.readyState === FileReader.DONE) {
        const arrayBuffer = _evt.target.result,
        array = new Uint8Array(arrayBuffer);
        for (const a of array) {
          fileByteArray.push(a);
        }
      console.log(fileByteArray);
      setName(e.target.files[0].name)
      setBolb(fileByteArray);
      setFile(true);
      }
    }
  }
  const sendBtn = () => {
    const record = {
      userAddr: useraddr,
      Desc: desc,
      teamId: contents.id,
      name: filename,
      stake: stake,
      fbolb: fbolb,
      existFile: file
    }
    putAdviceIdea(record).then(result => {
      console.log(result);
    })
    if(!alert('제안이 업로드 되었습니다')) window.location.reload();
  }
  return(
    <>
      아이디어 이름: {name} <br/><br/>
      제안설명: <br/>
      <textarea name="docudesc" rows='3' cols='60' onChange={(evt)=>setDesc(evt.target.value)} placeholder="이 아이디어에 어떻게 참여할 수 있는지 기입"/><br/>
      상세설명문서(optional)<br/>
      <input type='file' accept="application/pdf" onChange={onFileInput}/><br/><br/>
      요구지분:
      <input type='number' style={{width:'30px'} } onChange={(evt)=>setStake(evt.target.value)}/>%
      <br/><br/>
      <button className="App-exeButton2" onClick={sendBtn}>send</button>
    </>
  )
}
const onFileInput = (e, setName, setBolb) => {
  const reader = new FileReader();
  const fileByteArray = [];
  
  reader.readAsArrayBuffer(e.target.files[0]);
  reader.onloadend = (_evt) => {
    if (_evt.target.readyState === FileReader.DONE) {
      const arrayBuffer = _evt.target.result,
      array = new Uint8Array(arrayBuffer);
      for (const a of array) {
        fileByteArray.push(a);
      }
    console.log(fileByteArray);
    setName(e.target.files[0].name);
    setBolb(fileByteArray);
    }
  }
}
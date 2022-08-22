import React from "react";
import { useState, useEffect } from "react";
import { getIdeaOne, putFileReadFact } from "../api";

export const ViewFile = ({title, teamid, confidence}) => {
  const [checkFild, setCheck] = useState(false);
  const file = `https://giparang.asuscomm.com:3039/viewdocx/${title}`;
  //const fileG = `https://docs.google.com/viewer?url=https://ideaideaserver.herokuapp.com/viewdocx/${title}&embedded=true`;

  useEffect(()=>{
    if(confidence)
      setFileRead();
    fileinspect();
  },[]);
  
  const setFileRead = () => {
    const record = {
      teamId: teamid,
      userId: sessionStorage.getItem('userid'),
      docuName: title
    }
    putFileReadFact(record).then(result => {
      console.log(result);
    })
  }
  const fileinspect = async() => {
    const fileCheck = await getIdeaOne(teamid);
    setCheck(fileCheck.file);
  }
  
  const openInNewTab = (_title) => {
    if(checkFild){
      const newWindow = window.open(file, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
    else
      alert('file does not exist');
  }
  return (
    <div style={{color:'black'}}>
      { confidence ? <button onClick={() => openInNewTab()} className="button02">아이디어 핵심파일 열람</button>
        : <button onClick={() => openInNewTab()} className="button02">이 아이디어의 상세설명 열기</button>}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { postCreateIdea } from "../api.js";

export const ShareIead = () => {

  const [account, setAccount] = useState(sessionStorage.getItem('userid'));
  const [firstPage, setFirst] = useState(false);
  const [secondPage, setSecond] = useState(false);
  const [thirdPage, setThird] = useState(false);
  const [sixthPage, setSixth] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rcrt, setRcrt] = useState();
  const [fbolb, setBolb] = useState();
  const [file, setFile] = useState(false);
  const [genre, setGenre] = useState('');
  const [genreCode, setCode] = useState();

  useEffect(() => {
    if(account !== null)
        setFirst(true);
  },[]);

  const checked = (evt) => {
    const category = evt.target.value;
    switch(category){
      case '0':
        setGenre('공학/과학');
        setCode(0);
        break;
      case '1':
        setGenre('사회/문화');
        setCode(1);
        break;
      case '2':
        setGenre('음악/미술');
        setCode(2);
        break;
      case '3':
        setGenre('기타분야');
        setCode(3);
        break;
    }
    setSecond(true);
  }

  const FirstSection = () => {
    return(
      <>
        <p className="textprerap">이곳에 아이디어를 업로드하면 참여자들을 모집합니다<br/>
          아이디어 작성자는 참여 희망자들의 참가요청을 검토하여 참가를 수락 또는 거부할 수 있습니다<br/>
          참여자가 모두 모였으면 진행하기 버튼을 눌러 모집을 마감하고 아이디어를 구현하세요<br/>
          아이디어 협력의 결과물은 아이디어 경매에 내놓을 수 있습니다
        </p>
        <p>협력을 원하는 아이디어의 분류가 어디에 속하나요?</p>
        <section>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='0' onChange={checked}></input>
            공학/과학</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='1' onChange={checked}></input>
            사회/문화</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='2' onChange={checked}></input>
            음악/미술</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='3' onChange={checked}></input>
            기타분야</label>
        </section>
      </>
    )
  }
  const uploadBtn = () => {
    if(title === '')
      alert('아이디어 제목이 입력되지 않았습니다');
    else{
      const result = window.confirm('아이디어를 업로드 하시겠습니까?');
      if(result){
        const record = {
          name: title,
          desc: desc,
          rcrt: rcrt,
          useraddr: account,
          mode: 0,
          genre: genreCode,
          file: file,
          fbolb: fbolb
        };
        postCreateIdea(record).then(result => {
          if(result)
            alert('아이디어가 업로드되었습니다.\n30포인트가 지급되었습니다');
          else
            alert('err40022');
        })
      }
    }
  }
  const onFileInputChange = (e) => {
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
        setBolb(fileByteArray);
        setFile(true);
      }
    }
  }

  const FifthSection = () => {
    return(
      <>
        <section className="textprerap">
        <p>아이디어에 대한 자세한 설명파일 업로드<br/>PDF파일만 가능합니다</p>
        <label className="inputfile"><input type='file' accept="application/pdf" style={{display:'none'}} onChange={onFileInputChange}/>파일올리기</label><br/><br/>
        </section>
        <button onClick={() => setThird(true)} style={{alignSelf:'center'}}>next</button>
      </>
    )
  }
  const DoneSection = () => {
      return(
        <section style={{marginLeft:'3em', marginRight:'7em'}} className="App-display">
          <p>입력 내용을 다시한번 확인해주세요</p>
            아이디어 분야: {genre} <br/>
            파일 업로드: {file ? <>Y</>:<>N</>} <br/>
            아이디어 제목: {title} <br/>
            아이디어 설명: <br/>
            <section style={{fontSize:'smaller', color:'darkgray'}}>{desc}</section> <br/>
            요구사항: <br/>
            <section style={{fontSize:'smaller', color:'darkgray'}}>{rcrt}</section>
          <br/><br/>
          <button onClick={uploadBtn} className="App-exeButton2" style={{alignSelf:'center'}}>confirm</button>
        </section>
      )
  }

  return(
      <div className="App">
        <div className="App-header">
        {firstPage ? <>
          {secondPage ? <>
            {thirdPage ? <>
              {sixthPage ? <>
                </>:<DoneSection />}
              </>:<><SecondSection setTitle={setTitle} setDesc={setDesc} setRcrt={setRcrt}/><FifthSection /></>}
            </>:<FirstSection />}
          </> : <> 
            <p>아이디어 공유를 하려면 먼저 로그인해야 합니다.</p>
          </>}
        </div>
      </div>
    )
}

const ThirdSection = ({setDesc, setFourth}) => {
    return(
        <>
          <p>100자 정도의 아이디어 설명을 입력해주세요 <br/>이 설명을 잘 쓸수록 클릭수에 큰 영향을 줍니다.</p>
          <section style={{alignSelf:'center'}}>
          <textarea name="docudesc" rows='5' cols='55' placeholder="100자 이내의 아이디어 요약&#13;이 설명란을 다 채울 시 107자가 쓰여질 수 있습니다..&#13;되도록 줄바꿈없이 기입해주세요" 
            onChange={(evt) => setDesc(evt.target.value)}/><br/>
          <button onClick={() => setFourth(true)}>next</button>
          </section>
        </>
      )
}

const SecondSection = ({setTitle, setDesc, setRcrt}) => {
  return(
    <>
      <section className="textprerap">
      <p>아이디어 제목</p>
      <input id="text2" type="text" onChange={(evt)=> setTitle(evt.target.value)} placeholder="아이디어 제목"></input>
      <br/>
      <p>아이디어 요약</p>
      <textarea name="docudesc" rows='5' cols='55' placeholder="*100자 이내의 아이디어 요약.&#13;가능한 줄바꿈 없이 기입해주세요.&#13;이 공란을 다 채우면 107자가 입력됩니다" 
        onChange={(evt) => setDesc(evt.target.value)}/><br/>
      <p>협력받고자 하는 기술 또는 능력.</p>
      <textarea name="docudesc" rows='5' cols='55' placeholder="*기입 예시입니다.&#13;1. pdf에 기재한 프로토타입의 금형설계가 가능한 기술자.&#13;2. 기재된 알고리즘을 컴퓨터 프로그램으로 구현할 수 있는 기술자가 필요합니다." 
        onChange={(evt) => setRcrt(evt.target.value)}/><br/><br/>
      </section>
    </>
  )
}
import React, { useState, useEffect } from "react";
import { postCreateIdea } from "../api.js";

export const QuesIdea = () => {

  const [account, setAccount] = useState(sessionStorage.getItem('userid'));
  const [firstPage, setFirst] = useState(false);
  const [secondPage, setSecond] = useState(false);
  const [thirdPage, setThird] = useState(false);
  const [fifthPage, setFifth] = useState(false);
  const [sixthPage, setSixth] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
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
      default:
        setGenre('사이트 개선');
        setCode(4);
    }
    setSecond(true);
  }

  const FirstSection = () => {
    return(
      <>
        <p>제안이나 질문분야의 분류가 어디에 속하나요?</p>
        <section>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='0' onChange={checked}></input>
            공학/과학</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='1' onChange={checked}></input>
            사회/문화</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='2' onChange={checked}></input>
            음악/미술</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='3' onChange={checked}></input>
            기타분야</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='4' onChange={checked}></input>
            사이트 개선</label>
        </section>
      </>
    )
  }
  const uploadBtn = () => {
    if(title==='')
      alert('글의 제목이 입력되지 않았습니다')
    else{
      const result = window.confirm('업로드 하시겠습니까?');
      if(result){
        const record = {
          name: title,
          desc: desc,
          useraddr: account,
          mode: 2,
          genre: genreCode,
          file: file,
          fbolb: fbolb
        };
        postCreateIdea(record).then(result => {
          if(result)
            alert('업로드되었습니다\n30포인트가 지급되었습니다');
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
        <p>올리려고 하는 아이디어의 자세한 설명파일이 있다면 함께 올려주세요.<br/>PDF파일만 가능합니다</p>
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
            질문/제안 분야: {genre} <br/>
            파일 업로드: {file ? <>Y</>:<>N</>} <br/>
            질문/제안 제목: {title} <br/>
            설명: <br/>
            <section style={{fontSize:'smaller', color:'darkgray'}}>{desc}</section>
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
              </>:<><SecondSection setTitle={setTitle} setDesc={setDesc} setThird={setThird}/><FifthSection /></>}
            </>:<FirstSection />}
          </> : <> 
            <p>질문/제안을 하려면 먼저 로그인해야 합니다.</p>
          </>}
        </div>
      </div>
    )
}

const SecondSection = ({setTitle, setDesc}) => {
  return(
    <>
      <section className="textprerap">
      <p>아이디어의 제목을 입력해주세요</p>
      <input id="text2" type="text" onChange={(evt)=> setTitle(evt.target.value)} placeholder="제목입력"></input>
      <br/><br/>
      <p>아이디어에 대한 설명을 입력해주세요 <br/>이 설명을 잘 쓸수록 클릭수에 큰 영향을 줍니다.</p>
      <textarea name="docudesc" rows='5' cols='55' placeholder="100자 이내의 설명&#13;이 설명란을 다 채울 시 107자가 쓰여질 수 있습니다..&#13;되도록 줄바꿈없이 기입해주세요" 
        onChange={(evt) => setDesc(evt.target.value)}/><br/>
      <p>태그달기
      <input type="text" onChange={(evt)=> setTitle(evt.target.value)}placeholder="#tag"></input></p>
      </section>
    </>
  )
}
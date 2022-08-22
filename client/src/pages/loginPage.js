import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postUserRegi, putLogin } from "../api";

export const LoginInput = ({wired}) => {
  const navigate = useNavigate();
  const [inputId, setId] = useState();
  const [inputPass, setPass] = useState();
  
  const keyPress = (evt) => {
    if(evt.key === 'Enter') submit();
  }
  const submit = async() => {
    const record = {
      playerid: inputId,
      userpass: inputPass
    };
    const result = await putLogin(record);
    if(result){
      wired(inputId);
      sessionStorage.setItem('userid', inputId);
      navigate("/");
    }
    else{
      alert('아이디와 비밀번호를 확인해주세요');
    }
  }
  return(
    <section className="App-header" style={{alignItems: 'center'}}>
      login <br/>
      <input onChange={(event) => setId(event.target.value)} className='input-login' name="id" placeholder='id'/>
      <input  onKeyPress={keyPress} type='password' onChange={(event) => setPass(event.target.value)} className='input-login' name="pw" placeholder='password'/><br/>
      <button onClick={submit} className="App-exeButton2">login</button>
      <br/><br/>
      <a className="App-link" href="https://ideaideaclient.herokuapp.com/useregist">아이디가 없으신가요?</a>
    </section>
  )
}

export const RegistInput = () => {
  const navigate = useNavigate();
  const [inputId, setId] = useState();
  const [inputPass, setPass] = useState();
  const [inputNic, setNic] = useState();
  
  const doneBtn = () => {
    const record = {
      playerId: inputId,
      userPass: inputPass,
      userName: inputNic
    }
    postUserRegi(record).then(result => {
      if(result){
        alert('계정 생성 완료!');
        navigate('/login');
      }
      else
        alert('err 600');
    })
  }
  return(
    <section className="App-header" style={{alignItems: 'center'}}>
        <input className='input-login' placeholder='id' onChange={(evt)=>setId(evt.target.value)}/><br/>
        <input className='input-login' type='password' placeholder='password' onChange={(evt)=>setPass(evt.target.value)}/><br/>
        <input className='input-login' placeholder='name' onChange={(evt)=>setNic(evt.target.value)}/><br/>
        <button onClick={doneBtn} className="App-exeButton2">submit</button>
    </section>
  )
}
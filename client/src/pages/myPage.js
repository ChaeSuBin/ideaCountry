import '../components/modal.css';
import React from 'react';
import { useState, useEffect } from "react";
import { ListItemsCompnt } from '../components/ItemsCpnt';
import {AlertCardCpnt} from '../components/ItemsCpnt';
import { JoinModal } from '../components/joinCpnt';
import { getHolds, getIdeaOne, getMyIdeas, getPlayersId, getPlayerInfo,
  putTimeOut,
  getMyCoops
} from '../api.js';

export const UserOpt = () => {
  const [viewmode, setMode] = useState(0);
  const [userTokn, setUserTokn] = useState(0);
  const uid = sessionStorage.getItem('userid');

  useEffect(() => {
    getPlayerInfo(uid).then(user => {
      console.log(user.token);
      setUserTokn(user.token);
    })
  },[]);

  const adminTimeout = () => {
    putTimeOut().then(result => {
      console.log(result);
    })
  }
  const autoResponse = () => {
    console.log('wow')
    setInterval(() => {
      getPlayersId(uid).then(result => {
        console.log(result);
      })
    }, 900000);
  }
  
  const SetShowIdea = () => {
    if(viewmode === 0){
      return(
        <>
        <p style={{margin: 15, fontSize: "19px"}}>
          my idea 버튼: 내가 등록한 아이디어를 화면에 표시합니다<br/>
        alert 버튼: 수신된 알림을 화면에 표시합니다.</p></>
      )
    }
    else if(viewmode === 2){
      return(
        <Type_alert
          account = {uid}
        />
      )
    }
    // else if(viewmode === 3){
    // const url = `https://docs.google.com/viewer?url=https://ideaideaserver.herokuapp.com/viewdocx/광장 아이디어 업로드 예시&embedded=true`;
    //   return(
    //     <iframe width="90%" height="900em" src={url} ></iframe>
    //   )
    // }
    else if(viewmode === 4){
      return(
        <Type_mycooper
          account = {uid}
        />
      )
    }
    else{
      return(
        <Type_myidea
          account = {uid}
        />
      )
    }
  }
  const InitPage = () => {
    return(
      <div className='App-header'>
        <p style={{textAlign: 'left', margin:'0px'}}>USER ID-{uid}</p>
        {uid === 'admin' ? <>
          <button onClick={() => adminTimeout()}>temp-322</button>
          <button onClick={() => setMode(3)}>temp-355</button>
          <button onClick={() => autoResponse()}>temp-908</button>
        </> : <></>}
        <button className='button04' style={{width:'300px', height:'100px', alignSelf:'center'}}>보유 포인트: {userTokn}</button>
        <section>
          <button onClick={() =>setMode(1)}>나의제안</button>
          <button onClick={() =>setMode(2)}>알림센터</button>
          <button onClick={() =>setMode(4)}>협력중인 제안</button>
        </section>
        <SetShowIdea />
      </div>
    )
  }
  return(
    <section>
    {uid !== null ? <InitPage />
    : <p>내 정보를 보려면 우선 로그인해야 합니다.</p>}
    </section>
  )
}

class Type_alert extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      alertList: [],
      alertName: null,
      cont: null,
      account: this.props.account
    };
  }
  componentDidMount = () => {
    this.setAlertList();
  }
  setAlertList = () => {
    let copyAlert = [];
    getPlayersId(this.state.account).then((playerId) => {
      getHolds(playerId).then((data) => {
        //console.log(data);
        const length = data.length;
        for(let iter = 0; iter < length; ++iter){
          copyAlert.push(data[iter]);
        }
        this.setState({alertList: copyAlert});
      })
    })
  }
  modalClose = () => {
    this.setState({showModal: false});
    this.setAlertList();
  }
  handleClick = (_searchItems) => {
    console.log('v ', _searchItems);
    this.setState({cont: _searchItems});
    this.setState({showModal: true});
  }

  render(){
    return(
      <>
        <p>알림 {this.state.alertList.length}건.</p>
        {this.state.alertList.map(searchItems => (
          <AlertCardCpnt
            key={searchItems.id}
            title = {searchItems.status}
            description = {'click to check'}
            onClick={() => this.handleClick(searchItems)}
          />
        ))}
        <JoinModal
          showFlag={this.state.showModal}
          content = {this.state.cont}
          account = {this.state.account}
          contract = {this.state.contract}
          onClick={()=>{this.modalClose()}}
        />
      </>
    )
  }
}
const Type_myidea = ({account}) => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    findMyIdeas();
  },[]);

  const findMyIdeas = () => {
    getMyIdeas(account).then(async(ideas) => {
      const result = await setMyIdea(ideas);
      setTimeout(() => {
        setTeams(result);
        console.log(result.length);
      }, 439);
    })
  }
  const setMyIdea = (_ideas) => {
    let tempArray = [];
    return new Promise(resolve => {
      for(let iter = 0; _ideas.length > iter; ++iter){
        getIdeaOne(_ideas[iter].teamId).then(team => {
          tempArray.push(team);
        })
      }
      resolve(tempArray);
    })
  }
  return(
    <div style={{alignSelf:'center'}}>
    {teams.map((searchItems, index) => (
      <ListItemsCompnt
        key={index}
        title = {searchItems.title}
        description = {searchItems.description}
        teamid = {searchItems.id}
        type = {searchItems.type}
        genre = {searchItems.jenre}
      />
    ))}
    </div>
  )
}
const Type_mycooper = ({account}) => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    findMyCoopers();
  },[]);

  const findMyCoopers = () => {
    getMyCoops(account).then(ideas => {
      setTeams(ideas);
    })
  }
  return(
    <div style={{alignSelf:'center'}}>
    {teams.map((searchItems, index) => (
      <ListItemsCompnt
        key={index}
        title = {searchItems.title}
        description = {searchItems.description}
        teamid = {searchItems.id}
        type = {searchItems.type}
        genre = {searchItems.jenre}
      />
    ))}
    </div>
  )
}
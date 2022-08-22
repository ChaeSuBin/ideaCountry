import React from 'react';
import { Link } from "react-router-dom";
import { 
  getIdeaOne, 
  dltHold } from "../api.js";
import './modal.css';

// 子コンポーネント（モーダル）
export class JoinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  modalDown = () => this.props.onClick();

  alertStatus = () => {
    const mode = this.props.content.status;
    console.log(mode);
    if(mode === 0){
      return(
        <Type_zero
          content={this.props.content}
          onClick={this.props.onClick}
        />
      )
    }
    else if(mode === 1){
      return(
        <Type_excute
          content={this.props.content}
          account={this.props.account}
          onClick={this.props.onClick}
        />
      )
    }
    else if(mode === 2){
      return(
        <Type_cooper
          content={this.props.content}
          onClick={this.props.onClick}
        />
      )
    }
    else if(mode === 3){
      return(
        <Type_refuse
          content={this.props.content}
          onClick={this.props.onClick}
        />
      )
    }
    else if(mode === 4){
      return(
        <Type_accept
          content={this.props.content}
          onClick={this.props.onClick}
        />
      )
    }
    else{
      console.log('mode err 478');
    }
  }
  render(){
    return(
      <>
        {this.props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay" className='overlay'>
          <div id="modalcontents" className="modalcontents" onClick={(event)=>{event.stopPropagation()}}>
            <this.alertStatus></this.alertStatus>
          </div>
        </div>
        ) : (
          <></>// showFlagがfalseの場合はModalは表示しない)
        )}
      </>
    );
  }
}

class Type_zero extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: this.props.content,
      account: this.props.account,
    };
  }

  componentDidMount = async() => {
    this.setState({title: await getDocuTitle(this.state.content.team_id)});
  }
  dltIdea = () => {
    dltHold(this.state.content.id);
  }
  modalDown = () => this.props.onClick();

  render(){
    return(
      <>
        <p>・경매 입찰 알림</p>
        <section style={{fontSize: "20px", lineHeight: "10px"}}>
          <p>문서제목: {this.state.title}</p>
          <p>현재호가: {this.props.content.tokn}</p>
        </section>
        <button onClick={this.props.onClick}>close</button>
        <button onClick={() => {
          this.dltIdea();
          this.modalDown();
        }}>알림삭제</button>
        <Link to={'/ideadetails/' + this.state.content.team_id + '/1'} style={{ textDecoration: 'none' }}>
        <button>문서로 이동</button></Link>
      </>
    )
  }
}

class Type_excute extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title : null,
      content: this.props.content,
      account: this.props.account
    };
  }
  componentDidMount = async() => {
    this.setState({title: await getDocuTitle(this.state.content.team_id)});
  }

  excuteIdea = async() => {
    console.log(this.props.content);
    const record = {
      teamid: this.props.content.team_id,
      stake: this.props.content.reqstake,
      userid: this.props.content.user_id,
    };
  }
  dltIdea = async() => {
    await dltHold(this.state.content.id);
  }
  modalDown = () => this.props.onClick();

  render(){
    return(
      <>
        <p>・아이디어 진행됨</p>
        <section style={{fontSize: "18px"}}>
          <p>아이디어 '{this.state.title}' 가 협력자 모집을 완료하여 진행상태로 변경되었습니다.</p>
          <p>아이디어가 성공적으로 완성될 수 있도록 협력을 진행하여 주십시오</p>
        </section>
        <button onClick={() => {
          this.modalDown();
        }}>confirm</button>
        <Link to={'/ideadetails/' + this.state.content.team_id + '/3'} style={{ textDecoration: 'none' }}>
        <button>문서로 이동</button></Link>
      </>
    )
  }
}

class Type_cooper extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: this.props.content,
      account: this.props.account,
    };
  }
  componentDidMount = async() => {
    this.setState({title: await getDocuTitle(this.state.content.team_id)});
  }
  dltIdea = () => {
    dltHold(this.state.content.id);
  }
  modalDown = () => this.props.onClick();

  render(){
    return(
      <>
        <p>・협력 제안 알림</p>
        <section style={{fontSize: "20px", lineHeight: "10px"}}>
          <p>아이디어명: {this.state.title}</p>
          <p>도착한 제안을 확인하려면 확인 버튼을 눌러 해당 아이디어로 이동하세요</p>
        </section>
        <button onClick={() => {
          this.dltIdea();
          this.modalDown();
        }}>알림삭제</button>
        <Link to={'/ideadetails/' + this.state.content.team_id + '/0'} style={{ textDecoration: 'none' }}>
        <button>확인</button></Link>
      </>
    )
  }
}
class Type_refuse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: this.props.content,
      account: this.props.account,
    };
  }

  componentDidMount = async() => {
    this.setState({title: await getDocuTitle(this.state.content.team_id)});
  }
  dltIdea = () => dltHold(this.state.content.id);
  modalDown = () => this.props.onClick();

  render(){
    return(
      <>
        <p>・제안 거절됨</p>
        <section style={{fontSize: "20px"}}>
          <p>'{this.state.title}'에 제안한 내용의 협력이 거절되었습니다.</p>
          <p>(제안 내용은 자동으로 삭제되었습니다)</p>
        </section>
        <button onClick={() => {
          this.dltIdea();
          this.modalDown();
        }}>알림삭제</button>
        <Link to={'/ideadetails/' + this.state.content.team_id + '/0'} style={{ textDecoration: 'none' }}>
        <button>문서로 이동</button></Link>
      </>
    )
  }
}
class Type_accept extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: this.props.content,
      account: this.props.account,
    };
  }

  componentDidMount = async() => {
    this.setState({title: await getDocuTitle(this.state.content.team_id)});
  }
  modalDown = () => this.props.onClick();

  render(){
    return(
      <>
        <p>・제안 수락됨</p>
        <section style={{fontSize: "20px"}}>
          <p>'{this.state.title}'에 제안한 내용의 협력이 수락되었습니다.</p>
          <p>이 아이디어의 협력자가 모두 모인 후 제안자가 아이디어를 '진행'상태로 변경할 때까지 기다려주십시오.<br/>
            (아이디어 상태가 변경되면 알림을 통해 알려드리며 동시에 이 알림은 자동으로 삭제됩니다.)</p>
        </section>
        <button onClick={this.props.onClick}>close</button>
        <Link to={'/ideadetails/' + this.state.content.team_id + '/0'} style={{ textDecoration: 'none' }}>
        <button>문서로 이동</button></Link>
      </>
    )
  }
}
const getDocuTitle = async(_teamId) => {
  const data = await getIdeaOne(_teamId);
  return data.title;
}
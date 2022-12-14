import React, { useEffect, useState } from 'react';
import { withRouter } from '../components/withRouteCpnt.js';
import { ViewFile } from '../components/fileViewer.js';
import { AuctionInput } from '../components/auctionInput.js';
import { AuctionIdeaInfo, Cooperate, StartedIdea } from '../components/cooperate.js';
import { 
    getIdeaOwner, getPlayers, putAddGood,
    getIdeaOne, getRemainTime, postTeamReply, getReply } from '../api';

class IdeaDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      slide: true,
      remain: null,
      uid: sessionStorage.getItem('userid'),
      owner: null,
      showFlag: false,
      ptcpsNum: 0,
      contents: null,
      
    };
  }
  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }
  componentDidMount = () => {
  //console.log(this.props.router);
  this.getContents();
    
    setTimeout(() => {
      this.setState({slide: false});
    }, 1300);
  }
  getContents = () => {
    const teamId = parseInt(this.props.router.params.teamid, 10);
    getIdeaOne(teamId).then(content => {
      this.setState({contents: content});
      this.getPlayer(content.id);
    })
  }
  getPlayer = (_ideaid) => {
    getIdeaOwner(_ideaid).then((data) => {
      this.setState({owner: data});
    });
    getPlayers(_ideaid).then((data => {
      this.setState({ptcpsNum: data.length});
    }));
  }

  viewBranch = () => {
    const ideaType = parseInt(this.props.router.params.type, 10);
    if(ideaType == 0){
      return(
        <div className='textprerap' style={{marginBottom:'30px'}}>
          <Cooperate 
            content={this.state.contents}
            account={this.state.uid}
            writer={this.state.owner}
          />
        </div>
      )
    }
    else if(ideaType == 1){
      return(
        <div className='textprerap'>
          <InfoBlock
            contents={this.state.contents}
            account={this.state.uid}
            ptcpNum={this.state.ptcpsNum}
            openAuctionIntput={()=>this.setState({showFlag: true})}
          />
          <AuctionInput 
            showFlag={this.state.showFlag} account={this.state.uid} 
            cont={this.state.contents} ptcps={this.state.ptcpsNum}
            onClose={()=>{this.modalClose()}}/>
          <AuctionIdeaInfo
          content={this.state.contents}
          account={this.state.uid}
          writer={this.state.owner}
          />
        </div>
      )
    }
    else if(ideaType ==2){
      return(
        <div className='textprerap'>
          <GoodAndPush
            content={this.state.contents}
            account={this.state.uid}
            writer={this.state.owner}
          />
          <InputReply
            account={this.state.uid}
            teamId={this.props.router.params.teamid}
          />
        </div>
      )
    }
    else if(ideaType==3){
      return(
      <div className='textprerap' style={{marginBottom:'30px'}}>
        <StartedIdea
          content={this.state.contents}
          account={this.state.uid}
          writer={this.state.owner}
        />
      </div>
      )
    }
    
  }
  modalClose = () => {
    this.setState({showFlag: false});
    document.removeEventListener('click',this.modalClose);
  }
  // modalOpen = () => {
  //   this.setState({showFlag: true});
  // }

  render(){
    return(
      <div><p style={{textAlign: 'left', margin:'0px'}}>{this.state.uid}</p>
      <section className="App-header">
        {this.state.slide ? <p>????????? ???????????? ?????? ????????? /Threads <br/>?????? ?????? ???...</p>
        :<>
          <ul className='textprerap'>
            <li>??????</li>
            <p>{this.state.contents.title}</p>
            <li>???????????? ??????</li><p style={{width:'650px'}}>{this.state.contents.description}</p>
            <ViewFile
              title={this.state.contents.title}
              teamid={this.state.contents.id}
              confidence={false}
            />
          </ul>
          <this.viewBranch></this.viewBranch>
        </>
        }
      </section></div>
    )
  }
}
class GoodAndPush extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showFlag: false,
      content: this.props.content,
      writer: this.props.writer,
      account: this.props.account,
    };
  }
  goodBtn = async() => {
    const record = {
      owner: this.state.writer,
      teamId: this.state.content.id,
      userId: this.state.account,
    }
    await putAddGood(record).then((data) => {
      if(data)
        alert('?????? ???????????? ??????????????????');
      else
        alert('????????? ?????????????????????');
    });
  }
  render(){
    return(<section className='fixposition'>
      <p style={{color: 'black', marginLeft: '1em', marginBottom: '0px'}}>?????????: {this.state.content.good}</p>
      <button onClick={this.goodBtn}><span role="img" aria-label="good">????</span>?????????</button>
    </section>)
  }
}
class InputReply extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      replyWirter: [],
      replyContent: [],
      content: null,
      teamId: this.props.teamId,
      account: this.props.account,
    };
  }
  componentDidMount = async() => {
    const reply = await getReply(this.state.teamId);
    let len = reply.length;
    let content = [];
    let writer = [];
    
    while(len){
      content.push(reply[len-1].description);
      writer.push(reply[len-1].account);
      len-=1;
    }
    //console.log(content);
    this.setState({replyContent: content});
    this.setState({replyWirter: writer});
  }
  upReButton = () => {
    if(this.state.account !== null){
      const record = {
        content: this.state.content,
        location: this.state.teamId,
        account: this.state.account,
      }
      postTeamReply(record).then(result => {
        if(result){
          let copyReplys = [...this.state.replyContent];
          let copyReplyWriters = [...this.state.replyWirter];
          copyReplys.push(this.state.content);
          copyReplyWriters.push(this.state.account);
          this.setState({replyContent: copyReplys});
          this.setState({replyWirter: copyReplyWriters});
        }
        else
          alert('err 83201');
      })
    }
    else
      alert('????????? ??? ??????????????????');
  }
  onReplChange = (evt) => {
    this.setState({content: evt.target.value});
  }
  render(){
    return(<>
      <p>?????? ??????.</p>
      <ul>
        {this.state.replyContent.map((replys, index) => (
          <li key={index} style={{margin:'24px'}}>
            <p style={{fontSize:'17px', margin:'auto', color:'#999'}}>{this.state.replyWirter[index]}?????? ??????</p>
            {this.state.replyContent[index]}
          </li>
        ))}
      </ul>
      <textarea name="docudesc" rows='3' cols='60' placeholder="?????? ??????" onChange={this.onReplChange}/>
      <button onClick={this.upReButton}>????????????</button>
    </>)
  }
}

class InfoBlock extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      remainTime: {days: 0, hours: 0, minutes: 0, seconds: 0},
      showFlag: false,
      ideaStatus: null,
      ptcpsNum: this.props.ptcpNum,
      contents: this.props.contents
    };
  }
  
  componentWillUnmount = () => {
    clearInterval(this.timer);
  }
  componentDidMount = () => {
    if(this.state.contents.days!==null){
      this.timer = setInterval(() => {
        getRemainTime(this.state.contents.id).then(result => {
          this.setState({remainTime: result});
        })
      }, 1000);
    }
  }
  
  render(){
    return(<>
      <ul>
        <li style={{margin: 'inherit'}}>???????????? ????????????</li>
        <p style={{margin: 0}}>?????? ????????? ???: {this.state.ptcpsNum}</p>
        <p style={{margin: 0}}>?????? ?????? ?????? ?????????: {this.state.contents.ideaToken} points</p>
        {this.state.ptcpsNum>0 ? <p style={{margin: 0}}> ?????? ?????? ??????: {this.state.remainTime.days}??? {this.state.remainTime.hours}?????? {this.state.remainTime.minutes}??? {this.state.remainTime.seconds}???</p>:<></>}
        <button onClick={this.props.openAuctionIntput} className="button02">??? ??????????????? ????????? ????????????</button>
      </ul>
    </>)
  }
}

export default withRouter(IdeaDetails);
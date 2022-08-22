import logo from '../logo.svg';
import '../App.css';
import '../components/animate.css';
import React from "react";
import { Link } from 'react-router-dom';
import { getAllPoints } from '../api';

export class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      aniSelector: 0,
      mintedPoint: 0,
      mintedCoin: 0,
    };
    //this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = () => {
    if(this.state.uid !== null){
      this.setState({logined: true});
    }
    getAllPoints().then(point => {
      this.setState({mintedPoint: point.mintedAllPoint});
      this.setState({mintedCoin: point.mintedAllCoin});
    })
  }
  koujicyuu = () => {
    alert('공사중');
  }

  storageClear = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  animationA = () => {
    if(this.state.aniSelector === 0){
    }
    else if(this.state.aniSelector===1){
      return(
        <>
          <p style={{fontSize:'x-large'}}>광장: 사람들과 새로운 제안이나 질문에 대한 의견을 묻고 답할 수 있습니다.</p>
          <span className="scrollDown" style={{alignSelf: 'center'}}></span>
          <span className="circle"></span>
          <div className='hori'>
          <span className="scrollDown" style={{transform:'rotate(225deg)', margin:'0px 65px 0px 65px'}}></span>
          <span className="scrollDown" style={{transform:'rotate(135deg)', margin:'0px 65px 0px 65px'}}></span>
          </div>
        </>
      )
    }
    else if(this.state.aniSelector===2){
      return(
        <>
          <p style={{fontSize:'x-large'}}>시장: 가장 높은 호가를 제시한자가 아이디어의 소유권을 획득합니다.</p>
          <span className="disappearLine" style={{alignSelf: 'center'}}></span>
          <span className="flikerCircle"></span>
          <div className='hori'>
          <span className="disappearLine" style={{transform:'rotate(225deg)', margin:'0px 65px 0px 65px'}}></span>
          <span className="fliker" style={{transform:'rotate(135deg)', margin:'0px 65px 0px 65px'}}></span>
          </div>
        </>
      )
    }
    else{
      return(
        <>
          <p style={{fontSize:'x-large'}}>협력: 타인과 협력하여 아이디어의 파이를 키워나갈 수 있습니다.</p>
          <span className="chizimuLine" style={{alignSelf: 'center'}}></span>
          <span className="inflateCircle"></span>
          <div className='hori'>
          <span className="chizimuLine" style={{transform:'rotate(225deg)', margin:'0px 65px 0px 65px'}}></span>
          <span className="chizimuLine" style={{transform:'rotate(135deg)', margin:'0px 65px 0px 65px'}}></span>
          </div>
        </>
      )
    }
  }

  render(){
    return(
      <div className="App">
        <section className="App-header">
          {this.state.mintedPoint>0? <>
            <Link to="/vender" style={{ alignSelf:"center", textDecoration: 'none' }}>
          <button className='button04' onMouseOver={() => this.setState({aniSelector: 0})} style={{ width:"400px", height:'100px', textAlignLast:'left'}}>
            웹이 보유한 이더: {100-this.state.mintedCoin} eth <br/>웹이 보유한 포인트: {1000000000-this.state.mintedPoint}p</button>
          </Link>
          <section style={{fontSize: '17px', marginBottom: '70px'}}>
            <p style={{fontSize:'large'}}>모은 포인트를 이더로 교환할 수 있습니다.<br/>현재 100P 당 교환가능한 이더량: {((100-this.state.mintedCoin)/this.state.mintedPoint)/100} ETH</p>
          </section>
          <nav className='hori'>
            {/* <button className='space'></button> */}
            <Link to="/search/square" style={{ textDecoration: 'none' }}>
              <button className='button04' onMouseOver={() => this.setState({aniSelector: 1})}>광장</button>
            </Link>
            <Link to="/search/market" style={{ textDecoration: 'none' }}>
              <button className='button04'onMouseOver={() => this.setState({aniSelector: 2})}>시장</button>
            </Link>
            <Link to="/search/idea" style={{ textDecoration: 'none' }}>
              <button className='button04' onMouseOver={() => this.setState({aniSelector: 3})}>협력</button>
            </Link>
          </nav>
          <this.animationA />
          </>:<>불러오는 중... 잠시만 기다려 주십시오</>}
      </section>
    </div>
    )
  }
}
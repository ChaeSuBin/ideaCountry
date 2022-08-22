import '../App.css';
import '../components/modal.css';
import React, { useEffect,useCallback,useState } from "react";
import { Link } from 'react-router-dom';

export const Nav = ({userId}) => {
  const[uid, setUID] = useState(false);
  const[logined, setLogined] = useState(false);
  
  useEffect(()=>{
    if(userId !== null)
      setLogined(true);
    else if(sessionStorage.getItem('userid') !== null)
      setLogined(true);
  },[userId])

  const storageClear = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <nav>
      {/* <p style={{textAlign: 'right', margin:'0px'}}>}</p> */}
      <Link to="/"><button>home</button></Link>
      <Link to="/myinfo" style={{ textDecoration: 'none' }}>
        <button>마이페이지</button>
      </Link>
      {logined ? <button onClick={storageClear}>로그아웃</button>
        :<Link to="/login" style={{ textDecoration: 'none' }}>
          <button>로그인</button>
        </Link>
      }
    </nav>
  );
}


function Modal(props){
  return(
    <div id="modal" className="modal" onClick={(event)=>{event.stopPropagation()}}>
      <section>
        <Link to={'/create'}><button>Idea</button></Link>
      </section>
      <button onClick={props.onClick}>close</button>
    </div>
  )
}

function Serch(props){
  return(
    <div id="modal" className="modal" onClick={(event)=>{event.stopPropagation()}}>
      <section>
        <p><li>select search type</li></p>
        <Link to={'/search/' + 'nft'}><button>NFT</button></Link>
        <Link to={'/search/' + 'idea'}><button>Idea</button></Link>
      </section>
    </div>
  )
}
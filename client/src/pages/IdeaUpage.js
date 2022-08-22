import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ListItemsCompnt } from '../components/ItemsCpnt';
import { getMyIdeas, getIdeaOne, postCreateIdea, putUpdateIdea } from "../api.js";

export const MarketIead = () => {
  const navigate = useNavigate();
  const account = useState(sessionStorage.getItem('userid'));
  const [firstPage, setFirst] = useState(false);
  const [secondPage, setSecond] = useState(false);
  const [thirdPage, setThird] = useState(false);
  
  const [ideaInstance, setInstance] = useState({title:'', teamId:null});
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState('');
  const [price, setCall] = useState(null);

  useEffect(() => {
    if(account[0] !== null)
      setFirst(true);
    if(secondPage)
      uploadIdea();
  },[secondPage]);
  
  const uploadIdea = () => {
    const record = {
      teamId: ideaInstance.teamId,
      type: 1,
      price: price
    }
    putUpdateIdea(record).then(result => {
      if(result){
        if(!alert('아이디어가 업로드되었습니다.'))
          navigate("/search/market");
      }
      else
        alert('err40022');
    })
  }

  return(
    <div className="App">
      <div className="App-header">
        {firstPage ? <>
          {ideaInstance.teamId!==null ? <>
            {secondPage ? <>
              </>:<SecondSection ideaIns={ideaInstance} setSecond={setSecond} setPrice={(e)=>setCall(e)}></SecondSection>}
            </>:<FirstSection account={account[0]} setIdea={(e)=>setInstance(e)}/>}
          </> : <p>아이디어를 업로드 하려면 먼저 로그인해야 합니다.</p>
        }
      </div>
    </div>
  )
}
const FirstSection = ({account, setIdea}) => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    findMyIdeas();
  },[]);

  const findMyIdeas = () => {
    getMyIdeas(account).then(async(ideas) => {
      const result = await setMyIdea(ideas);
      setTimeout(() => {
        setTeams(result);
        //console.log(result.length);
      }, 439);
    })
  }
  const setMyIdea = (_ideas) => {
    let tempArray = [];
    return new Promise(resolve => {
      for(let iter = 0; _ideas.length > iter; ++iter){
        getIdeaOne(_ideas[iter].teamId).then(team => {
          if(team.type===3) tempArray.push(team);
        })
      }
      resolve(tempArray);
    })
  }
  
  return(
    <div style={{alignSelf:'center'}}>
      <p>아래 리스트의 아이디어들중 판매할 아이디어를 선택해주십시오<br/>(진행중인 아이디어만 표시됩니다)</p>
      {teams.map((searchItems, index) => (
        <ListItemsCompnt
          key={index}
          title = {searchItems.title}
          description = {searchItems.description}
          teamid = {searchItems.id}
          type = {searchItems.type}
          genre = {searchItems.jenre}
          display={true}
          choice = {(e)=>setIdea(e)}
        />
      ))}
    </div>
  )
}
const SecondSection = ({ideaIns, setPrice, setSecond}) => {
  return(
    <section>
      <p>경매에 올릴 아이디어 :{ideaIns.title}</p>
      <p>선택한 아이디어의 경매 시작가를 입력 후 완료 버튼을 눌러주십시오</p><br/>
      <input type='number' min={0} max={999999} step={1} onChange={(evt)=>setPrice(evt.target.value)}></input><br/><br/>
      <button onClick={()=>setSecond(true)}>완료</button>
    </section>
  )
}
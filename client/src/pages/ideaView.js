import logo from '../logo.svg';
import '../components/modal.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { getIdeas, getSearchIdea } from '../api.js';
import {ListItemsCompnt} from '../components/ItemsCpnt';

export const ViewItems = () => {
  const locate = useParams();
  const [showModal, setModal] = useState(false);
  const [itemList, setList] = useState([]);
  
  useEffect(() => {
    getAllIdeas(-1);
  },[]);
  
  const paramWire = (_param) => {
    getAllIdeas(_param);
  }
  const getAllIdeas = async(_category) => {
    let type = locate.mode;
    if(type === 'idea')
      type = 0;
    else if(type === 'market')
      type = 1;
    else
      type = 2;
    setList(await getIdeas(type, _category));
  }
  const searchButton = async(_searchString) => {
    setList(await getSearchIdea(_searchString));
  }
  const SelectBranch = () => {
    return(<>
      <SearchBarCpnt
        onClick={(inputstring) => searchButton(inputstring)}
      />
      <ClicktoSale />
    </>
    )
  }
  const CreateButton = () => {
    if(locate.mode === 'idea'){
      return(
        <Link to="/create" style={{ textDecoration: 'none' }}><button style={{width: '200px', height: 'auto', backgroundColor: '#3e5ab1', fontSize: 'inherit'}}>아이디어 업로드</button></Link>
      )
    }
    else if(locate.mode==='market'){
      return(
        <Link to="/createmarket" style={{ textDecoration: 'none' }}><button style={{width: '200px', height: 'auto', backgroundColor: '#3e5ab1', fontSize: 'inherit'}}>경매 올리기</button></Link>
      )
    }
    else{
      return(
        <Link to="/createques" style={{ textDecoration: 'none' }}><button style={{width: '200px', height: 'auto', backgroundColor: '#3e5ab1', fontSize: 'inherit'}}>제안/질문 올리기</button></Link>
      )
    }
  }
  const ClicktoSale = () => {
    return(
      <>
        <section>
        <button onClick={() => setModal(true)} style={{width: '200px', height: 'auto', fontSize: 'inherit'}}>카테고리별 검색</button>
        <CreateButton />
        </section>
        
        { itemList.length ? <section style={{marginLeft:'139px'}}>
          <p style={{color: '#a5a5a5', textAlign: 'left', margin: 20, fontSize: "15px"}}>총 {itemList.length}건 <br/>
          아이디어의 세부 정보를 확인하려면 해당 아이디어를 클릭하세요</p>
          {itemList.map(searchItems => (
            <ListItemsCompnt
              key={searchItems.title}
              title = {searchItems.title}
              description = {searchItems.description}
              teamid = {searchItems.id}
              type = {searchItems.type}
              genre = {searchItems.jenre}
            />
          ))}
          </section> : <p style={{margin: 5, fontSize: "15px"}}>검색 결과가 없습니다.</p>
        }
        <CategoryModal
          showFlag={showModal} onClose={()=>setModal(false)} paramWire={(params)=>{paramWire(params)}}
        />
      </>
    )
  }
  return(
    <section className="App-header">
      <SelectBranch />
    </section>
  )
}

const SearchBarCpnt = ({onClick}) => {
  const [searchStr, setSerchStr] = useState();
  return(
    <>
      <div className="search_bar" style={{alignSelf:'center'}}>
          <i className="fas fa-search search_icon"></i>
          <input id="text2" type="text" onChange={(evt) => setSerchStr(evt.target.value)} placeholder="키워드 입력"></input>
          <button className="fas fa-times search_icon" onClick={() => onClick(searchStr)}>s</button>
      </div>
    </>
  )
}
export const CategoryModal = ({showFlag, onClose, paramWire}) => {
  const checked = (evt) => {
    const category = evt.target.value;
    switch(category){
      case '0':
        paramWire(0);
        onClose();
        break;
      case '1':
        paramWire(1);
        onClose();
        break;
      case '2':
        paramWire(2);
        onClose();
        break;
      case '3':
        paramWire(3);
        onClose();
        break;
      case '-1':
        paramWire(-1);
        onClose();
        break;
    }
  }
  return(
    <>{showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <div>
          <p>분류</p>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='-1' onChange={checked}></input>
          전체보기</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='0' onChange={checked}></input>
          공학/과학</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='1' onChange={checked}></input>
          사회/문화</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='2' onChange={checked}></input>
          음악/미술</label>
          <label style={{cursor: 'pointer'}}><input type="checkbox" value='3' onChange={checked}></input>
          기타분야</label>
        </div>
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
    </>
  )
}
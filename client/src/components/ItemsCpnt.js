import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getImgBlob } from '../api';
import './card.css';

export class ListItemsCompnt extends Component {
  state = {
    imagePreviewUrl: null,
    genre: null
  }

  componentDidMount = async() => {
    this.setGenre(this.props.genre);
  }

  setGenre = (_genre) => {
    switch(_genre){
      case 0:
        this.setState({genre: '공학/과학'});
        break;
      case 1:
        this.setState({genre: '사회/문화'});
        break;
      case 2:
        this.setState({genre: '음악/미술'});
        break;
      case 3:
        this.setState({genre: '기타'});
        break;
    }
  }

  render() {
    const {
      title,
      teamid,
      description,
      type,
    } = this.props;

    return (
      <><div className="ToDoListItem">
        <Link to={'/ideadetails/' + teamid + '/' + type} style={{ textDecoration: 'none' }}>
        <div className="ToDoListItem-title">[{this.state.genre}]{title}</div></Link>
        { this.state.imagePreviewUrl===null ? <></>
            : <div><img src={this.state.imagePreviewUrl} /></div>
        }
        <div className="ToDoListItem-description">{description}</div>
      </div>
      {this.props.display ? <button onClick={()=>this.props.choice({title:title, teamId:teamid})} style={{width:'500px', height:'22px', margin:'0'}}>⬆위 아이디어를 경매장에 등록⬆</button>:<></>}
      </>
    );
  }
};
export class AlertCardCpnt extends Component {

  render() {
    const {
      title,
      description,
      ...props
    } = this.props;

    return (
      <div className="AlertListItem"{...props}>
        <div className="AlertListItem-title">{title}</div>
        <div className="AlertListItem-description">{description}</div>
      </div>
    );
  }
};
import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/rootPage";
import { Nav } from "./components/naviCpnt";
import { ViewItems } from "./pages/ideaView";
import IdeaDetails from "./pages/ideaPage";
import { LoginInput } from "./pages/loginPage";
import { RegistInput } from './pages/loginPage';
import { MarketIead } from './pages/IdeaUpage';
import { ShareIead } from "./pages/IdeaShare";
import { QuesIdea } from "./pages/ideaUpQues";
import { UserOpt } from "./pages/myPage";
import { Vender } from './pages/vender';

class App extends Component {
  state = {
    linkparam: null,
    linkparamfromRoot: null,
    userId: null,
  };

  wireFromRoot = (_linkParam) => {
    this.setState({linkparam: _linkParam});
    console.log(_linkParam);
  }
  wireFromLogin = (_linkParam) => {
    this.setState({userId: _linkParam});
    console.log(_linkParam);
  }

  render(){
    return (
      <div className="App">
        <header>
          <Router>
            <Nav userId={this.state.userId}></Nav>
            <section className="">
              <Routes>
                <Route exact path='/' element={<Home 
                  user={this.state.userId}/>}/>
                <Route exact path='/useregist' element={<RegistInput/>}/>
                <Route exact path='/login' element={<LoginInput wired={(params) => this.wireFromLogin(params)}/>}/>
                <Route exact path='/create' element={<ShareIead />}/>
                <Route exact path='/createques' element={<QuesIdea />}/>
                <Route exact path='/createmarket' element={<MarketIead />}/>
                <Route exact path='/search/:mode' element={<ViewItems />}/>
                <Route exact path='/ideadetails/:teamid/:type' element={<IdeaDetails />}/>
                <Route exact path='/myinfo' element={<UserOpt />}/>
                <Route exact path='/vender' element={<Vender />}/>
              </Routes>
            </section>
            {/* <Footer /> */}
          </Router>
        </header>
      </div>
    );
  }
}
  
export default App;

function Footer() {
  return (
    <footer className="footer ">
      <div className="content">
        <p className="has-text-centered">
          this program is PROTO of main stream。
        </p>
      </div>
    </footer>
  );
}
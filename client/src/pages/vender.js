import React from "react";
import { useState, useEffect } from "react";
import getWeb3 from '../getWeb3';
import EthReceiveContract from '../contracts/ReceiveEther.json';
import { getAllPoints, getPlayerInfo, putChangeCoin } from "../api";

export const Vender = () => {
  const uid=sessionStorage.getItem('userid');
  const [ethBal, setEthBal] = useState(0);
  const [contract_wallet ,setWallet] = useState(null);
  const [metaMaskFlag, setMetaMaskFlag] = useState(false);
  const [account, setAccount] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
  const [web3, setWeb3] = useState(null);

  const [mintedPoint, setPoint] = useState(null);
  const [mintedCoin, setCoin] = useState(null);
  const [userPoint, setUserPoint] = useState(0);
  const [userCoin, setUserCoin] = useState(0);
  const [changePoint, setCall] = useState(0);
  const [reqPoint, setReqPoint] = useState(0);

  useEffect(() => {
    connectWeb3();
	  const tmpFlag = window.ethereum && window.ethereum.isMetaMask;
	  setMetaMaskFlag(tmpFlag);
    // getAllPoints().then(point => {
    //   console.log(point);
    //   setPoint(point.mintedAllPoint);
    //   setCoin(point.mintedAllCoin);
    // })
    // getPlayerInfo(uid).then(user => {
    //   setUserCoin(user.coin);
    //   setUserPoint(user.token);
    // })
  },[]);

  const connectWeb3 = async() => {
    try{
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      
      // const deployedNetwork = EthReceiveContract.networks[networkId];
      // const instance_contract = new web3.eth.Contract(
      //   EthReceiveContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );
      // setWallet(instance_contract);
      
      setWeb3(web3);
      web3.eth.getBlock('latest').then(result =>{
        console.log(result);
        web3.eth.getTransaction(result.transactions[0]).then(result =>{
          console.log(result.from, result.value);
        });
      });
    }
    catch(error){
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  const getUserBal = () => {
    web3.eth.getBalance(account).then(balanc => {
      console.log(balanc);
    })
  }
  const getTrxValue = () => {
    web3.eth.getTransaction('0xd91d66a1c5927ebae746c4d97e8a616fcadb59eb8122f15e160fbab487321dcc').then(result => {
      console.log(result);
    })//0x2b23b695591c5df04f3dd43b1cd2ba31a234ed2913de179cf4a4055acfe133a8 blockhash
    
  }
  const tempTrx = () => {
    web3.eth.sendTransaction({
      from: account,
      to: '0xDB2c0335930a3F6f58B600935AC1B55b12c3E957',
      value: 12
    }).then(txHash =>{
      web3.eth.getTransaction(txHash.transactionHash).then(result => {
        console.log(result.value);
      })
    })
  }
  const connectWallet = () => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
		setAccount(result[0]);
	  }).catch((error) => {
	  setErrorMessage(error.message);
	  });
  }
  const pointToCoinBtn = (_PtoC) => {
    if(uid!==null){
      if(_PtoC){
        if(changePoint % 100 ===0 && changePoint <= userPoint){
          putChangeCoin({account: uid, point: changePoint, PtoC: _PtoC}).then(result => {
            alert(`${changePoint}point??? ${result}Eth??? ?????? ?????????????????????`);
          })
        }
        else if(changePoint > userPoint) alert('?????? ????????? ??????');
        else alert('?????? ??????\n(100 ????????? ???????????? ?????????????????????)');
      }
      else{
        if(((((100-mintedCoin)/mintedPoint)/10000)*reqPoint) <= userCoin){
          putChangeCoin({account: uid, point: reqPoint, PtoC: _PtoC}).then(result => {
            alert(`${result}Eth??? ${reqPoint}point??? ?????? ?????????????????????`);
          })
        }
        else alert('?????? Eth ??????');
      }
    }
    else{
      alert('???????????? ????????? ????????? ?????????.');
    }
  }
  return (
    <>
    <a onClick={connectWallet}>Connect Wallet</a>
    {account}
    <button onClick={getTrxValue}>trxvalue</button>
    <button onClick={getUserBal}>UserBal</button>
    <button onClick={tempTrx}>tempTrx</button>
    {/* <p style={{fontSize:'x-large', marginBottom:'0px'}}>?????? 100P ??? ??????????????? ?????????:<br/>{((100-mintedCoin)/mintedPoint)/100} ETH</p>
    <p style={{marginTop:'0px'}}>(?????? ?????????: (ETH??? ?????? / ????????? ?????????) / 100)</p><br/>
    <p>?????? ?????? ETH: {userCoin}</p>
    <p>?????? ?????? ?????????: {userPoint}</p><br/>
    <input type='number' min={0} max={999900} step={100} placeholder={'input point'} onChange={(evt)=>setCall(evt.target.value)}></input>
    <button className="App-exeButton" onClick={()=>pointToCoinBtn(true)}>point-&gt;Eth</button>
    ????????? eth: {((((100-mintedCoin)/mintedPoint)/10000)*changePoint).toFixed(5)}
    <br/>
    <input type='number' min={0} max={999000} step={10} placeholder={'input point'} onChange={(evt)=>setReqPoint(evt.target.value)}></input>
    <button className="App-exeButton" onClick={()=>pointToCoinBtn(false)}>Eth-&gt;Point</button>
    ????????? eth: {((((100-mintedCoin)/mintedPoint)/10000).toFixed(6)*reqPoint).toFixed(5)} */}
    </>
  );
}
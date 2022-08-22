import { Players } from '../models.js';
import { sequelize } from '../models.js';

export const pointToCoin = async(_account, _point) => {
    const countPoint = await countAllPoint();
    const exchange = (((100-countPoint.mintedAllCoin)/countPoint.mintedAllPoint)/100).toFixedNumber(5);
    const inputPoint = _point/100;
    return new Promise(resolve => {
        Players.findOne({
            where: {sub: _account}
        }).then(user => {
            user.token -= _point;
            user.coin += exchange*inputPoint;
            user.save();
            resolve(exchange*inputPoint);
        })
    });
}
export const coinToPoint = async(_account, _reqPoint) => {
    const countPoint = await countAllPoint();
    const exchange = (((100-countPoint.mintedAllCoin)/countPoint.mintedAllPoint)/10000).toFixedNumber(6);
    return new Promise(resolve => {
        Players.findOne({
            where: {sub: _account}
        }).then(user => {
            user.token += parseInt(_reqPoint, 10);
            user.coin -= _reqPoint*exchange;
            user.save();
            resolve(exchange*_reqPoint);
        })
    });
}

export const countAllPoint = () => {
    let result = {mintedAllPoint: 0, mintedAllCoin: 0}
    //let mintedAllPoint=0, mintedAllCoin=0;

    return new Promise(resolve => {
        sequelize.query('select token, coin from players')
        .then(([tokens, count]) => {
        for(let fori=0; count.rowCount>fori; ++fori){
        result.mintedAllPoint += tokens[fori].token;
        result.mintedAllCoin += tokens[fori].coin;
        }
        resolve(result);
        })
    })   
}
Number.prototype.toFixedNumber = function(digits, base){
    var pow = Math.pow(base||10, digits);
    return Math.round(this*pow) / pow;
  }
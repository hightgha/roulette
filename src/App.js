import './App.css';
import React from 'react';
import Block from './components/Block';
import Button from './components/Button';
import History from './components/History';
// import logo from './img/roulette.png';

class App extends React.Component{
  state = {
    betCount: 1,
    balance: 10000,
    bets: [],
    history: []
  }
  history = 0
  startGame = () => {
    const number = Math.trunc(Math.random()*37);
    const color = NUMBERS[number];
    let balanceChange = 0;
    console.log(number, color)
    //num
    if(allbets.number.hasOwnProperty(number)){
      balanceChange += allbets.number[number]*37;
    }
    //color
    if(allbets.color.hasOwnProperty(color)){
      balanceChange += allbets.color[color]*2;
    }
    for(let section in allbets.section){ //section
      let fromTo = section.split('-');
      if(number >= fromTo[0] && number <= fromTo[1]){
        balanceChange += allbets.section[section] * 3;
        break;
      }
    }
    //row
    for(let row in allbets.row){
      let numberRow = parseInt(row)
      if(number && number%3 === numberRow%3){
        balanceChange += allbets.row[row]*3;
      }
    }
    //oddeven
    if(allbets.oddEven.hasOwnProperty('even') && number && !(number%2)){
      balanceChange += allbets.oddEven.even * 2;
    }
    if(allbets.oddEven.hasOwnProperty('odd') && number%2){
      balanceChange += allbets.oddEven.odd * 2;
    }
    //half
    for(let half in allbets.half){
      let fromTo = half.split('-');
      if(number >= fromTo[0] && number <= fromTo[1]){
        balanceChange += allbets.half[half]*2;
        break;
      }
    }
    for(let key in allbets){
      allbets[key] = {};
    }
    this.setState({
      bets: [],
      balance: this.state.balance + balanceChange,
      history: this.state.history.slice(this.state.history.length < 23 ? 0 : 1).concat(
        <Block size='mini' color={color} number={number} key={++this.history}/>
      )
    })
  }

  numberBet = number => this.globalBet(number,'number');
  colorBet = color => this.globalBet(color,'color');
  sectionBet = section => this.globalBet(section,'section');
  rowBet = row => this.globalBet(row,'row');
  oddEvenBet = oddEven => this.globalBet(oddEven,'oddEven');
  halfBet = half => this.globalBet(half,'half');
  globalBet = (data, type) => {
    if(this.state.bets.length < 3 && !this.state.bets.includes(data) && this.state.betCount && (this.state.balance - this.state.betCount >= 0)){
      allbets[type][data] = this.state.betCount;
      this.setState({
        bets: this.state.bets.concat(data),
        balance: this.state.balance - this.state.betCount,
      });
    }
  }
  plus = (event) => {
    let bet = 1;
    if(event.altKey){      bet *= 10;    }
    if(event.ctrlKey){      bet *= 10;    }
    if(event.shiftKey){      bet *= 10;    }
    if(this.state.balance < bet+this.state.betCount ){
      return alert('Invalid bet, you can`t bet higher than balance')
    }
    this.setState({
      betCount: this.state.betCount+bet
    })
  }
  minus = (event) => {
    let bet = 1;
    if(event.altKey){      bet *= 10;    }
    if(event.ctrlKey){      bet *= 10;    }
    if(event.shiftKey){      bet *= 10;    }
    if(this.state.balance < this.state.betCount-bet || this.state.betCount-bet < 0){
      this.setState({
        betCount: 0
      })
      return alert('Invalid bet, you can`t bet lower 0');
    }
    this.setState({
      betCount: this.state.betCount-bet
    })
  }
  allin = () => this.setState({ 
    betCount: this.state.balance
  })
  double = () => {
    if(this.state.betCount * 2 > this.state.balance){
      return alert('Invalid bet, you can`t bet higher than balance')
    }
    this.setState({
      betCount: this.state.betCount*2
    });
  }

  handleChange = (event) => {
    let { value } = event.target;
    value = +(value.split('').filter(e => !isNaN(e)).join(''))
    if(value > this.state.balance){
      value = +this.state.balance;
    }
    this.setState({
      betCount: +value
    });
  }

  render(){
    return (
      <div className='App'>
        <div>
          <div className='wrapper'>
            <Block onClick={() => this.numberBet(0)} size='longer' color={NUMBERS[0]} number='0' />
            <div className='table'>
              <div className='row'>
                {[3,6,9,12,15,18,21,24,27,30,33,36].map(num => 
                   (<Block onClick={() => this.numberBet(num)} key = {num} size='normal' color={NUMBERS[num]} number={num} />)
                )}
              </div>
              <div className='row'>
                {[2,5,8,11,14,17,20,23,26,29,32,35].map(num => 
                   (<Block onClick={() => this.numberBet(num)} key = {num} size='normal' color={NUMBERS[num]} number={num} />)
                )}
              </div>
              <div className='row'>
                {[1,4,7,10,13,16,19,22,25,28,31,34].map(num => 
                   (<Block onClick={() => this.numberBet(num)} key = {num} size='normal' color={NUMBERS[num]} number={num} />)
                )}
              </div>
              <div className='row'>
                {['1-12', '13-24', '25-36'].map(num => 
                   (<Block onClick={() => this.sectionBet(num)} key = {num} color='green' number={num} size='extralong' />)
                )}
              </div>
              <div className='row'>
                <Block onClick={() => this.halfBet('1-18')} color='green' number='1-18' size='long' />
                <Block onClick={() => this.oddEvenBet('even')} color='green' number='EVEN' size='long' />
                <Block onClick={() => this.colorBet('red')} color='red' number='RED' size='long' />
                <Block onClick={() => this.colorBet('black')} color='black' number='BLACK' size='long' />
                <Block onClick={() => this.oddEvenBet('odd')} color='green' number='ODD' size='long' />
                <Block onClick={() => this.halfBet('19-36')} color='green' number='19-36' size='long' />
              </div>
              <Button text='all in' onClick={this.allin} />
              <Button text='double' onClick={this.double} />
              <Button text='increase' onClick={this.plus} />
              <Button text='decrease' onClick={this.minus} />
              <div className='boardtextWrapper'>
                <span className='boardtext'>Balance<br/>{this.state.balance}</span>
                <span className='boardtext'>Total Bets<br/>{this.state.bets.join(' | ')}</span>
                <span className='boardtext'>Current bet<br/>{this.state.betCount}</span>
              </div>
              <div><input onChange={this.handleChange} value={this.state.betCount}/></div>
              <Button text='start' onClick={this.startGame} />
              <History>{this.state.history}</History>
            </div>
            <div>
              {[3,2,1].map(num => 
                (<Block onClick={() => this.rowBet(`${num}row`)} key = {num} size='half' color='green' number='2 to 1' />)
              )}
            </div>
          </div>
          
        </div>
        
      </div>
    )
  }
}
let allbets = {
  number: {},
  color: {},
  row: {},
  section: {},
  oddEven: {},
  half: {}
};
const NUMBERS = {
  0: 'green', 1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 
  6: 'black', 7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black',
  12: 'red', 13: 'black', 14: 'red', 15: 'black', 16: 'red', 17: 'black', 
  18: 'red', 19: 'red', 20: 'black', 21: 'red', 22: 'black', 23: 'red', 
  24: 'black', 25: 'red', 26: 'black', 27: 'red', 28: 'black', 29: 'black', 
  30: 'red', 31: 'black', 32: 'red', 33: 'black', 34: 'red', 35: 'black', 36: 'red',
}

export default App;

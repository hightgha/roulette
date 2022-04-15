import './App.css';
import React from 'react';
import Block from './components/Block';
import Button from './components/Button';
import History from './components/History';
// import logo from './img/roulette.png';

class App extends React.Component{
  state = {
    betCount: 10,
    balance: 10000,
    bets: [],
    history: []
  }
  allbets = {
    number: {},
    color: {},
    row: {},
    section: {},
    oddEven: {},
    half: {}
  }
  history = 0 
  numbers = {
    0: 'green', 1: 'red', 2: 'black', 3: 'red', 4: 'black', 5: 'red', 
    6: 'black', 7: 'red', 8: 'black', 9: 'red', 10: 'black', 11: 'black',
    12: 'red', 13: 'black', 14: 'red', 15: 'black', 16: 'red', 17: 'black', 
    18: 'red', 19: 'red', 20: 'black', 21: 'red', 22: 'black', 23: 'red', 
    24: 'black', 25: 'red', 26: 'black', 27: 'red', 28: 'black', 29: 'black', 
    30: 'red', 31: 'black', 32: 'red', 33: 'black', 34: 'red', 35: 'black', 36: 'red',
  }
  startGame = () => {
    const number = Math.trunc(Math.random()*37);
    const color = this.numbers[number];
    let balanceChange = 0;
    console.log(number, color)
    //num
    if(this.allbets.number.hasOwnProperty(number)){
      console.log('win number');
      balanceChange += this.allbets.number[number]*37;
    }
    //color
    if(this.allbets.color.hasOwnProperty(color)){
      console.log('win color');
      balanceChange += this.allbets.color[color]*2;
    }
    for(let section in this.allbets.section){//section
      let fromTo = section.split('-');
      console.log(fromTo)
      if(number >= fromTo[0] && number <= fromTo[1]){
        console.log('section half');
        balanceChange += this.allbets.half[section]*3;
        break;
      }
    }
    //row
    for(let row in this.allbets.row){
      let numberRow = parseInt(row)
      if(number && number%3 === numberRow%3){
        balanceChange += this.allbets.row[row]*3;
      }
    }
    //oddeven
    if(this.allbets.oddEven.hasOwnProperty('even') && number && !(number%2)){
      balanceChange += this.allbets.oddEven.even*2;
    }
    if(this.allbets.oddEven.hasOwnProperty('odd') && number%2){
      balanceChange += this.allbets.oddEven.odd*2;
    }
    for(let half in this.allbets.half){//half
      let fromTo = half.split('-');
      if(number >= fromTo[0] && number <= fromTo[1]){
        console.log('win half');
        balanceChange += this.allbets.half[half]*2;
        break;
      }
    }
    for(let key in this.allbets){
      this.allbets[key] = {};
    }
    this.setState({
      bets: [],
      balance: this.state.balance + balanceChange,
      history: this.state.history.slice(this.state.history.length < 23 ? 0 : 1).concat(
        <Block size='mini' color={color} number={number} key={++this.history}/>
      )
    })
   
    console.log(this.state);
  }

  numberBet = number => this.globalBet(number,'number');
  colorBet = color => this.globalBet(color,'color');
  sectionBet = section => this.globalBet(section,'section');
  rowBet = row => this.globalBet(row,'row');
  oddEvenBet = oddEven => this.globalBet(oddEven,'oddEven');
  halfBet = half => this.globalBet(half,'half');
  globalBet = (data, type) => {
    if(this.state.bets.length < 3 && !this.state.bets.includes(data) && this.state.betCount && (this.state.balance - this.state.betCount >= 0)){
      this.allbets[type][data] = this.state.betCount;
      this.setState({
        bets: this.state.bets.concat(data),
        balance: this.state.balance - this.state.betCount,
      })
      console.log(this.state);
      console.log(this.allbets);
    }
  }
  plus = (event) => {
    console.log(event);
    let bet = 10;
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
    console.log(event);
    let bet = 10;
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
  allin = () => this.setState({ betCount: this.state.balance })
  double = () => {
    if(this.state.betCount * 2 > this.state.balance){
      return alert('Invalid bet, you can`t bet higher than balance')
    }
    this.setState({
      betCount: this.state.betCount*2
    })
  }
  render(){
    return (
  
      <div className='App'>
        {/* <img className='image' src={logo} alt='logo'/> */}
        <div>
          <div className='wrapper'>
            <Block onClick={() => this.numberBet(0)} color='green' number='0' size='longer' />
            <div className='table'>
              <div className='row'>
                <Block onClick={() => this.numberBet(3)} size='normal' color='red' number='3' />
                <Block onClick={() => this.numberBet(6)} size='normal' color='black' number='6' />
                <Block onClick={() => this.numberBet(9)} size='normal' color='red' number='9' />
                <Block onClick={() => this.numberBet(12)} size='normal' color='red' number='12' />
                <Block onClick={() => this.numberBet(15)} size='normal' color='black' number='15' />
                <Block onClick={() => this.numberBet(18)} size='normal' color='red' number='18' />
                <Block onClick={() => this.numberBet(21)} size='normal' color='red' number='21' />
                <Block onClick={() => this.numberBet(24)} size='normal' color='black' number='24' />
                <Block onClick={() => this.numberBet(27)} size='normal' color='red' number='27' />
                <Block onClick={() => this.numberBet(30)} size='normal' color='red' number='30' />
                <Block onClick={() => this.numberBet(33)} size='normal' color='black' number='33' />
                <Block onClick={() => this.numberBet(36)} size='normal' color='red' number='36' />
              </div>
              <div className='row'>
                <Block onClick={() => this.numberBet(2)} size='normal' color='black' number='2' />
                <Block onClick={() => this.numberBet(5)} size='normal' color='red' number='5' />
                <Block onClick={() => this.numberBet(8)} size='normal' color='black' number='8' />
                <Block onClick={() => this.numberBet(11)} size='normal' color='black' number='11' />
                <Block onClick={() => this.numberBet(14)} size='normal' color='red' number='14' />
                <Block onClick={() => this.numberBet(17)} size='normal' color='black' number='17' />
                <Block onClick={() => this.numberBet(20)} size='normal' color='black' number='20' />
                <Block onClick={() => this.numberBet(23)} size='normal' color='red' number='23' />
                <Block onClick={() => this.numberBet(26)} size='normal' color='black' number='26' />
                <Block onClick={() => this.numberBet(29)} size='normal' color='black' number='29' />
                <Block onClick={() => this.numberBet(32)} size='normal' color='red' number='32' />
                <Block onClick={() => this.numberBet(35)} size='normal' color='black' number='35' />
              </div>
              <div className='row'>
                <Block onClick={() => this.numberBet(1)} size='normal' color='red' number='1' />
                <Block onClick={() => this.numberBet(4)} size='normal' color='black' number='4' />
                <Block onClick={() => this.numberBet(7)} size='normal' color='red' number='7' />
                <Block onClick={() => this.numberBet(10)} size='normal' color='black' number='10' />
                <Block onClick={() => this.numberBet(13)} size='normal' color='black' number='13' />
                <Block onClick={() => this.numberBet(16)} size='normal' color='red' number='16' />
                <Block onClick={() => this.numberBet(19)} size='normal' color='red' number='19' />
                <Block onClick={() => this.numberBet(22)} size='normal' color='black' number='22' />
                <Block onClick={() => this.numberBet(25)} size='normal' color='red' number='25' />
                <Block onClick={() => this.numberBet(28)} size='normal' color='black' number='28' />
                <Block onClick={() => this.numberBet(31)} size='normal' color='black' number='31' />
                <Block onClick={() => this.numberBet(34)} size='normal' color='red' number='34' />
              </div>
              <div className='row'>
                <Block onClick={() => this.sectionBet('1-12')} color='green' number='1st 12' size='extralong' />
                <Block onClick={() => this.sectionBet('13-24')} color='green' number='2nd 12' size='extralong' />
                <Block onClick={() => this.sectionBet('25-36')} color='green' number='3rd 12' size='extralong' />
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
              <Button text='start' onClick={this.startGame} />
              <History>{this.state.history}</History>
            </div>
            <div>
              <Block onClick={() => this.rowBet('3row')} size='half' color='green' number='2 to 1' />
              <Block onClick={() => this.rowBet('2row')} size='half' color='green' number='2 to 1' />
              <Block onClick={() => this.rowBet('1row')} size='half' color='green' number='2 to 1' />
            </div>
          </div>
          
        </div>
        
      </div>
    )
  }
}

export default App;

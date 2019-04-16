import React, { Component } from 'react';
import Theme from './Theme';
import Recent from './Recent';

/* eslint-disable no-restricted-globals */
class CalculatorApp extends Component {
  state = {
    last: undefined,
    input: [],
    temp: [],
    recent: [],
    result: undefined
  };

  componentDidMount() {
    if (localStorage.kalkuleytor) {
      const recent = JSON.parse(localStorage.kalkuleytor);

      this.setState({ recent });
    }

    window.addEventListener('keydown', (e) => {
      this.numberHandler(e.key);

      if (e.keyCode === 13) {
        this.calculateHandler();
      } else if (e.keyCode === 8 || e.keyCode === 46) {
        this.deleteHandler();
      }
    });
  }

  numberHandler = (value) => {
    const { input, temp } = this.state;
    const regexOperator = /(\+|-|\*|\/|\%)/;
    const multipleZeros = /^0{2,}\d*\.?$/;
    const tempTest = [...temp, value];
    const inputTest = [...input, ...temp];
    
    // If the tempArray is empty and first value is '.' , append 0 
    if (temp.length === 0 
        && value === '.' 
        && isNaN(input[input.length - 1]) 
    ) {
      this.setState({ temp: ['0', '.'] });
    } 

    // Check if the tempArray is a number, the value is an operator, and the input
    // array last item is a number
    // Append the tempArray content in inputArray and reset the tempArray
    if (!isNaN(temp.join('')) 
        && regexOperator.test(value)
        && !regexOperator.test(inputTest[inputTest.length - 1]) 
        && (temp.length !== 0 || input.length !== 0) 
    ) {
      this.setState({ 
        input: [...input, ...tempTest],
        temp: [] 
      });
    }

    // Check if the tempArray is a number and the value is not operator
    // Append the value into the tempArray
    if (!isNaN(tempTest.join('')) 
        && !regexOperator.test(value) 
        && !multipleZeros.test(tempTest.join(''))
    ) {
      this.setState({ temp: [...temp, value] });
    }
  };

  itemExistInHistory = (item) => {
    const { recent } = this.state;
    for (let i = 0; i < recent.length; i++) {
      if (recent[i].input.join('') === item.join('')) {
        return true;
      }
    }
    return false;
  };

  calculateHandler = () => {
    const { input, temp, recent } = this.state;
    const totalInput = input.concat(temp);

    if (totalInput.length === 0 || totalInput[0] === 0) {
      return this.setState({ result: undefined });
    }

    try {
      if (!isNaN(totalInput[totalInput.length - 1])) {
        const output = eval(totalInput.join(''));

        this.setState({
          input: isFinite(output) ? output.toString().split('') : [...input],
          result: output,
          last: output,
          temp: []
        });
        
        if (!this.itemExistInHistory(totalInput)) {
          this.setState({ 
            recent: [
              { 
                input: totalInput,
                result: isFinite(output) ? output : 'Infinity' 
              },   
              ...recent 
            ]
          }, () => {
            localStorage.setItem('kalkuleytor', JSON.stringify(this.state.recent));
          });
        }
      } else {
        this.setState({
          result: undefined
        });
      }
    } catch (e) {
      this.setState({ 
        input: [],
        temp: [],
        result: 'Syntax Error' 
      });
    }
  };

  deleteHandler = () => {
    const { input, temp } = this.state;
    if (temp.length !== 0) {
      temp.pop();
      this.setState(prevState => ({
        temp: prevState.temp
      }));
    } else if (input.length !== 0) {
      input.pop();
      this.setState(prevState => ({
        input: prevState.input
      }));
    }
  };

  onClearHandler = () => {
    this.setState({ 
      input: [], 
      temp: [],
      result: undefined
    });
  };

  selectedHistory = (input, result) => {
    this.setState({
      input,
      result
    });
  };

  deleteHistory = (index) => {
    this.setState({
      recent: this.state.recent.filter((history, i) => index !== i)
    });
  };

  clearHistory = () => {
    this.setState({ recent: [] });
  };

  render() {
    const { input, temp, recent } = this.state;
    const inputDisplay = input.concat(temp).join('').replace('*', 'x');

    return (
      <div className="container">
        <Theme />
        <Recent 
            clearHistory={this.clearHistory}
            deleteHistory={this.deleteHistory}
            recent={recent}
            selectedHistory={this.selectedHistory}
        />
        <div className="container-wrapper">
            <div className="container-result">
              {!!this.state.result && (
                <p className="result">= {this.state.result}</p>
              )}
              <p>{inputDisplay}</p>
            </div>
            <div className="divider"/>
            <div className="container-numbers">
              <button 
                  className="clear"
                  onClick={this.onClearHandler} 
              >
              CLEAR
              </button>                
              <button onClick={() => this.numberHandler('%')}>%</button>
              <button onClick={() => this.numberHandler('7')}>7</button>
              <button onClick={() => this.numberHandler('8')}>8</button>
              <button onClick={() => this.numberHandler('9')}>9</button>
              <button onClick={() => this.numberHandler('4')}>4</button>
              <button onClick={() => this.numberHandler('5')}>5</button>
              <button onClick={() => this.numberHandler('6')}>6</button>
              <button onClick={() => this.numberHandler('1')}>1</button>
              <button onClick={() => this.numberHandler('2')}>2</button>
              <button onClick={() => this.numberHandler('3')}>3</button>
              <button 
                  className="delete"
                  onClick={this.deleteHandler} 
              >
              del
              </button>
              <button onClick={() => this.numberHandler('0')}>0</button>
              <button onClick={() => this.numberHandler('.')}>.</button>
            </div>
            <div className="container-operators">
              <button onClick={() => this.numberHandler('+')}>+</button>
              <button onClick={() => this.numberHandler('-')}>-</button>
              <button onClick={() => this.numberHandler('*')}>x</button>
              <button onClick={() => this.numberHandler('/')}>/</button>
              <button 
                  className="equals"
                  onClick={this.calculateHandler} 
              >
              =
              </button>
            </div>
        </div>
      </div>  
    );
  }
}

export default CalculatorApp;

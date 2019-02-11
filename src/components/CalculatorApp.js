import React from 'react';
import Theme from './Theme';

class CalculatorApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            last: undefined,
            input: [],
            result: undefined
        };

        this.numberHandler = this.numberHandler.bind(this);
        this.calculateHandler = this.calculateHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    numberHandler = (value) => {
        const reg = /(^0{2,}\.\d*$|^\d+\.\d+\.$)/;
        let w = [];
        w = [...this.state.input, value];
        w = w.toString().split(',').join('');
    
        if(this.state.input.length === 0 && value == '.') {
            this.setState(() => ({
                input: [0,'.']
            }));
        }
        else if(this.state.input.length == 0 && typeof value === 'string' || reg.test(w)) {
            this.setState((prevState) => ({ input: prevState.input }));
        }
        else {
            this.setState((prevState) => ({
                input: typeof prevState.input[prevState.input.length -1] == 'string' && typeof value == 'string' ? [...this.state.input] : [...prevState.input, value]
            }));
        }   
    };

    componentDidUpdate() {
        if(this.state.result) {
            document.querySelector('.result').classList.add('showPrev');
        }else {
            document.querySelector('.result').classList.remove('showPrev');
        }
    }

    calculateHandler = () => {
        let lastItem = this.state.input[this.state.input.length - 1];
        
        if(typeof lastItem  !== 'string') {
            const input = this.state.input;
            
            try {
                const output = eval(input.join(''));
                const arr = [];
                const regex = /\d+/;
                const regexp = /^0{1,}$/;
                const reg = /^0{2,}\.0{1,}$/;
                output.toString().split('').forEach((item) => {
                    
                    if(regex.test(parseInt(item))) {
                        arr.push(parseInt(item));
                    }else {
                        arr.push(item.toString());
                    }
                });

                //console.log('test: ', regexp.test(`${output}`));
                this.setState(() => ({
                    input: (arr.length == 1 && arr[0] == 0) || `${output}` === 'NaN' || output === Infinity ? [] : arr,
                    result: `${output}` === 'NaN' || regexp.test(`${output}`)  ? 0 : output,
                    last: this.result
                })); 
                
            } catch(e) {
                this.setState(() => ({result: undefined}));
            }
       
        } else {
            this.setState(() => ({
                result: 'Syntax Error'
            }));
        }
        if(this.state.input.length === 0 && this.state.input[0] === 0) {
            this.setState(() => ({ result: undefined  }));
        }

    };

    deleteHandler = () => {
        if(this.state.input.length >= 1) {
            this.state.input.pop();
        }
        this.setState((prevState) => ({
            input: prevState.input 
        }));
    }

    render() {
        return (
            <div className="container">
                <Theme />
                <div className="container-wrapper">
                    <div className="container-result">
                        <p className="result">{this.state.result}</p>
                        <p>{this.state.input }</p>
                    </div>
                    <div className="divider"></div>
                    <div className="container-numbers">
                        <button onClick={() => {
                            this.setState(() => ({ input: [], result: undefined}));
                        }} className="clear">CLEAR</button>                
                        <button onClick={() => {
                            this.numberHandler('%');
                        }}>%</button>
                        <button onClick={() => {
                            this.numberHandler(7);
                        }}>7</button>
                        <button onClick={() => {
                            this.numberHandler(8);
                        }}>8</button>
                        <button onClick={() => {
                            this.numberHandler(9);
                        }}>9</button>

                        <button onClick={() => {
                            this.numberHandler(4);
                        }}>4</button>
                        <button onClick={() => {
                            this.numberHandler(5);
                        }}>5</button>
                        <button onClick={() => {
                            this.numberHandler(6);
                        }}>6</button>
                        <button onClick={() => {
                            this.numberHandler(1);
                        }}>1</button>
                        <button onClick={() => {
                            this.numberHandler(2);
                        }}>2</button>
                        <button onClick={() => {
                            this.numberHandler(3);
                        }}>3</button>
                        
                        <button 
                            onClick={this.deleteHandler} 
                            className="delete">
                        del
                        </button>
                        
                        <button onClick={() => {
                            this.numberHandler(0);
                        }}>0</button>
                        <button onClick={() => {
                            this.numberHandler('.');
                        }}>.</button>
                    </div>
                    <div className="container-operators">
                        <button onClick={() => {
                            this.numberHandler('+');
                        }}>+</button>
                        <button onClick={() => {
                            this.numberHandler('-');
                        }}>-</button>
                        <button onClick={() => {
                            this.numberHandler('*');
                        }}>x</button>
                        <button onClick={() => {
                            this.numberHandler('/');
                        }}>/</button>
                        <button 
                            onClick={this.calculateHandler} 
                            className="equals">
                        =
                        </button>
                    </div>
                </div>
            </div>  
        );
    }
}

export default CalculatorApp;
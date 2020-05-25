import React, {Component} from   'react';
import './App.css';

class App extends Component {
	
	state = {
		digit: '0',
		waitingForOperand: false,
		currentValue: null,
		operator: null
	};

	// Entering digits
	handleDigit(number){
		
		const {digit, waitingForOperand, operator, currentValue } = this.state;
		
		if(waitingForOperand){
				// after pressing operator different from '='
			 	const newDigit = digit === "0" ? String(number) : String(digit) + String(number);
				this.setState({digit: newDigit, waitingForOperand: false });
			   
		}else{
			//3. after pressing '='
			if(operator === '='){
			   
				const newDigit = currentValue === "0" ? String(number) : String(currentValue) + String(number);
				this.setState({digit: newDigit, waitingForOperand: false, currentValue: null, operator: null });
			
			}else{
				//1. begining
				const newDigit = digit === "0" ? String(number) : String(digit) + String(number);
				this.setState({digit: newDigit });
				
			}
			
			
		}	
	
	}


	// Pressing reset
	handleReset(){
		
		this.setState({
				digit: '0',
				waitingForOperand: false,
			    currentValue: null,
			    operator: null
			});
	}


	// Entering decimal number
	handleDot(dotPressed){
		
		const { digit, operator, currentValue } = this.state;
		
			
			if(operator === '='){
				
				if(currentValue.indexOf('.') === -1 ){
					
					this.setState({digit: currentValue + '.', waitingForOperand: false, currentValue: null, operator: null });
				}
				
			}else{
				
				if(digit.indexOf('.') === -1 ){
			
					this.setState({digit: digit + '.'});
				}
				
			}
		
			
				
	} 

	// Handle operator
	handleOperator(oper){
		
		const {waitingForOperand, digit, currentValue, operator} = this.state;
				
		const operators = {
			'+' : (currentValue, newValue) => currentValue + newValue,
			'-' : (currentValue, newValue) => currentValue - newValue,
			'*' : (currentValue, newValue) => currentValue * newValue,
			'/' : (currentValue, newValue) => currentValue / newValue,
			'=' : (currentValue, newValue) => newValue
		}; 
		
		// already press an operator and waiting for operand (cannot change the operator alrady pressed)
		if(waitingForOperand === true) return;
		
		// 2. pressing a operator (compounding)
		if(currentValue !== null){  //3. already press an operator and an operand
			
			if(oper === '='){
				
				if(operator === '=') return; // cannot press '=' more than once
				
				// 4. pressing equal after an operation hapenned 
				const newDigit = operators[operator](parseFloat(currentValue), parseFloat(digit));
				this.setState({currentValue: '0', waitingForOperand: false, digit: String(newDigit), operator: oper});
				
			}else{
				// 5. pressing an operator after a '=' getting final result happened. i.e '-' after '='
				if(operator === '='){
					
					const newDigit = digit;
					this.setState({currentValue: String(newDigit), waitingForOperand: true, digit: '0', operator: oper});
					
					// 6. pressing an operator after a '+' (compounding) i.e. '+' after '+'
				}else{
					
					const newDigit = digit;
					this.setState({currentValue: String(newDigit), waitingForOperand: true, digit: '0', operator: oper});
			
					
				}
					
			}
			
		// 1. After first operand was introduced or after '=' was pressed
		}else{
			
			if(oper === '=') return;
			if(digit === '0') return;
			
			const newDigit = digit;
			this.setState({currentValue: String(newDigit), waitingForOperand: true, digit: '0', operator: oper});
			
		}	
		
	}


	render(){
		
		const { digit } = this.state;
		const debug = '<pre>{JSON.stringify(this.state, null, 2)}</pre>';
		
		return (
    		<div className="App">
				
				<div className='header'>
					<h1>{digit}</h1>
				</div>
				
      			<div className='buttons'>
					<div>
						<button onClick={() => this.handleReset() }>AC</button>
						<button>+-</button>
						<button>%</button>
						<button onClick={() => this.handleOperator('/') }>/</button>
					</div>

					<div>
						<button onClick={() => this.handleDigit('7')    }>7</button>
						<button onClick={() => this.handleDigit('8')    }>8</button>
						<button onClick={() => this.handleDigit('9')    }>9</button>
						<button onClick={() => this.handleOperator('*') }>x</button>	
					</div>

					<div>
						<button onClick={() => this.handleDigit('4')    }>4</button>
						<button onClick={() => this.handleDigit('5')    }>5</button>
						<button onClick={() => this.handleDigit('6')    }>6</button>
						<button onClick={() => this.handleOperator('-') }>-</button>
					</div>

					<div>
						<button onClick={() => this.handleDigit('1')    }>1</button>
						<button onClick={() => this.handleDigit('2')    }>2</button>
						<button onClick={() => this.handleDigit('3')    }>3</button>
						<button onClick={() => this.handleOperator('+') }>+</button>	
					</div>

					<div>
						<button className='zero' onClick={() => this.handleDigit('0') }>0</button>
						<button onClick={() => this.handleDot('.')      }>.</button>
						<button onClick={() => this.handleOperator('=')    }>=</button>	
					</div>
				</div>
    		</div>
  		);
		
	}
  
}

export default App;

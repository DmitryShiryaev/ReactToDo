import './task.css';
import React from "react"


class Task extends React.Component {	
	
	constructor(props) {
		super(props);
		this.created = this.props.created || Date.now();
		this.state = {		
			completed: this.props.completed || false,
			edit: this.props.edit || false,
			text: this.props.text || ""		
		};
		
		this.handleFocus = this.handleFocus.bind(this);
		this.handleFocusOut = this.handleFocusOut.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeBox = this.handleChangeBox.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.toJson = this.toJson.bind(this);
	}
	
	
	render() {		
		return (
			
				<div className={'task ' + (this.state.completed ? 'completed' : 'inProgress')}>
					<input onFocus={this.handleFocus} onBlur={this.handleFocusOut} onChange={this.handleChange} className={'taskName ' + (this.state.edit ? '' : 'disabled')} type="text" value={this.state.text} />
					<label>Completed:</label> <input type="checkbox" name="completed" checked = {this.state.completed ? "checeked" : ""} onChange={this.handleChangeBox} />
					<div className="remove" onClick={this.handleRemove} ></div>
				</div>
			
		);
	}
	
	handleRemove(){
		this.props.onClose(this.props.index);
	}
	
	
	handleFocusOut(event){
		this.setState({
		  edit: false,
		  text: event.target.value		 
		}); 
		
		this.props.onUpdate(this.props.index,this.state.text);
		this.props.onSave(this.toJson());
	}
	
	handleFocus(){
		this.setState({
		  edit: true
		}); 
    }
	
	handleChange(event){
		this.setState({
		  edit: false,
		  text: event.target.value		 
		}); 
	}
	
	handleChangeBox(){
		this.setState((prevState) => {
		  return { completed: !prevState.completed}
		}); 
	}
	
	toJson(){			
		//console.error(JSON.stringify(Object.assign({'created': this.created},this.state)));	
		return JSON.stringify(Object.assign(this.state,{'created': this.created}));
	}

}

export default Task;
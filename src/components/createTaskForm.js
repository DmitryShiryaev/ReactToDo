//import './createTaskForm.cs	s';
import React from "react";

class Form extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      taskName: ""
    }

    this.handleAddTask = this.handleAddTask.bind(this)
	this.handleChange = this.handleChange.bind(this);
		
  }

  render(){
    return(
		<div>
			<form name="addTask" onSubmit={this.handleAddTask}>
				<input placeholder="enter task text" type="text" className="taskInput" onChange={this.handleChange}></input>
				<input type="submit" onSubmit={this.handleAddTask} className="submit" value="Send"/>			
			</form>
		</div>
    );
  }
  handleAddTask(e){
	  e.preventDefault();
	  this.props.newTask(this.state.taskName);
  }
  
  handleChange(event){
		this.setState({
		  taskName: event.target.value
	  });
  }
}

export default Form;
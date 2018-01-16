import React from "react"
//Components
import Task from "../components/task.js"

class ListTaskContainer extends React.Component{

	constructor(props) {
		super(props)	
		this.handleCloseTask = this.handleCloseTask.bind(this);
		this.handleUpdateTask = this.handleUpdateTask.bind(this);
		this.saveTask = this.saveTask.bind(this);
	}
		
	render(){
		return(
		<div className="row">     
			<ul>			
				{	
					this.props.list.map((value, index) => (
						<li key={(value + index).toString()}>
							<Task
								index = {index} 						
								text = {value} 
								onClose = {this.handleCloseTask}
								onUpdate = {this.handleUpdateTask}
								onSave = {this.saveTask}
							/>
						</li>
					))	
				}			
			</ul>        
		</div>
		)
	}
	
	saveTask{
		this.props.toStorage();
	}
	handleCloseTask(id){
		this.props.removeTask(id)
	}
	handleUpdateTask(id,value){
		this.props.updateList(id,value)
	}
}

export default ListTaskContainer;
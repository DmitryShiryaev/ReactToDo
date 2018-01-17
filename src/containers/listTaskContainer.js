import React from "react"
//Components
import Task from "../components/task.js"

class ListTaskContainer extends React.Component{

	constructor(props) {
		super(props);
		
		this.handleCloseTask = this.handleCloseTask.bind(this);
		this.handleUpdateTask = this.handleUpdateTask.bind(this);
		this.toStorage = this.toStorage.bind(this);
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
								created = {(this.props.details[index] && this.props.details[index].created) ? this.props.details[index].created : undefined}
								completed = {(this.props.details[index] && this.props.details[index].created) ? this.props.details[index].completed : undefined}
								onClose = {this.handleCloseTask}
								onUpdate = {this.handleUpdateTask}
								onSave = {this.toStorage}
							/>
						</li>
					),this)	
				}			
			</ul>        
		</div>
		)
	}
	
	toStorage(index,obj){
		this.props.toStorage(index,obj);
	}
	
	handleCloseTask(id){
		this.props.removeTask(id)
	}
	handleUpdateTask(id,value){
		this.props.updateList(id,value)
	}
}

export default ListTaskContainer;
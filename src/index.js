import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Task from './components/task.js';
import Form from './components/createTaskForm.js';
import ListTaskContainer from './containers/listTaskContainer.js';
import registerServiceWorker from './registerServiceWorker';

//Components
//import ListTaskContainer from "./containers/listTaskContainer.js"
//import CreateTaskForm from "./components/createTaskForm.js"

/*ReactDOM.render(
  <Task text={"Example Task 1"}/>,
  document.getElementById('root')
);*/


class App extends React.Component {
	constructor(props) {
		super(props);		
		
		//this.storageKey = this.props.storageKey;
		this.state = {
			taskList: this.props.list || [],
		}

		this.handleRemoveTask = this.handleRemoveTask.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleUpdateList = this.handleUpdateList.bind(this);
		this.saveList = this.saveList.bind(this);
		
	}
	
	render(){
		return (
			<div>
				<div className = "row">
					<div className="col-md-12">
							<div style = {{textAlign:"center"}}>
									<h2> React TODO Application </h2>
							</div>
					</div>
				</div>

				{/*Create Task Form */}
				<Form
					newTask = {this.handleAddTask}
				/>

				{/* Show Task list */}
				<ListTaskContainer
					list = {this.state.taskList}
					removeTask = {this.handleRemoveTask}
					updateList = {this.handleUpdateList}
					toStorage = {this.saveList}
					
				/>
			</div>
		)
	}
		

	handleUpdateList(id,value){
		this.handleRemoveTask(id);
		this.handleAddTask(value);
		
	}
	handleRemoveTask(id){
		let arr = this.state.taskList;
		arr.splice(id,1);
		this.setState({taskList: arr});
		this.saveList();
	}

	handleAddTask(taskName){
		let arr = this.state.taskList;
		this.binaryInsert(taskName,arr);		
		this.setState({taskList:arr});    
		this.saveList();
	}	
	
	saveList(res){		
		if (! res)
			return;
		let storage
		localStorage.setItem(this.props.storageKey,res);
	}
	
	binaryInsert(value,arr,startPos,endPos){
		let length = arr.length;
		let start = typeof(startPos) !== 'undefined' ? startPos : 0;
		let end = typeof(endPos) !== 'undefined' ? endPos : length - 1;
		let m = start + Math.floor((end - start)/2);
		
		// empty arr
		if(length === 0){
			arr.push(value);
			return;
		}	
		
		// add to the end
		if(value > arr[start]){
			arr.splice(start, 0, value);
			return;
		}

		// add to the begin
		if(value < arr[end]){
			arr.splice(end + 1, 0, value);
			return;
		}
		
		if(value < arr[m]){
			this.binaryInsert(value,arr,m + 1, end);
			return;
		}

		if(value > arr[m]){
			this.binaryInsert(value,arr, start, m - 1);
			return;
		}
	}
}

//get storage items
const storageKey = "taskList";
let  = localStorage.localStorage(storageKey);


ReactDOM.render(<App list = {} storageKey = {storageKey}/>, document.getElementById('root'));
registerServiceWorker();

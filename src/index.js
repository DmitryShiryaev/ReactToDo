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
		this.backupList = this.props.details || [];
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
					details = {this.backupList}
					removeTask = {this.handleRemoveTask}
					updateList = {this.handleUpdateList}
					toStorage = {this.saveList}
					
				/>
			</div>
		)
	}
		

	handleUpdateList(id,value){			
		let taskDetail = this.backupList[id];
		this.handleRemoveTask(id);		
		this.handleAddTask(value,taskDetail);				
	}
	
	handleRemoveTask(id){
		let arr = this.state.taskList;
		arr.splice(id,1);
		this.backupList.splice(id,1);
		this.setState({taskList: arr});		
		this.backup();
	}

	handleAddTask(taskName,backupData){
		backupData = backupData || {};
		let arr = this.state.taskList;
		let index = this.binaryInsert(taskName,arr);				
		this.backupList.splice(index,0,backupData);
		this.setState({taskList:arr});				
		this.backup();
	}	
	
	saveList(index,res){		
		if (! res)
			return;		
		
		this.backupList[index] = res;
		this.backup();
	}
	
	backup(){
		localStorage.setItem(this.props.storageKey[0],JSON.stringify(this.state.taskList));
		localStorage.setItem(this.props.storageKey[1],JSON.stringify(this.backupList));
	}
	
	binaryInsert(value,arr,startPos,endPos){
		let length = arr.length;
		let start = typeof(startPos) !== 'undefined' ? startPos : 0;
		let end = typeof(endPos) !== 'undefined' ? endPos : length - 1;
		let m = start + Math.floor((end - start)/2);
		
		// empty arr
		if(length === 0){
			arr.push(value);
			return 0;
		}	
		
		
		if(value > arr[start]){
			arr.splice(start, 0, value);
			return start;
		}

		
		if(value < arr[end]){
			arr.splice(end + 1, 0, value);
			return end + 1;
		}
		
		if(value < arr[m]){
			return this.binaryInsert(value,arr,m + 1, end);		
		}

		if(value > arr[m]){
			return this.binaryInsert(value,arr, start, m - 1);			
		}
	}
}

//get storage items
const storageKey = ["taskList","detailList"];
let list = {};
let details = {};

try{
	 list = JSON.parse(localStorage.getItem(storageKey[0]));
}
catch(e){
	console.error("Parse failed" + JSON.stringify(e));
}

try{
	details = JSON.parse(localStorage.getItem(storageKey[1]));
	/*try{
		for(let i in details)
			details[i] = JSON.parse(details[i]);
	}
	catch(e){
		console.error("Parse failed" + JSON.stringify(e));
	}*/
}
catch(e){
	console.error("Parse failed" + JSON.stringify(e));
}

ReactDOM.render(<App list={list} details={details} storageKey = {storageKey}/>, document.getElementById('root'));
registerServiceWorker();

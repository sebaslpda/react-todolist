import React, { Component } from 'react';
import './App.css';
import ToDoList from './components/TodoList';
import ToDoForm from './components/ToDoForm';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      todos: [{
        id: 1,
        description: 'todo',
      }] 
    }
    this.handleAddToDo = this.handleAddToDo.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this)
    this.handleEditToDo= this.handleEditToDo.bind(this)
  }
  
  componentDidMount() {
    fetch('http://localhost:5000/todos')
      .then((response) => {
        return response.json()
        })
      .then((todos) => {
        this.setState({todos: [...this.state.todos, ...todos]})
      })
  }

  handleAddToDo(todo) {
      fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({description: todo})
     }).then((response) => {
       return response.json()
      })
    .then((todo) => {
      this.setState({todos: [...this.state.todos, todo]})      
    })    
  }

  handleEditToDo(todoID){
    // fetch('http://localhost:5000/todos/' + todoID, {
    //   method: 'PUT',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({description: 'algo que contenga lo editado' })
    //  })

  }

  handleDeleteToDo(todoId){
    let newlistToDo = this.state.todos.filter(todo => todo.id !== todoId)
    this.setState({todos: newlistToDo})
  }

  
   
  render(){
  const classes = useStyles;

  return (
    <div className="App">
        <div className={classes.root}>
            <AppBar position="static">
               <Toolbar variant="dense">
                 <Typography variant="h6" color="inherit">
                     Cantidad de tareas pendientes: {this.state.todos.length}
                  </Typography>
                </Toolbar>
            </AppBar>
         </div>
            
      <ToDoForm onAddToDo={this.handleAddToDo}/>  
      <ToDoList 
      tareas={this.state.todos}
      delete={this.handleDeleteToDo}
      edit={this.handleEditToDo}
      />

         
    </div>
  );
  }

}

export default App;

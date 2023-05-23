import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component{
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField :''
    };
   
  }
  componentDidMount(){

    //will be called whenever the component mounts , it mounts only once (mounting means placing in the DOM)
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>
      response.json()
    ).then((users)=> this.setState(()=>{
      return {monsters: users};
    }, ()=>{
      //console.log(this.state);
    }));
   
  }

  onSearchChange = (event)=>{ //optimization
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(()=> {
      return {searchField} ;
    }
    );
  }


  render(){
    const {monsters , searchField} = this.state; //destructuring for optimization
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
      return (
        <div className="App"> 
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox 
        className ='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder={'Search Monster'}/>        
        <CardList monsters={filteredMonsters}/>
        </div> 
     
      );
    }

  } 


export default App;

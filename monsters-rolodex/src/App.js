import React, { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: '',
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (event) => {
          const searchString = event.target.value.toLocaleLowerCase();
        this.setState(() => {
          return { searchString };
        });
    }

  render() {

    const { monsters, searchString } =this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchString);
          });
    return (
      <div className='App'>
      <SearchBox 
      className='monsters-search-box' 
      changeHandler={onSearchChange} 
      placeholder='search monsters' 
      />  
      <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
import React , {Component} from 'react';
import { StyleSheet, Text, View , Button, FlatList } from 'react-native';
import Axios from 'axios';

var GET_RECIPES = "GET_RECIPES";
var GET_RECIPES_SUCCESS = "GET_RECIPES_SUCCESS";


function reducer(state = { recipes : []} , action ){
  switch(action.type){
    case GET_RECIPES  :
      return {...state, loading: true};
    case GET_RECIPES_SUCCESS:
      return {...state , loading: false , recipes : action.payload.data };
  }
}

function getRecipes(){
  return{
    type : GET_RECIPES,
    payload : {
      request : {
        url : "https://test.kode-t.ru/recipes"
      }
    }

  };  
}



class Item extends Component {

  render(){
    return (
    <Text>{this.props.name}</Text>
    );
  }

}


export default class App extends Component {


  fetchData(){
    Axios.get("https://test.kode-t.ru/recipes").then((response) =>{
      console.log(response.data.recipes);
      this.setState({recipes : response.data.recipes});
    })
  }

  state = {
    recipes : []
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="press to load" onPress = {() => {this.fetchData();}}/>
        <FlatList
          data = {this.state.recipes}
          renderItem={ ({item}) => <Item name={item.name}/> }
          keyExtractor={item => item.uuid} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

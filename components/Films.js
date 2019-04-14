import React, {Component} from 'react';
import HttpService from '../common/service/HttpService';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title} from 'native-base';

class Films extends Component {
  static navigationOptions = {
    drawerLabel: 'Films',
    drawerIcon: ({ tintColor }) => (
      <Icon name='film' style={{fontSize:24, color:tintColor}} />
    ),
  };
  state = { data: {results: []}, isLoading: true}

  componentDidMount(){
    this.loadData(false);
  }

  loadMore(url){
    this.loadData(true, url)
  };

  search(searchString){
    this.loadData(false, FILM_BASE_URL+'?search='+searchString);
  }

  loadData(loadMore, url = FILM_BASE_URL){
    //this.setState({isLoading: true});
    HttpService.getResponse(url, (response)=>{
      if(response != null){
        if(loadMore) {
          tmp = this.state.data;
          tmp.next = response.next;
          tmp.results = this.state.data.results.concat(response.results);
          this.setState({data: tmp, isLoading: false});
        } else {
          this.setState({data: response, isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    });
  }

  render (){
      return (
      <Container>
        <Header>
          <Left>
            <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}}></Icon>
          </Left>
          <Body>
            <Title>Films</Title>
          </Body>
          <Right/>
        </Header>
        <ScrollView style={styles.parent}>
          <TextInput style={styles.search} clearButtonMode="always" placeholder="Search by name." onChangeText={(text) => this.search(text)} />
           <Content>
            <List>
            {
              this.state.data.results.map((film, index) => (
                <ListItem thumbnail key={index} onPress={()=>this.props.navigation.navigate("Details")}>
                  <Left>
                    <Thumbnail square source = {require('../images/sw.jpeg')} />
                  </Left>
                  <Body>
                    <Text>{film.title}</Text>
                    <Text note numberOfLines={index}>{film.opening_crawl}</Text>
                  </Body>
                  <Right>
                      <Icon active name="arrow-forward" />
                  </Right>
                </ListItem>
              ))
            } 
            </List>
           </Content>
          <Button block bordered dark style={styles.loadMoreBtn} onPress={()=> this.loadMore(this.state.data.next)} title="Load More" disabled={this.state.data.next == null}>
            <Text>Load More</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }
}

export default Films;
const FILM_BASE_URL = 'https://swapi.co/api/films';
const styles = StyleSheet.create ({
  parent:{},
  item: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     borderColor: '#2a4944',
     backgroundColor: 'powderblue',
     flex:1,
    },
    search : {
      borderColor: '#2a4944',
      borderWidth: 1,
      height: 35,
      margin: 15,
      padding: 5
    },
    loadMoreBtn : {
      margin: 15
    }
})
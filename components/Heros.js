import React, { Component } from 'react';
import HttpService from '../common/service/HttpService';
import {Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {View, ScrollView, StyleSheet, TextInput, ActivityIndicator} from 'react-native';

class Heros extends Component {
  static navigationOptions = { header: null }

  state = { data: {results: []}, isLoading: true}

  componentDidMount(){
    this.loadData(false);
  }

  loadMore(url){
    this.loadData(true, url)
  };

  search(searchString){
    this.loadData(false, HERO_BASE_URL+'?search='+searchString);
  }

  loadData(loadMore, url = HERO_BASE_URL){
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

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 3, padding: 20, top:100}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
    <Container>
        <Header>
          <Left>
            <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}}></Icon>
          </Left>
          <Body>
            <Title>Heros</Title>
          </Body>
          <Right/>
        </Header>
        <ScrollView style={styles.parent}>
          <TextInput style={styles.search} clearButtonMode="always" placeholder="Search by name." onChangeText={(text) => this.search(text)} />
           <Content>
            <List>
            {
              this.state.data.results.map((hero, index) => (
                <ListItem avatar key={index} onPress={()=>this.props.navigation.navigate("Details",{
                  hero:hero
                })}>
                  <Left>
                    <Thumbnail source = {require('../images/sw.jpeg')} />
                  </Left>
                  <Body>
                    <Text>{hero.name}</Text>
                    <Text note numberOfLines={index}>{hero.gender}</Text>
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
export default Heros

const HERO_BASE_URL = 'https://swapi.co/api/people';
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
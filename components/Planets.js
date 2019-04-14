import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import HttpService from '../common/service/HttpService';
import {Container, Header,Title, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Image} from 'native-base';

class Planets extends Component {  
  static navigationOptions = {
    drawerLabel: 'Planets',
    drawerIcon: ({ tintColor }) => (
      <Icon name='person' style={{fontSize:24, color:tintColor}} />
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
    this.loadData(false, PLANET_BASE_URL+'?search='+searchString);
  }

  loadData(loadMore, url = PLANET_BASE_URL){
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
    return (
      <Container>
         <Header>
          <Left>
            <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}}></Icon>
          </Left>
          <Body>
            <Title>Planets</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          {
              this.state.data.results.map((planet, index) => (
              <Card key={index}>
                <CardItem onPress={()=>this.props.navigation.navigate("Details")}>
                  <Left>
                    <Thumbnail source={require('../images/sw.jpeg')} />
                    <Body>
                      <Text>{planet.name}</Text>
                      <Text note>{planet.terrain}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  {/* <Image source= {require('../images/sw.jpeg')} style={{height: 200, width: null, flex: 1}}/> */}
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Text>{planet.climate}</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Text>{planet.gravity}</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>{planet.population}</Text>
                  </Right>
                </CardItem>
              </Card>
          ))
        } 
        </Content>
      </Container>
    );
  }
}

export default Planets
const PLANET_BASE_URL = 'https://swapi.co/api/planets';
const styles = StyleSheet.create ({parent:{padding:10}});
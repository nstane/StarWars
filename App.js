
import Heros from './components/Heros';
import Details from './components/Details';
import Planets from './components/Planets';
import Films from './components/Films';
import React, { Component } from 'react';
import {View,SafeAreaView, ScrollView, Dimensions, Image} from 'react-native';
import {createAppContainer, createDrawerNavigator, createStackNavigator, DrawerItems} from 'react-navigation';

const AppDrawerComponent = (props) => {
  return (
  <SafeAreaView>
    <View style={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
      <Image source = {require('./images/sw.jpeg')} style={{height:120, width:100, borderRadius:10}}></Image>
    </View>
    <ScrollView>
      <DrawerItems {...props}></DrawerItems>
    </ScrollView>
  </SafeAreaView>
  );
}

const HeroStackNavigator = createStackNavigator({ 
    Heros: {screen: Heros},
    Details : {screen: Details}
});

const PlanetsStackNavigator = createStackNavigator({ 
    Planets: {screen: Planets},
    Details : {screen: Details}
});

const FilmsStackNavigator = createStackNavigator({ 
    Films: {screen: Films},
    Details : {screen: Details}
});

const HeroStackNavigatorApp = createAppContainer(HeroStackNavigator)

const RootDrawerNavigator = createDrawerNavigator({
  Heros: {screen: HeroStackNavigatorApp},
  Planets: {screen: Planets}, 
  Films : {screen: Films}
},{
  contentComponent: AppDrawerComponent,
  contentOptions: {
    activeTintColor: 'orange',
  }
});

const App = createAppContainer(RootDrawerNavigator);
export default App;
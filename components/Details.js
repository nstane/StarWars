import React, { Component } from 'react';
import { View, Text } from "react-native";

export default class Details extends Component
{
    render(){
        const { navigation } = this.props;
        const hero = navigation.getParam('hero');
        if(hero) {
            return(
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Name : </Text><Text>{hero.name}</Text>
                    <Text>Gender : </Text><Text>{hero.gender}</Text>
                    <Text>Birth Year : </Text><Text>{hero.birth_year}</Text>
                    <Text>Eye Color : </Text><Text>{hero.eye_color}</Text>
                    <Text>Hair Color : </Text><Text>Hair Color : {hero.hair_color}</Text>
                    <Text>Height : </Text><Text>Height : {hero.height}</Text>
                    <Text>Mass : </Text><Text>Mass : {hero.mass}</Text>
                    <Text>Skin Color : </Text><Text>Skin Color : {hero.skin_color}</Text>
                    <Text>Created : </Text><Text>Skin Color : {hero.created}</Text>
                    <Text>Edited : </Text><Text>Skin Color : {hero.edited}</Text>
                    <Text>Number of Films : </Text><Text>{hero.films.length}</Text>
                    <Text>Number of Vehicles : </Text><Text>{hero.vehicles.length}</Text>
                    <Text>Number of Starships : </Text><Text>{hero.starships.length}</Text>
                    <Text>Number of Species : </Text><Text>{hero.species.length}</Text>
                </View>
            );
        } else{
            return(
                <View><Text>No detail found.</Text></View>
            );
        }
    }
}
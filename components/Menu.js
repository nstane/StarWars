import {Header, Left, Right, Icon} from 'native-base';
import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
        <Header>
            <Left>
                <Icon name='menu' onPress={()=>{this.props.navigation.openDrawer()}}></Icon>
            </Left>
        </Header>
    )};
}

//export default Menu
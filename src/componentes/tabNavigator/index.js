import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

function TabNavigator({ NomeTab = ["Vazio"], ComponenteTab = [], props }) {

  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"

        tabBarOptions={{
          activeTintColor: 'white',
          labelStyle: { fontSize: 12 },
          pressColor: 'white',
          indicatorStyle: { color: 'white', backgroundColor: 'white' },
          style: { backgroundColor: '#000' },
        }}>

        {NomeTab.map((item, index) => {
          const ComponenteTabValue = ComponenteTab[index];
          return (
            <Tab.Screen
              name={NomeTab[index]}
              //component={ComponenteTab[index]}
              //initialParams={{ ...props }}
              children={() => <ComponenteTabValue {...props} />}
            />
          )
        })}
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;

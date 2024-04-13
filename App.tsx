import React, {useEffect} from 'react';
import {Alert, TextInput, View} from 'react-native';
import MainStack from './src/MainStack';
const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <View className="bg-red-500"  style={{flex: 1}}>
          <TextInput />
        </View> */}
      <MainStack />
    </View>
  );
};

export default App;

import 'react-native-gesture-handler';

import { FoodScreen, HomeScreen, MapScreen } from './screens';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './Redux/store';

//Platform.OS === 'ios' ? 'padding' : 'height'
export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name='FoodScreen'
                component={FoodScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
          </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

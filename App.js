import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpenseScreen from './screens/AllExpenseScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons/';
import RecentExpenseScreen from './screens/RecentExpenseScreen';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import ExpenseContextProvider from './contexts/expenseContext';


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const ExpenseOverview = ()=>{
  return(
    <BottomTab.Navigator
      screenOptions={({route,navigation})=>({
         headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
         headerTintColor:"white",
         tabBarStyle:{backgroundColor: GlobalStyles.colors.primary500},
         tabBarActiveTintColor: GlobalStyles.colors.accent500,
         headerRight:({tintColor})=><IconButton icon={'add'} size={24}
          color={tintColor} 
          onPress={()=>{
            navigation.navigate("ManageExpenses")
          }}
          />
        })}
    >
      <BottomTab.Screen 
       name='RecentExpenses'
       component={RecentExpenseScreen}
        options={{
          title:"Recent Expenses",
          tabBarLabel:"Recent",
          tabBarIcon:({color,size})=> <Ionicons name="hourglass" size={size} color={color} />
        }}
       />
      <BottomTab.Screen
       name='AllExpenses' 
       component={AllExpenseScreen}
       options={{
        title:"All Expenses",
        tabBarLabel:"All Expenses",
        tabBarIcon:({color,size})=> <Ionicons name="calendar" size={size} color={color} />
      }}
        />
    </BottomTab.Navigator>
  )
}



export default function App() {
  return (
    <ExpenseContextProvider>
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="ExpensesOverview"
       screenOptions={{
        headerTintColor:"white",
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500}
       }}
      >
        <Stack.Screen name='ExpensesOverview'
        options={{
          headerShown:false,
        }}
        component={ExpenseOverview} />
        <Stack.Screen
         name='ManageExpenses' 
         component={ManageExpenseScreen}
         options={{
          presentation:'modal',
         }}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpenseContextProvider>
    
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

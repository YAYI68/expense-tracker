import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import { DUMMY_EXPENSES } from '../data/dummy'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'





function ExpenseOutput({expenses, periodName}) {
  return (
    <View style={styles.container}>
       <ExpensesSummary expenses={expenses} periodName={periodName} />
       <ExpensesList expenses={expenses}  />
    </View>
  )
}

export default ExpenseOutput

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
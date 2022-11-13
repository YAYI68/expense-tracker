import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ExpenseOutput from '../components/ExpenseOutput'
import { useExpenseState } from '../contexts/expenseContext'


function AllExpenseScreen() {
    const { expenses} = useExpenseState()
  return (
     <ExpenseOutput expenses={expenses} periodName={"Total"} />
  )
}

export default AllExpenseScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
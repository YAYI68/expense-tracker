import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ExpenseItem from './ExpenseItem'

function ExpensesList({expenses}) {
  return (
     <View>
        <FlatList
         data={expenses}
         renderItem={(itemData)=>(
           <ExpenseItem item={itemData.item} />
         )            
         }
         keyExtractor={(item)=>item.id}
        />
     </View>
  )
}

export default ExpensesList

const styles = StyleSheet.create({

})
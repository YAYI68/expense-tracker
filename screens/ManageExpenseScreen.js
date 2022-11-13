import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ExpenseForm from '../components/ExpenseForm';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { useExpenseState } from '../contexts/expenseContext';
import { delExpense, editExpense, storeExpense } from '../db/http';

function ManageExpenseScreen({route,navigation}) {
   const [isLoading,setIsLoading] = useState(); 
   const [error,setError] = useState("");
  const {expenses, updateExpense,deleteExpense,addExpense } = useExpenseState();
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId

    useLayoutEffect(() => {
      navigation.setOptions({
        title:isEditing ? 'Edit Expenses' : 'Add Expenses',
      })
    
    }, [isEditing])

    const confirmHandler = async(expenseData)=>{
      setIsLoading(true)
      if(isEditing){
          updateExpense(expenseId,expenseData)
          const data = await editExpense(expenseId,expenseData)
          setIsLoading(false)
        }
      else{
      const id = await storeExpense(expenseData)
         setIsLoading(false)
         addExpense({...expenseData,id})    
      }
      navigation.goBack();
     }
  
  
     const cancelHandler = ()=>{
      navigation.goBack();
     }

   const deleHandler = async() => {
    setIsLoading(true);
    const data = await delExpense(expenseId)
    setIsLoading(false)
    deleteExpense(expenseId)
    navigation.goBack();
   }

   const selectedExpense = expenses.find(expense =>expense.id === expenseId)
  
   if (isLoading) {
    return(
      <LoadingOverlay />
    )
   }

 
  return (
    <View style={styles.constainer}>
         <ExpenseForm 
         submitButtonLabel={isEditing ? 'Update' : 'Add'}
         onCancel={cancelHandler} 
         onSubmit={confirmHandler}
          defaultValue = {selectedExpense}
         />
      
      {isEditing && 
      (
        <View style={styles.deleteContainer}>
            <IconButton icon={'trash'}
             color={GlobalStyles.colors.error500} size={36}
             onPress={deleHandler}
             />
        </View>
      )}
    </View>
  )
}

export default ManageExpenseScreen

const styles = StyleSheet.create({
     constainer:{
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800
     },
  
     deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems: 'center',
     }
})
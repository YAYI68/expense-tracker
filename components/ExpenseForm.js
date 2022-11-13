import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import {  Alert, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles';
import { useExpenseState } from '../contexts/expenseContext';
import { getFormatedDate } from '../utils/date';
import Input from './Input'
import CustomButton from './UI/CustomButton';

function ExpenseForm({defaultValue, submitButtonLabel,onCancel, onSubmit}) {
    const [inputs,setInputs] = useState({
        amount:{value:defaultValue ? defaultValue.amount.toString():"",isValid:true},
        date:{value:defaultValue ? getFormatedDate(defaultValue.date):"",isValid:true},
        description:{value:defaultValue ? defaultValue.description:"",isValid:true},
    });

    const inputHandler = (type, value) => {
        setInputs((currentVal)=>({...currentVal,[type]:{value,isValid:true}}))
    }

    const submitHandler = () => {
         const expenseData = {
            amount:+inputs.amount.value,
            date:new Date(inputs.date.value),
            description:inputs.description.value,
         }
        
         const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
         const dateIsValid = expenseData.date.toString() !== "Invalid Date" 
         const descriptionIsValid = expenseData.description.trim().length > 0
        
        if(!amountIsValid || dateIsValid || !descriptionIsValid){
           Alert.alert("Invalid Input","Please Check your input and try again")
            setInputs((currentInput)=>{
                return {
                    amount:{value:currentInput.amount.value, isValid:amountIsValid},
                    date:{value:currentInput.date.value, isValid:dateIsValid},
                    description:{value:currentInput.description.value, isValid:descriptionIsValid}
                }
            })
        }

         onSubmit(expenseData)
    }
    
    const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid 


  return (
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRowContainer}>
        <Input 
        style={styles.inputRow}
        invalid = {!inputs.amount.isValid}
        label={'Amount'} inputConfig={{
            KeyboardType: 'decimal-pad',
            onChangeText:inputHandler.bind(this, 'amount'),
            value:inputs.amount.value,

        }} />
        <Input 
         style={styles.inputRow}
         invalid = {!inputs.date.isValid}
        label={'Date'} inputConfig={{
            placeholder:"YYYY-MM-DD",  
            maxLength:10,
            onChangeText:inputHandler.bind(this,'date'), 
            value:inputs.date.value,      
        }} />
        </View>
        <Input 
        label={'Description'}
         invalid = {!inputs.description.isValid}
         inputConfig={{
            multiLine: true,
            onChangeText:inputHandler.bind(this,'description'), 
            value:inputs.description.value, 
            
        }} />
         {formIsInValid && <Text style={styles.errorText}>Invalid input values - Please check your entered data</Text> } 
          <View style={styles.buttonContainer}>
            <CustomButton style={styles.button} mode={"flat"} onPress={onCancel} >Cancel</CustomButton>   
            <CustomButton style={styles.button} onPress={submitHandler}>{submitButtonLabel }</CustomButton>
        </View>
      </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form:{
        marginTop:40,
        flex:1,
    },
    inputRowContainer:{
        flexDirection:'row',
        justifyContent: 'center',
    },
    inputRow:{
      flex:1,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign: 'center',
    },
    errorText:{
      textAlign: 'center',
      color:GlobalStyles.colors.error500,
      margin:8,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
     },
     button:{
      minWidth:120,
      marginHorizontal:8,
     },

})
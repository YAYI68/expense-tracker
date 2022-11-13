import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

function Input({label,style,inputConfig,invalid}) {
   
    const inputStyle = [styles.input];

    if(inputConfig && inputConfig.multiLine){
        inputStyle.push(styles.inputMultiline)
    }

  return (
    <View style={[styles.inputContainer,style]}>
        <Text style={[styles.label,invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={[inputStyle,invalid && styles.invalidInput]}  {...inputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
     inputContainer:{
        marginHorizontal:4,
        marginVertical:10,
        flex:1,
     },
     label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
     },
     input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color:GlobalStyles.colors.primary700,
     },
     inputMultiline:{
        minHeight:100,
        textAlignVertical:"top",
     },
     invalidLabel:{
      color:GlobalStyles.colors.error500
     },
     invalidInput:{
      backgroundColor:GlobalStyles.colors.error50,
     }


})
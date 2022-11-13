import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from './CustomButton'

const ErrorOverlay = ({message,onConfirm}) => {
  return (
    <View style={styles.container}>
    <Text style={[styles.text,styles.title]}>An error occured</Text>
    <Text style={styles.text}>{message}</Text>
    <CustomButton onPress={onConfirm}>Okay</CustomButton>
</View>
  )
}

export default ErrorOverlay
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:GlobalStyles.colors.primary700,
        padding:24,
    },
    text:{
        textAlign: 'center',
        marginBottom:8,
    },
    title:{
        fontSize:20,
        fontWeight: 'bold',
    },
    // message:{
    //     fontSize
    // }
})
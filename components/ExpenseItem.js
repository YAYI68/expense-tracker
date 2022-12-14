import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import { getFormatedDate } from '../utils/date'

function ExpenseItem({item}) {
    const navigation = useNavigation();

    const pressHandler = ()=>{
        navigation.navigate("ManageExpenses",{expenseId:item.id})     
    }

  return (
    <Pressable onPress={pressHandler} style={({pressed})=>pressed && styles.pressed}>
        <View style={styles.expenseItem}>
            <View>
             <Text style={[styles.textBase,styles.description]}>{item.description}</Text>
             <Text style={styles.textBase}>{getFormatedDate(item.date)}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles =  StyleSheet.create({
    pressed:{
        opacity:0.75,
    },
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:6,
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset:{width:0, height:1},
        shadowRadius:4,
        shadowOpacity:0.4,

    },
    textBase:{
        color:GlobalStyles.colors.primary50,
    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',

    },
    priceContainer:{
     paddingHorizontal:12,
     paddingVertical:4,
     backgroundColor:'white',
     justifyContent: 'center',
     borderRadius:4,
     minWidth:80,
    },
    price:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    }
})
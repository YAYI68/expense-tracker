import React, { Children, createContext, useContext, useReducer, useState } from 'react'
import { DUMMY_EXPENSES } from '../data/dummy';


const ExpenseContext= createContext();

const reducer = (state,action)=>{
    if(action.type === 'ADD'){
        // const id = new Date().toString() + Math.random().toString();
        return [action.payload,...state]
    }
    if(action.type === 'SET'){
      const inverted = action.payload.reverse();
      return inverted;
    }
    if(action.type === 'UPDATE'){
        const updateExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id) 
        const updatableExpense = state[updateExpenseIndex]   
        const updatedItem = {...updatableExpense,...action.payload.data}
        const updatedExpenses = [...state]
        updatedExpenses[updateExpenseIndex] = updatedItem;
        return updatedExpenses
    }
    if(action.type === 'DELETE'){
        return state.filter((expense)=>expense.id !== action.payload.id)   
    }

    return state
}




function ExpenseContextProvider({children}) {
     
      const[expenseState,dispatch] =  useReducer(reducer,[])

      const addExpense = (expenseData)=>{
        dispatch({type:'ADD',payload:expenseData})
      }

      const setExpense = (expenses)=>{
        dispatch({type:'SET',payload:expenses})
      }
     
      const updateExpense = (id,expenseData)=>{
        dispatch({type:'UPDATE',payload:{id,data:expenseData}})
      }

      const deleteExpense = (id)=>{
        dispatch({type:'DELETE',payload:id})
      }
    
  return (
    <ExpenseContext.Provider value={{
        expenses:expenseState,
        addExpense,
        setExpense,
        updateExpense,
        deleteExpense


    }}>
        {children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider

export const  useExpenseState = ()=> useContext(ExpenseContext);
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ExpenseOutput from '../components/ExpenseOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useExpenseState } from '../contexts/expenseContext';
import { getExpense } from '../db/http';
import { getDateMinuDays } from '../utils/date';


function RecentExpenseScreen() {
   const [isLoading,setIsLoading] = useState(true);
   const [error,setError] = useState("");
    const { expenses,setExpense} = useExpenseState()

    useEffect(()=>{
      (async()=>{
        setIsLoading(true);
        try{
          const expensesData =  await getExpense()
          setExpense(expensesData)
          console.log({expensesData})
        }
        catch(e){
          setError("Could not load data")
        }
       setIsLoading(false)
    
      })()
    },[])

    const errorHandler =()=>{
       setError(null)
    }
    
    const recentExpenses = expenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinuDays(today, 7)
        return expense.date >= date7DaysAgo && expense.date <= today
    })
    if(isLoading){
      return(
        <LoadingOverlay />
      )
    }
    if (error && !isLoading) {
      return(
        <ErrorOverlay message={error} onConfirm={errorHandler} />
      )
    }

  return (
       <ExpenseOutput expenses={recentExpenses} periodName={"Last 7 Days"} />
  )
}

export default RecentExpenseScreen
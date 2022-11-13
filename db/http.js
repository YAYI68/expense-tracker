import axios from 'axios';

const url = "https://expense-tracker-2c17d-default-rtdb.firebaseio.com";

export const  storeExpense = async(expenseData)=>{

    try{
     const {data} = await axios.post(url + "/expense.json",expenseData)
       const id = data.name;
       return id;
    }
    catch(error){

    }
}

export const getExpense = async()=>{
      try{
       const {data} = await axios.get(url + "/expense.json")
       expenses = []
       for (const key in data) {
        const expenseObj ={
         id:key,
         amount:data[key].amount,
         date:new Date(data[key].date),
         description:data[key].description
        }
        expenses.push(expenseObj)   
       }
       return expenses;
      }
      catch(error){

      }
}

export const editExpense = async(id,expenseData)=>{
    try{
       const {data} = await axios.put(url + `/expense/${id}.json`,expenseData);
      return data;
    }
    catch(error){

    }    
}

export const delExpense = async(id)=>{
   return  await axios.delete(url + `/expense/${id}.json`);
}
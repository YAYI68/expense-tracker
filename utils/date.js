

export const getFormatedDate=(date)=>{
    // return `${date.getFullYear()+1}-${date.getMonth()}-${date.getDate()}`
    return date.toISOString().slice(0,10)
}

export const getDateMinuDays = (date, days)=>{
   return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days) 
}
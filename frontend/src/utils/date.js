export function toISODateString(date){
    return date.toISOString().substring(0,10);
} 

export function toDateObject(date){
    return new Date(date);
}
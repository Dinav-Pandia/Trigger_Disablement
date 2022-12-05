console.log("NODE");

const res=require('./Response from web activity.json')
// console.log(JSON.parse(res))
var val = res["value"]
var fir 

console.log(typeof(val[0].properties.activities))
console.log(((val[0].hasOwnProperty('properties'))&&val[0].properties.hasOwnProperty('activities')))
// console.log("NODE");

const res=require('./Response from web activity.json')
// console.log(JSON.parse(res))
var val = res["value"]
var fir 
// console.log(fir.name)// res.value[0].name
// console.log(res.value[0].name)


//Recursion to traverse tree
function search(valElement,pip)//Input is array of activities
                        //pip is pipeline to be found
                        //obj is array containing activities
{
    if(valElement== null||valElement== undefined||valElement.properties==null||valElement.properties== undefined||valElement.properties.activities==null||valElement.properties.activities==undefined)
    return false;

    var obj = valElement.properties.activities    
    var res1=false;
    var res2=false;
    var res3=false;
    // var res4=false;
   
    for (var k in obj)
    {
        if(obj[k]== null||obj[k]== undefined)
        {
            //  console.log("NULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
            return false;
        }
        if(obj[k].hasOwnProperty('type') && obj[k].type=='ExecutePipeline' && obj[k].typeProperties.pipeline.referenceName==pip)
        {
            console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            // console.log("------------------------------------------------------------------------")
            console.log("Parent Pipeline: "+valElement.name)
            // console.log("------------------------------------------------------------------------")
            return true;
        }
        
        if(obj[k].hasOwnProperty('typeProperties'))
        {   if ((obj[k].typeProperties.hasOwnProperty('cases')))
            {
                //   console.log("CASESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
                var cas = obj[k].typeProperties.cases
                for (var c in cas)
                {
                    if((cas[c].hasOwnProperty('activities')))
                    res1=res1||search(cas[c].activities,pip);
                }
            }
            if ((obj[k].typeProperties.hasOwnProperty('activities')))
            {  
                // console.log("FOR EACHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
                res2=res2||search(obj[k].typeProperties.activities,pip);
            }
        }
        if (((obj[k].hasOwnProperty('properties'))&&(obj[k].properties.hasOwnProperty('activities'))))
        { res3=res3||search(obj[k].properties.activities,pip);
        }
            
                    
                    
            
        
        // console.log(obj[k].name)
    }
    // if(obj[k].type=='ExecutePipeline')
    //                 console.log(obj[k].typeProperties.pipeline.referenceName)
    // console.log(obj[k].name)
    // console.log("ENDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    return (res1||res2||res3);

           
        
            
}



var pipe='PL_DATA_PROCESS_REQUEST'

function recForLoop(valfr,j) //To traverse each pipeline at val level
{   
    if(valfr==null||valfr==undefined||j>=valfr.length)
    {
        return;
    }
    // console.log("------------------------------------------------------------------------")
    // console.log("Parent Pipelines: "+valfr[j].name)
    // console.log("------------------------------------------------------------------------")
    search(valfr[j],pipe)
    recForLoop(valfr,++j)
   

}

recForLoop(val,0) //equals a single search
console.log(val.length)
/* One recursion for for loop to call recursion on each element of array
Other recursion for traversing children/hierarchy
One global parameter to store value of highest parent pipeline. Will be updated whenever if(name==pip)condition is true
stop condn will be end of array length, i 
rec(val,i,GParent)
//GParent is the highest parent pipeline name(Global)
//Stop condn when 1st rec returns false then return Global Param
if(true)New recursion call - pipe=GParent. rec(val,pipe)
else return (false)
in the end Print GParent

//One Hashmap (PipelineName->Boolean)
Every search call should return an array coz CIF_LOG(common childs) will have multiple parents

// for(x in fir)
// {
//     console.log(x.id +" -------------------------")
// }

// const res = JSON.parse(xhr.responseText);

// Object.entries(res).forEach((entry) => {
//     const [key, value] = entry;
//     console.log(`${key}: ${value}`);
//   });



// for (const key in res){
//   if(obj.hasOwnProperty(key)){
//     console.log(`${key} : ${res[key]}`)
//   }
// }
*/
console.log("NODE");

const res=require('./Response from web activity.json')
// console.log(JSON.parse(res))
var val = res["value"]
var fir 
// console.log(fir.name)// res.value[0].name
// console.log(res.value[0].name)

// for(x in val)
// {
//     console.log(x.name)
// }

// for(i=0;i<val.length;i++)
// {
//     console.log("------------------------------------------------------------------------")
//     console.log("Parent Pipeline: "+val[i].name)
//     console.log("------------------------------------------------------------------------")
//     fir = val[i] // First Parent Pipeline
//     act = fir.properties.activities// Array of activities(SP/Metadata/Child Pipeline etc)
//     for(j=0;j<act.length;j++)
//     {
//         if(act[j].type=='ExecutePipeline')
//         {// typeProperties.pipeline.referenceName
//         console.log("       "+act[j].typeProperties.pipeline.referenceName+" Child of "+val[i].name)
//         // console.log("       "+act[j].name+" is a "+act[j].type)  // Individual activities(SP/Metadata/Child Pipeline etc)
//         }
//     }

    
// }

function eachRecursive(obj)//Input is array of activities
{
    for (var k in obj)
    {
        if(obj[k]!== null && typeof obj[k] == "object")
        {  
            if(obj[k].hasOwnProperty('typeProperties'))
            {   if ((obj[k].typeProperties.hasOwnProperty('cases')))//Switch Actiivity
                { 
                    //  console.log("CASESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
                    var cas = obj[k].typeProperties.cases
                    for (var c in cas)
                    {
                        if((cas[c].hasOwnProperty('activities')))
                        eachRecursive(cas[c].activities);
                    }
                }
                if ((obj[k].typeProperties.hasOwnProperty('activities')))//For Each
                { 
                    //  console.log("FOR EACHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
                    eachRecursive(obj[k].typeProperties.activities);
                }
            }
                if (((obj[k].hasOwnProperty('properties'))&&(obj[k].properties.hasOwnProperty('activities'))))
                { eachRecursive(obj[k].properties.activities);
                }
                
                    
                    
            
        }
        if(obj[k].type=='ExecutePipeline')//Filtering Pipelines
                    console.log(obj[k].typeProperties.pipeline.referenceName)
        // console.log(obj[k].name)
    }

           
        
            
}
for(i=0;i<val.length;i++)
{
    console.log("------------------------------------------------------------------------")
    console.log("Parent Pipeline: "+val[i].name)
    console.log("------------------------------------------------------------------------")
    eachRecursive(val[i].properties.activities);
}

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



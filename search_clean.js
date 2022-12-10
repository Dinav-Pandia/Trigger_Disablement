// console.log("NODE");

const res=require('./Response from web activity.json')
// console.log(JSON.parse(res))
var val = res["value"] //Contains Array of Pipeline definition from JSON



//Recursion to traverse tree
function searchOnPip(valElement,findPip)//Input is array of activities
                        //findPip is pipeline to be found
                        //valElement is array containing activities NOT Pipelines. ie Individual Pipeline
                        //Output is Array of Parent Pipelines
{

    var res1=[]; // When found
    var res2=[];
    var res3=[];
    var res4=[];
    var result=[];
    if(valElement== null||valElement== undefined||valElement.properties==null||valElement.properties== undefined||valElement.properties.activities==null||valElement.properties.activities==undefined)
    return [];

    var obj = valElement.properties.activities    
    // var res4=false;
   
    for (var k in obj)
    {
        //NULL CASE -- No Children 
        if(obj[k]== null||obj[k]== undefined)
        {
            //  console.log("NULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
            return [];
        }
        // Pipeline Found
        if(obj[k].hasOwnProperty('type') && obj[k].type=='ExecutePipeline' && obj[k].typeProperties.pipeline.referenceName==findPip)
        {
            console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            // console.log("------------------------------------------------------------------------")
            console.log("Parent Pipeline: "+valElement.name)
            // console.log("------------------------------------------------------------------------")
            res1.push(valElement.name)
            return(res1);
        }
        // ForEach and Switch Case - Different call
        if(obj[k].hasOwnProperty('typeProperties'))
        {       
            //SWITCH CASE
              if ((obj[k].typeProperties.hasOwnProperty('cases')))
            {
                var cas = obj[k].typeProperties.cases
                for (var c in cas)
                {
                    if((cas[c].hasOwnProperty('activities')))
                    res2=res2.concat(searchOnPip(cas[c].activities,findPip));
                    // arr1 = arr1.concat(arr2);
                }
            }
            //FOR EACH CASE
            if ((obj[k].typeProperties.hasOwnProperty('activities')))
            {  
                
                res3=res3.concat(searchOnPip(obj[k].typeProperties.activities,findPip));
            }
        }

        //Redundant as only one level of Child Parent in JSON. Assumes Child has Child and needs to search
        // if (((obj[k].hasOwnProperty('properties'))&&(obj[k].properties.hasOwnProperty('activities'))))
        // {
        //      res4=res4.concat(searchOnPip(obj[k].properties.activities,findPip));
        // }
        
    }
    result = result.concat(res1).concat(res2).concat(res3).concat(res4);
    return(result);

           
        
            
}

//equals a single searchOnPip
// console.log(searchOnPip(val[0],findPip))
// console.log(searchOnPip(val[1],findPip))
// var tp=[];
// tp=tp.concat(searchOnPip(val[1],findPip)).concat(searchOnPip(val[0],findPip))
// console.log(tp)
// var pipe=['PL_DATA_PROCESS_REQUEST']

function recForLoop(val,j,findPip) //To traverse each pipeline at val level and then make a horizontal search
{   var result_loop=[];
    var arr_res_vert = [];
    var arr_res_hor = [];
    if(val==null||val==undefined||j>=val.length)
    {
        return [];
    }
    // console.log("------------------------------------------------------------------------")
    // console.log("Parent Pipelines: "+val[j].name)
    // console.log("------------------------------------------------------------------------")
    arr_res_vert=arr_res_vert.concat(searchOnPip(val[j],findPip)); //searchOnPip work
    arr_res_hor = arr_res_hor.concat(recForLoop(val,++j,findPip)); //Next Pipeline in val
    result_loop = result_loop.concat(arr_res_hor).concat(arr_res_vert);
    return(result_loop);
   

}

var temp=[];
// var findPip='PL_DATA_PROCESS_REQUEST_ENRICH'
console.log('first_global_search')
var findPip='PL_CIF_LOG'
var first_global_search = (recForLoop(val,0,findPip))// One Global Search. So if you give j=0 it's a single global search
console.log(first_global_search)
console.log(first_global_search.length)

// To make a g
for(var k in first_global_search)
{
    console.log(k+"th run")
    temp=temp.concat(recForLoop(val,0,first_global_search[k]));
}
console.log(temp)

// function recSearchtillGF(val,i,findPip,retPip)
// {
//     var res1 = recForLoop(val,0,)
//     for(var x in   )
//     if(recForLoop(val,0,findPip)==[])
//     {
//         return [];
//     }
//     return(recSearchtillGF(val,i,))
// }

// function global_search()
// {}


// console.log(val.length)
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
Every searchOnPip call should return an array coz CIF_LOG(common childs) will have multiple parents

*/
// console.log("NODE");

const res=require('./Response from web activity.json')
// console.log(JSON.parse(res))
var val = res["value"]
var fir 
// console.log(fir.name)// res.value[0].name
// console.log(res.value[0].name)


//Recursion to traverse tree
function search(valElement,retPip)//Input is array of activities
                        //pip is pipeline to be found
                        //obj is array containing activities
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
        if(obj[k]== null||obj[k]== undefined)
        {
            //  console.log("NULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
            return [];
        }
        if(obj[k].hasOwnProperty('type') && obj[k].type=='ExecutePipeline' && obj[k].typeProperties.pipeline.referenceName==retPip)
        {
            console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            // console.log("------------------------------------------------------------------------")
            console.log("Parent Pipeline: "+valElement.name)
            // console.log("------------------------------------------------------------------------")
            res1.push(valElement.name)
            return(res1);
        }
        
        if(obj[k].hasOwnProperty('typeProperties'))
        {   if ((obj[k].typeProperties.hasOwnProperty('cases')))
            {
                //   console.log("CASESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
                var cas = obj[k].typeProperties.cases
                for (var c in cas)
                {
                    if((cas[c].hasOwnProperty('activities')))
                    res2=res2.concat(search(cas[c].activities,retPip));
                    // arr1 = arr1.concat(arr2);
                }
            }
            if ((obj[k].typeProperties.hasOwnProperty('activities')))
            {  
                // console.log("FOR EACHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
                res3=res3.concat(search(obj[k].typeProperties.activities,retPip));
            }
        }
        if (((obj[k].hasOwnProperty('properties'))&&(obj[k].properties.hasOwnProperty('activities'))))
        {
             res4=res4.concat(search(obj[k].properties.activities,retPip));
        }
            
                    
                    
            
        
        // console.log(obj[k].name)
    }
    // if(obj[k].type=='ExecutePipeline')
    //                 console.log(obj[k].typeProperties.pipeline.referenceName)
    // console.log(obj[k].name)
    // console.log("ENDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    result = result.concat(res1).concat(res2).concat(res3).concat(res4);
    return(result);

           
        
            
}


var temp=[];
// var retPip='PL_DATA_PROCESS_REQUEST_ENRICH'
var retPip='PL_CIF_LOG'
var first_global_search = (recForLoop(val,0,retPip))// One Global Search
console.log(first_global_search)
console.log(first_global_search.length)
for(var k in first_global_search)
{
    console.log(k+"th run")
    temp=temp.concat(recForLoop(val,0,first_global_search[k]));
}
console.log(temp)

function recSearchtillGF(val,i,retPip)
{
    if(recForLoop(val,0,retPip)==[])
    {
        return [];
    }
    return(recSearchtillGF(val,i,))
}

function global_search()

//equals a single search
// console.log(search(val[0],retPip))
// console.log(search(val[1],retPip))
// var tp=[];
// tp=tp.concat(search(val[1],retPip)).concat(search(val[0],retPip))
// console.log(tp)
// var pipe=['PL_DATA_PROCESS_REQUEST']

function recForLoop(valfr,j,retPip) //To traverse each pipeline at val level
{   var result_loop=[];
    var arr_res_vert = [];
    var arr_res_hor = [];
    if(valfr==null||valfr==undefined||j>=valfr.length)
    {
        return [];
    }
    // console.log("------------------------------------------------------------------------")
    // console.log("Parent Pipelines: "+valfr[j].name)
    // console.log("------------------------------------------------------------------------")
    arr_res_vert=arr_res_vert.concat(search(valfr[j],retPip)); //search work
    arr_res_hor = arr_res_hor.concat(recForLoop(valfr,++j,retPip));
    result_loop = result_loop.concat(arr_res_hor).concat(arr_res_vert);
    return(result_loop);
   

}


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

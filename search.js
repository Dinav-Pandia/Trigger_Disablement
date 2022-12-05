// console.log("NODE");

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

//Recursion to traverse tree
function search(obj,pip)//Input is array of activities
                        //pip is pipeline to be found
                        //obj is array containing activities
{
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
            // console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
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

const GFPips = new Map([
    ["PL_DATA_CATALOGUE_ADLS_SQL_SCRAPE",1],["PL_DATA_COPY_BACK_REQUEST_PROCESSOR",1],["PL_DATA_COPY_FILES_ENRICH_DELTA_TMS",1],["PL_CLUSTER_AUTOMATION",1],["PL_DATA_FBL3N_REUSABLE_TRIGER",1],["PL_DATA_PROCESS_REQUEST_ITEMS_API_DELTALAKE",1],["PL_DATA_PROCESS_REQUEST_ITEMS_BLOB_DELTALAKE",1],["PL_DATA_PROCESS_REQUEST_ITEMS_BW_FULLOAD",1],["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_ORACLE_GPC",1],["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SQL",1],["PL_DATA_PROCESS_REQUEST_ITEMS_REG_INTERVAL_PV",1],["PL_DATA_PROCESS_REQUEST_ITEMS_SHARED_DRIVE_FULLLOAD",1],["PL_DATA_PROCESS_REQUEST_ITEMS_WEEKLY_OTIF",1],["PL_TEST_AUTOMATION",1],["PL_DATA_CATALOGUE_ADLS_SQL_SCRAPE",1],["PL_DATA_COPY_BACK_REQUEST_PROCESSOR",1],["PL_DATA_COPY_FILES_ENRICH_DELTA_TMS",1],["PL_CLUSTER_AUTOMATION",2],["PL_DATA_FBL3N_REUSABLE_TRIGER",2],["PL_DATA_PROCESS_REQUEST_ITEMS_API_DELTALAKE",2],["PL_DATA_PROCESS_REQUEST_ITEMS_BLOB_DELTALAKE",2],["PL_DATA_PROCESS_REQUEST_ITEMS_BW_FULLOAD",2],["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_ORACLE_GPC",3],["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SQL",3],["PL_DATA_PROCESS_REQUEST_ITEMS_REG_INTERVAL_PV",3],["PL_DATA_PROCESS_REQUEST_ITEMS_SHARED_DRIVE_FULLLOAD",3],["PL_DATA_PROCESS_REQUEST_ITEMS_WEEKLY_OTIF",3],["PL_TEST_AUTOMATION",3],["PL_DATA_CATALOGUE_ADLS_SQL_SCRAPE",4],["PL_DATA_COPY_BACK_REQUEST_PROCESSOR",4],["PL_DATA_COPY_FILES_ENRICH_DELTA_TMS",4],["PL_CLUSTER_AUTOMATION",5],["PL_DATA_FBL3N_REUSABLE_TRIGER",5],["PL_DATA_PROCESS_REQUEST_ITEMS_API_DELTALAKE",7],["PL_DATA_PROCESS_REQUEST_ITEMS_BLOB_DELTALAKE",11],["PL_DATA_PROCESS_REQUEST_ITEMS_BW_FULLOAD",16],["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_ORACLE_GPC",41]
  ]);

function secondRec(pipArray)
{
    if(GFPips.has(retPip))
    {
        console.log("GF Pipeline is:"+retPip)
        return;
    }

    var pipe='PL_DATA_PROCESS_REQUEST'
    console.log("Pipeline to be searched: "+pipe)
    for(i=0;i<val.length;i++)
    {


        if(search(val[i].properties.activities,pipe))
        {
            var parents = [];
            array.push(parents[i].name);
            console.log("------------------------------------------------------------------------")
            console.log("Parent Pipeline: "+val[i].name)
            console.log("------------------------------------------------------------------------")
        }
    }
}


var pipe='PL_DATA_PROCESS_REQUEST'
console.log("Pipeline to be searched: "+pipe)
for(i=0;i<val.length;i++)
{


    if(search(val[i].properties.activities,pipe))
    {
        // var parents = [];
        // array.push(parents[i].name);
        console.log("------------------------------------------------------------------------")
        console.log("Parent Pipeline: "+val[i].name)
        console.log("------------------------------------------------------------------------")
    }
}
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
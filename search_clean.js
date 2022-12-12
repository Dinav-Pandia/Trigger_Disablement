
//GLOBAL Variables:
const res=require('./Response from web activity.json')
var val = res["value"] //Contains Array of Pipeline definition from JSON
// var findPip=['PL_CIF_LOG'];
// var findPip=['PL_DATA_ENRICH_MERGE'];
var findPip=['PL_DATA_PROCESS_REQUEST_ENRICH']

// var findPip=['PL_DATA_VALIDATION','PL_DATA_PROCESS_REQUEST_ENRICH']
// var findPip=['PL_DATA_VALIDATION'];
search_for_all(findPip);

// for(l=0;l<val.length;l++)
// {
//     console.log("GrandFathers for "+val[l].name+" are:");
//     search_for_all(val[l].name);
// }



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
    if(valElement== null||valElement== undefined||valElement.properties==null||valElement.properties== undefined||valElement.properties.activities==null||valElement.properties.activities==undefined||findPip==null||findPip==undefined||findPip==[])
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
        if(obj[k].hasOwnProperty('type') && obj[k].type=='ExecutePipeline' && (findPip.indexOf(obj[k].typeProperties.pipeline.referenceName)>=0))
        {
            // console.log("FOUNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            // console.log("------------------------------------------------------------------------")
            // console.log("Parent Pipeline: "+valElement.name)
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

// function recSearchArrEle(val,j,findPip,i) //Single Global Search for all array elements
// {
//     var res_from_gs =[];
//     var res_from_next_ele=[];
//     var result = [];
//     if(findPip==null||findPip==undefined||findPip==[]||i>=findPip.length)
//     {
//         return[];
//     }
   
//     res_from_gs = recForLoop(val,0,findPip); // individual arr element search call
//      ++i;
//      res_from_next_ele= recSearchArrEle(val,j,findPip[i],i);
//     result= result.concat(res_from_gs).concat(res_from_next_ele);
//     // return(recSearchArrEle(val,j,findPip[i],i))
//     // console.log(res_from_gs);
//     return(result);
//     // return(recSearchArrEle(val,j,res_from_gs,i))
// }


// function recSearchtillGF(val,j,findPip,count)
// {
//     var globalSearchforallArr =[];
//     var res_from_gs=[];
//     var kthGlobalSearch=[];
//     if(count<=0||findPip==null || findPip==undefined || findPip==[])
//     {
//         exit;
//     }
//     else if(count>0 && findPip!=null && findPip!=undefined && findPip!=[])
//     {
//         res_from_gs = recForLoop(val,0,findPip);
//         if(res_from_gs==[])
//         {
//             exit;
//         }
//         else{
//         // console.log("GSSEARCH:--------------------"+res_from_gs);
//         return(recSearchtillGF(val,0,res_from_gs,count--));
//         }
// }
    
// }



// var temp=[];
// var findPip=['PL_DATA_PROCESS_REQUEST_ENRICH']
// var findPip=['PL_DATA_VALIDATION','PL_DATA_PROCESS_REQUEST_ENRICH']
// var findPip=['PL_DATA_VALIDATION'];


// Manual Calls

// var res_from_gss = recForLoop(val,0,findPip);
// console.log(res_from_gss);
// var res_from_gss2= console.log(recForLoop(val,0,res_from_gss));
// console.log("var:"+res_from_gss2);
// var res_from_gss3=console.log(recForLoop(val,0,res_from_gss2));
// console.log("var:"+res_from_gss3);
// console.log(recForLoop(val,0,res_from_gss3));


// recSearchtillGF(val,j,res_from_gs)

function search_for_all(findPip)
{
    const GFPips = new Map([
        ["OTIF_SALES_ORDER_LINE_ITEM",false],
        ["PL_CLUSTER_AUTOMATION",false],
        ["PL_DATA_CATALOGUE_ADLS_SQL_SCRAPE",false],
        ["PL_DATA_COPY_FILES_ENRICH_DELTA_TMS",false],
        ["PL_DATA_ENRICH_DELETE_DELTA",false],
        ["PL_DATA_ENRICH_MERGE",false],
        ["PL_DATA_FBL3N_REUSABLE_TRIGER",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_API_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_API_DELTALAKE_SHARE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_API_FULLLOAD",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_API_ZENDESK",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_BLOB",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_BLOB_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_BW_DELETELOAD",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_BW_FULLOAD",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_ORACLE_GPC",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SALESFORCE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SALESFORCE_DELTA",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SFTP_JSON",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SP",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SQL",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_DAILY_SQL_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_HANA_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_HANA_FULLLOAD",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_MONTHLY_SFTP",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_REG_INTERVAL_PV",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_SFTP",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_SHARE_SFTP_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_SHARED_DRIVE_FULLLOAD",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_WEEKLY_ORACLE_DELTALAKE",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_WEEKLY_OTIF",false],
        ["PL_DATA_PROCESS_REQUEST_ITEMS_WEEKLY_SFTP",false],
        ["PL_DATA_REUSABLE_USECASE",false],
        ["PL_DATA_REUSABLE_USECASE_JOB_CLUSTER",false],
        ["PL_DATA_TRIGER_PIPELINE_DELTALAKE",false],
        ["PL_DATA_Write_Back_HANA",false],
        ["PL_DELETE_OLD_LANDING_FILES",false],
        ["PL_TEST_AUTOMATION_V2",false],
        ["Refresh Schema Objects",false]
        ]);
    // console.log("WHILE++++++++++++++++++++++++++++++++++++++++"+GFPips.size); 
    var tempRet = findPip;
    while(tempRet.length)
    {
        // console.log("Array is:"+tempRet);
        for(i=0;i<tempRet.length;i++)
        {
            var ele = tempRet[i];
            // console.log(typeof(ele));
            // console.log("ARRAY ELE:"+ele);
            // console.log("Array::"+tempRet);
            if(GFPips.has(ele))
            {
                console.log("GF Found:"+ele);
                GFPips.set(ele,true);
            }

        }
        tempRet=recForLoop(val,0,tempRet);
        

    }
    // console.log(typeof())
    for (let [key, value] of GFPips)
        {
            if(value==true)
            console.log(key + " = " + value);
        }
}

// console.log('first_global_search')
// var findPip='PL_CIF_LOG'
// var first_global_search = (recForLoop(val,0,findPip))// One Global Search. So if you give j=0 it's a single global search
// console.log(first_global_search)
// console.log(first_global_search.length)

// console.log(recSearchtillGF(val,0,findPip,0))
// console.log('first_global_search')
// // console.log('OP:'+recSearchArrEle(val,0,findPip,0));
// console.log('OP:'+recSearchtillGF(val,0,findPip,3));
// while(findPip!=null && findPip!=undefined && findPip!=[])
// {
//     res_from_gs = recForLoop(val,0,findPip);
//     console.log("GSSEARCH:--------------------"+res_from_gs);
// }


// // To make a g
// for(var k in first_global_search)
// {
//     console.log(k+"th run")
//     temp=temp.concat(recForLoop(val,0,first_global_search[k]));
// }
// console.log(temp)


// function recSearchtillGF(val,j,findPip,retPip,i)
// {

//     for(var x in   )
//     if(recForLoop(val,0,findPip)==[])
//     {
//         return [];
//     }
//     return(recSearchtillGF(val,i,))
// }

// function recArrSearch(val,i,findPip)
// {
//     var res1 = recForLoop(val,0,arrPip[i])
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

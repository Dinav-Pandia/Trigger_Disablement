----------------------------------------

 PRINT @agg_result 

SELECT 
   @CodeNameString = STUFF( (SELECT ',' + ParentPipelineName 
                             FROM deployment_list 
                             FOR XML PATH('')), 
                            1, 1, ',')
PRINT @CodeNameString



--Stored Procedure to fetch list of Pipelines Planned for Deployment---



--In UAT
--Fetches 1st Join-details of pipelines planned for deployment(To be changed to 'Planned/Success/Failure'
DECLARE @CodeNameString as varchar(100);
DECLARE @agg_result as varchar(100);
DECLARE @split_result as varchar(100);
DECLARE @DS_value as varchar(100);
DECLARE @AF_value as varchar(1);
DECLARE @x as varchar(100);
DECLARE @flag1 as bit;
DECLARE @flag2 as bit;

set @flag1 = 0;
set @flag2 = 0;

if @flag1=0 set @DS_value='Active'
else set @DS_value='Deployed'



;WITH 
deployment_list
as
		(select 
			distinct(ParentPipelineName)
			--a.DeploymentStatus,
			--a.PipelineID,
			--a.DeploymentDate
		from [DATACATALOGUE].[TB_DEPLOYMENT_METADATA] as a
		join [DATACATALOGUE].[TB_PIPELINE_METADATA]as b on a.PipelineID=b.PipelineID
		where
		 DeploymentStatus = @DS_value )


SELECT
   @agg_result =  STRING_AGG(ParentPipelineName ,',') from deployment_list

--PRINT @agg_result 

---1st SP ends

--PRINT(STRING_SPLIT(@CodeNameString, ','))

--add individual entries for parent 
--distinct

--select 
--@x =

if @flag2=0 set @AF_value='N'
else set @AF_value='Y'


;WITH
ParentPipelineList
as
(
 SELECT value as ParentPipelineName
from
   STRING_SPLIT(@agg_result,',') 
)

--select * from ParentPipelineList
--print(@agg_result)

--Check if Data condition is required


----2nd SP ---- Input should be list of ParentPipeline names, Enable/Disable Flag
--2nd join where active flag is accessed and updated in Trigger Frequency table 

--select (ADFPipelineName),ActiveFlag
--from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] as a
--join deployment_list as b
--on a.ADFPipelineName=b.ParentPipelineName
select (ADFPipelineName),ActiveFlag,@AF_Value
from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] as a
join ParentPipelineList as b
on a.ADFPipelineName=b.ParentPipelineName



--Need to add cases of activate/deactivate
update [DATACATALOGUE].[TB_TRIGGER_FREQUENCY]
set ActiveFlag='@AF_Value'
from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] a join deployment_list b
on a.ADFPipelineName=b.ParentPipelineName






		 select * from deployment_list
SELECT
    PipelineID
FROM deployment_list;

select * from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY]

 

 


--To get list of related parent pipelines and enable/disable

select * from [DATACATALOGUE].[TB_PIPELINE_METADATA]

select * from [DATACATALOGUE].[TB_DEPLOYMENT_METADATA]

update [DATACATALOGUE].[TB_DEPLOYMENT_METADATA]
set DeploymentStatus='Active'
where DeploymentStatus='Planned'
--DeploymentDate = current Date
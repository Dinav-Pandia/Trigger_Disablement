Import-Module SQLServer
Import-Module Az.Accounts -MinimumVersion 2.2.0

$server = 'shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net' 
$db = 'shell-01-eun-sqdb-pfgmrnwnlueehrtocygm'
$query= 'DECLARE @PipListSQL varchar(max);
EXEC [DATACATALOGUE].[DeploymentListRetrieval]@Result_String=@PipListSQL OUTPUT;
SELECT @PipListSQL as ''resultAttribute'';
EXEC [DATACATALOGUE].[DeploymentTriggerFlagUpdate]@PipListSQL,0'
#Fetching AccessToken from Service Connection
$AccessToken = (Get-AzAccessToken -ResourceUrl https://database.windows.net).Token

#Storing Output of SQL Query
$queryOutput=Invoke-Sqlcmd -ServerInstance $server -Database $db -AccessToken $AccessToken -query $query

Write-Host "List of pipelines planned for deployment:"
$StringResult = $queryOutput.resultAttribute
Write-Host $queryOutput.resultAttribute
Write-Host "Status of Test Pipelines:"
Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query 'select ADFPipelineName,ActiveFlag from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] where ADFPipelineName in(''PL_TEST_DEPLOYMENT'',''PL_TEST_DEPLOYMENT_V2'')'

#Setting the ADO Output Variable
Write-Output "##vso[task.setvariable variable=PipelineListADO;isOutput=true;]'$StringResult'"

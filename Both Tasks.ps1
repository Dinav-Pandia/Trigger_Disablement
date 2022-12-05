--------------TASK1--------------------

Import-Module SQLServer
Import-Module Az.Accounts -MinimumVersion 2.2.0

#Fetching AccessToken from Service Connection
$AccessToken = (Get-AzAccessToken -ResourceUrl https://database.windows.net).Token

#Storing Output of SQL Query
$queryOutput=Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query 'DECLARE @result varchar(max);EXEC [DATACATALOGUE].[DeploymentListRetrieval]@Result_String=@result OUTPUT;SELECT @result as ''resultAttribute'';EXEC [DATACATALOGUE].[DeploymentTriggerFlagUpdate]@result,0'

Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query 'select ADFPipelineName,ActiveFlag from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] where ADFPipelineName in(''PL_TEST_DEPLOYMENT'',''PL_TEST_DEPLOYMENT_V2'')'

#To Convert SQL Output to String
$StringResult = $queryOutput.resultAttribute

$StringResult|Get-Member
Write-Host "query OP:"
Write-Host $queryOutput.resultAttribute
Write-Host "Setting the string"
Write-Output "##vso[task.setvariable variable=PipelineListADO;isOutput=true;]'$StringResult'"
Write-Host "OP Variable of Task:"
#Write-Host $(RefName.PipelineListADO)
#PipelineListADO|Get-Member
-------------TASK2--------------------------
Import-Module SQLServer
Import-Module Az.Accounts -MinimumVersion 2.2.0
#Fetching AccessToken from Service Connection
$AccessToken = (Get-AzAccessToken -ResourceUrl https://database.windows.net).Token
Set-Variable -Name "disParameter" -Value $(RefName.PipelineListADO)

#[string]$disParamater = $(RefName.PipelineListADO)
# Write-Host "RAW OUTPUT PipelineListADO:"
# Write-Host $(RefName.PipelineListADO)

# Write-Host $disParameter.GetType().Name
#$(RefName.PipelineListADO).GetType().Name

Write-Host "The disParameter OP"
$disParameter
# $disParameter|Get-Member
$disParameter.GetType()

Write-Host "The disParameter OP 1st Element"
$disParameter[0]

$dBPar=@(
     "param='$disParameter'"
)

Write-Host "DB Par:"
# $dBPar
# $dBPar.GetType()
# $DBParams ="param=$disParameter"
$StringArray = "MYVAR1='String1'", "MYVAR2='String2'"
# $vars = @("VAR1=$s")
# Invoke-SqlCmd -ServerInstance Server "exec MyProc @procParam=`$(VAR1)" -Variable $vars


# Write-Host $dBPar.Length #Length is 1
# Write-Host "param:"
# Write-Host "$(param)"
# Write-Host $(param).Length
# $(param) | Get-Member
# Write-Host "disParam:"
# Write-Host $disParameter.Length
# $disParameter | Get-Member
# Write-Host $DBParams[0].param
# Write-Host $DBParams
# $DBParams | Get-Member
# Write-Host $param.GetType().Name

# Write-Host "String Array"
# Write-Host $StringArray.GetType().Name



Write-Host "QUERY OP FROM NOW"
#DBParams.GetType().Name
#Storing Output of SQL Query
Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query "DECLARE @result varchar(max)=`$(param);EXEC [DATACATALOGUE].[DeploymentTriggerFlagUpdate]@result,1" -variable $dBPar
# Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query "select `$(MYVAR1)" -variable $StringArray 
# Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query "declare @v1 as varchar(MAX) =`$(param); select @v1" -variable $dBPar
# Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query 'declare @v1 as varchar(MAX) = @MYVAR1;select @v1'-variable $StringArray 
Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-pfgmrnwnlueehrtocygm -AccessToken $AccessToken -query 'select ADFPipelineName,ActiveFlag from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] where ADFPipelineName in(''PL_TEST_DEPLOYMENT'',''PL_TEST_DEPLOYMENT_V2'')'


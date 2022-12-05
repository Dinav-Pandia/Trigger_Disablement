
Import-Module SQLServer

# Note: the sample assumes that you or your DBA configured the server to accept connections using
#       that Service Principal and has granted it access to the database (in this example at least
#       the SELECT permission).


#NOT REQUIRED Connecting via Service Principal----------------------------------------
# Get-AzKeyVaultSecret -VaultName 'Contoso' -Name 'secret1' 
# Get-AzKeyVaultSecret -VaultName 'Contoso' -Name 'secret1' 


# $clientid = Get-AzKeyVaultSecret -VaultName 'Contoso' -Name 'secret1' #"enter application id that corresponds to the Service Principal" # Do not confuse with its display name
# $secret = Get-AzKeyVaultSecret -VaultName 'Contoso' -Name 'secret1'  #"enter the secret associated with the Service Principal"

# $tenantid = "db1e96a8-a3da-442a-930b-235cac24cd5c" #If Secret available then get that


# $request = Invoke-RestMethod -Method POST `
#            -Uri "https://login.microsoftonline.com/$tenantid/oauth2/token"`
#            -Body @{ resource="https://database.windows.net/"; grant_type="client_credentials"; client_id=$clientid; client_secret=$secret }`
#            -ContentType "application/x-www-form-urlencoded"
# $access_token = $request.access_token


#NOT REQUIRED Connecting via Service Principal----------------------------------------



# Now that we have the token, we use it to connect to the database 'mydb' on server 'myserver'
Invoke-Sqlcmd -ServerInstance shell-01-eun-sq-mnoovxyfcmkrfimweyyp.database.windows.net -Database shell-01-eun-sqdb-jhcqvllcboqdfzowyohg -AccessToken $access_token`
              -query 'select * from [DATACATALOGUE].[TB_SYSTEM_REQUEST]'
              -query 'DECLARE @result varchar(max)
EXEC [DATACATALOGUE].[DeploymentListRetrieval]@Result_String=@result OUTPUT
SELECT @result
EXEC [DATACATALOGUE].[DeploymentTriggerFlagUpdate]@result,'0'' # 0---> For Disabling 


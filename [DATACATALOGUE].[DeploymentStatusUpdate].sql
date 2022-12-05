/****** Object:  StoredProcedure [DATACATALOGUE].[DeploymentStatusUpdate]    Script Date: 12/2/2022 10:44:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author: dinav.pandia@shell.com
-- Create Date: 30/11/2022
-- Description: Stored Procedure to enable/disable deployment status with Pipelines given as input
-- =============================================
ALTER PROCEDURE [DATACATALOGUE].[DeploymentStatusUpdate]
(
  
  @PipelineListString varchar(jMAX), --List of Pipelines whose Status needs to be updated
  @flag			bit					--0 to set to Inactive
									--1 to set to Success
)
AS
BEGIN

	DECLARE @DepStatusValue as varchar(50); -- value of Deployment Status to be set to 
											
											

if @flag=1 set @DepStatusValue='Success'
else set @DepStatusValue='Inactive'

;WITH
ParentPipelineList
as
	(SELECT value as ParentPipelineName
	from STRING_SPLIT(@PipelineListString,',') )
update [DATACATALOGUE].[TB_DEPLOYMENT_METADATA]
set DeploymentStatus=@DepStatusValue 
from ParentPipelineList a
join [DATACATALOGUE].[TB_PIPELINE_METADATA] b
on a.ParentPipelineName=b.ParentPipelineName
join [DATACATALOGUE].[TB_DEPLOYMENT_METADATA] c
on b.PipelineID=c.PipelineID

    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
END
GO



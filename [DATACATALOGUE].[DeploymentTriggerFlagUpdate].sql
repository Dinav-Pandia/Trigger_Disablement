/****** Object:  StoredProcedure [DATACATALOGUE].[DeploymentTriggerFlagUpdate]    Script Date: 11/16/2022 11:38:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: dinav.pandia@shell.com
-- Create Date: 07/11/2022
-- Description: Stored Procedure to enable/disable list of Pipelines given as input
-- =============================================
ALTER PROCEDURE [DATACATALOGUE].[DeploymentTriggerFlagUpdate]
(
  
  @PipelineListString varchar(MAX), --List of Pipelines whose Flag needs to be updated
  @flag			bit		--0 to disable
									--1 to enable
)
AS
BEGIN

	DECLARE @ActiveFlagValue as varchar(1); -- value of Active Flag to be set to 
											-- 'Y' for Enabling the trigger
											-- 'N' for Disabling

if @flag=0 set @ActiveFlagValue='N'
else set @ActiveFlagValue='Y'

;WITH
ParentPipelineList
as
	(SELECT value as ParentPipelineName
	from STRING_SPLIT(@PipelineListString,',') )

update [DATACATALOGUE].[TB_TRIGGER_FREQUENCY]
set ActiveFlag=@ActiveFlagValue
from [DATACATALOGUE].[TB_TRIGGER_FREQUENCY] a
 join ParentPipelineList b
on a.ADFPipelineName=b.ParentPipelineName


    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
END
GO



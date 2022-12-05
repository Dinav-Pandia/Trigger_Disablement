/****** Object:  StoredProcedure [DATACATALOGUE].[DeploymentListRetrieval]    Script Date: 12/2/2022 10:43:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: dinav.pandia@shell.com
-- Create Date: 07/11/2022
-- Description: Stored Procedure to fetch list of Pipelines about to get deployed from TB_PIPELINE_METADATA and TB_DEPLOYMENT_DATA
-- =============================================
ALTER PROCEDURE [DATACATALOGUE].[DeploymentListRetrieval]

--  @flag				bit
@Result_String varchar(MAX) output

AS
BEGIN

--List of Pipelines in comma separated form as string

--			@DeployStatusValue varchar(MAX); -- Value of DeploymentStatus that needs to be filtered
											 --'Active' to fetch pipelines undergoing Deployment
											 --'Deployed' to fetch 

--if @flag1=0 set @DS_value='Active'
--else set @DS_value='Deployed'

;WITH 
Deployment_List
as
		(select 
			distinct(ParentPipelineName)
			--a.DeploymentStatus,
			--a.PipelineID,
			--a.DeploymentDate
		from [DATACATALOGUE].[TB_DEPLOYMENT_METADATA] as a
		join [DATACATALOGUE].[TB_PIPELINE_METADATA]as b on a.PipelineID=b.PipelineID
		where
		 DeploymentStatus = 'Active' ) -- Active indicates Pipeline Planned for Deployment


SELECT
   @Result_String =  STRING_AGG(ParentPipelineName ,',') from Deployment_List
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON


END
GO



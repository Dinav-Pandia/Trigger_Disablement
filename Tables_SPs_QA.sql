/****** Object:  Table [DATACATALOGUE].[TB_PIPELINE_METADATA]    Script Date: 11/21/2022 1:21:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [DATACATALOGUE].[TB_PIPELINE_METADATA](
	[PipelineID] [int] IDENTITY(1,1) NOT NULL,
	[ParentPipelineName] [varchar](450) NOT NULL,
	[ChildPipelineName] [varchar](450) NULL,
	[ADFType] [varchar](100) NULL,
	[LastUpdatedBy] [varchar](255) NULL,
	[LastUpdatedDateTime] [datetime] NULL,
 CONSTRAINT [PK_TB_PIPELINE_METADATA] PRIMARY KEY CLUSTERED 
(
	[PipelineID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [TB_PIPELINE_UQ] UNIQUE NONCLUSTERED 
(
	[ParentPipelineName] ASC,
	[ChildPipelineName] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [DATACATALOGUE].[TB_DEPLOYMENT_METADATA]    Script Date: 11/21/2022 1:22:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [DATACATALOGUE].[TB_DEPLOYMENT_METADATA](
	[DeployID] [int] IDENTITY(1,1) NOT NULL,
	[PipelineID] [int] NOT NULL,
	[DeploymentStatus] [varchar](50) NULL,
	[DeploymentDate] [date] NULL,
	[LastUpdatedBy] [varchar](255) NULL,
	[LastUpdatedDateTime] [datetime] NULL,
 CONSTRAINT [PK_TB_DEPLOYMENT_METADATA] PRIMARY KEY CLUSTERED 
(
	[DeployID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [DATACATALOGUE].[TB_DEPLOYMENT_METADATA]  WITH CHECK ADD  CONSTRAINT [FK_TB_DEPLOYMENT_METADATA_TB_PIPELINE_METADATA] FOREIGN KEY([PipelineID])
REFERENCES [DATACATALOGUE].[TB_PIPELINE_METADATA] ([PipelineID])
GO

ALTER TABLE [DATACATALOGUE].[TB_DEPLOYMENT_METADATA] CHECK CONSTRAINT [FK_TB_DEPLOYMENT_METADATA_TB_PIPELINE_METADATA]
GO

/****** Object:  StoredProcedure [DATACATALOGUE].[DeploymentListRetrieval]    Script Date: 11/21/2022 1:23:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: dinav.pandia@shell.com
-- Create Date: 07/11/2022
-- Description: Stored Procedure to fetch list of Pipelines about to get deployed from TB_PIPELINE_METADATA and TB_DEPLOYMENT_DATA
-- =============================================
CREATE PROCEDURE [DATACATALOGUE].[DeploymentListRetrieval]

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

/****** Object:  StoredProcedure [DATACATALOGUE].[DeploymentTriggerFlagUpdate]    Script Date: 11/21/2022 1:24:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: dinav.pandia@shell.com
-- Create Date: 07/11/2022
-- Description: Stored Procedure to enable/disable list of Pipelines given as input
-- =============================================
CREATE PROCEDURE [DATACATALOGUE].[DeploymentTriggerFlagUpdate]
(
  
  @PipelineListString varchar(MAX), --List of Pipelines whose Flag needs to be updated
  @flag			bit					--0 to disable
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



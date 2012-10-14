SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IntTable]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[IntTable](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
 CONSTRAINT [PK_Table1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[parents]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[parents](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[child_parent_relation]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[child_parent_relation](
	[childid] [int] NOT NULL,
	[parentid] [int] NOT NULL
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[children]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[children](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
 CONSTRAINT [PK_children] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GuidTable]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[GuidTable](
	[id] [uniqueidentifier] NULL CONSTRAINT [DF_Table2_id]  DEFAULT (newid()),
	[IntTableId] [int] NULL,
	[name] [nvarchar](50) NULL
) ON [PRIMARY]
END

CREATE TABLE [dbo].[Technique](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NULL,
	[model] [nvarchar](250) NULL,
	[number] [int] NULL,
	[amount] [int] NULL,
	[status] [tinyint] NULL,
	[notation] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
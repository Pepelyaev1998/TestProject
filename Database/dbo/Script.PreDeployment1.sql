/*
 Pre-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be executed before the build script.	
 Use SQLCMD syntax to include a file in the pre-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the pre-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

INSERT INTO [dbo].[User] (Email,Password,Password_salt)
Values('i.pepel@itran.com','F8EF44FAA9BF23EF96331DA87F168CB771DB6F92E1A4D1D75E7C3C0DBEBA15B9','43e7ce81e87e4c86ac6ba3da8d6e0279')
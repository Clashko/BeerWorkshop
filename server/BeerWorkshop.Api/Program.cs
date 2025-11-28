using BeerWorkshop.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureServices(builder.Configuration);

var app = builder.Build();

app.ConfigureApp();

app.MigrateDatabase();

app.Run();
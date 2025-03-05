using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<AppDbContext>(provider =>
    new AppDbContext(provider.GetRequiredService<IConfiguration>()));

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5053);
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

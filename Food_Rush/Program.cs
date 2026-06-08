using Food_Rush.Pedidos.Domain.Interfaces.IRepositories;
using Food_Rush.Pedidos.Domain.Interfaces.IServices;
using Food_Rush.Pedidos.Repositories;
using Food_Rush.Pedidos.Services;
using Food_Rush.Pedidos.UseCases;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;
using Food_Rush.Restaurantes.Domain.Interfaces.IServices;
using Food_Rush.Restaurantes.Repositories;
using Food_Rush.Restaurantes.Services;
using Food_Rush.Restaurantes.UseCases;
using Food_Rush.Shared.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Banco de dados, lendo a string de conexão do appsettings.json

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


//Cors, permitindo que o frontend acesse a API

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // Aqui você pode colocar a URL do seu frontend, ou usar "*" para permitir todas as origens (não recomendado para produção)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registro dos repositórios para injeção de dependência
builder.Services.AddScoped<IRestauranteRepository, RestauranteRepository>();
builder.Services.AddScoped<IPedidoRepository, PedidoRepository>();

// Registro dos serviços para injeção de dependência
builder.Services.AddScoped<IRestauranteService, RestauranteService>();
builder.Services.AddScoped<IPedidoService, PedidoService>();

// Registro dos UseCases para injeção de dependência
builder.Services.AddScoped<CriarRestauranteUseCase>();
builder.Services.AddScoped<CriarItemCardapioUseCase>();
builder.Services.AddScoped<CriarPedidoUseCase>();

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
    });
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Cria o banco de dados se ele não existir, garantindo que a aplicação tenha um ambiente de dados para funcionar corretamente.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

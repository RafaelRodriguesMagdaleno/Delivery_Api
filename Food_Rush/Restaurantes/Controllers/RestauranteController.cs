using Food_Rush.Restaurantes.Domain.Interfaces.IServices;
using Food_Rush.Restaurantes.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Food_Rush.Restaurantes.Controllers
{
    //Controller resposável pelos endpoints de restaurantes
    [ApiController]
    [Route("api/restaurantes")]
    public class RestauranteController : ControllerBase
    {
        private readonly IRestauranteService _service;

        //O serviço é injetado pelo sistema de injeção de dependência
        public RestauranteController(IRestauranteService service)
        {
            _service = service;
        }

        //GET: api/restaurantes
        //Busca todos os restaurantes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var restaurantes = await _service.GetAllAsync();
            return Ok(restaurantes);
        }

        //GET : api/restaurantes/1
        //Busca um restaurante pelo Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var restaurante = await _service.GetByIdAsync(id);
            if (restaurante == null)
                return NotFound("Restaurante não encontrado");
            return Ok(restaurante);
        }

        //POST: api/restaurantes
        //Cria um novo restaurante
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarRestauranteDTO dto)
        {
            try
            {
                await _service.CreateAsync(dto);
                return Created("", "Restaurante criado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //GET: api/restaurantes/1/cardapio
        //Busca o cardápio de um restaurante
        [HttpGet("{id}/cardapio")]
        public async Task<IActionResult> GetCardapio(int id)
        {
            var cardapio = await _service.GetCardapioAsync(id);
            return Ok(cardapio);
        }

        //POST: api/restaurantes/cardapio
        //Adiciona um item ao cardápio
        [HttpPost("cardapio")]
        public async Task<IActionResult> AddItemCardapio([FromBody] CriarItemCardapioDTO dto)
        {
            try
            {
                await _service.AddItemCardapioAsync(dto);
                return Created("", "Item adicionado ao cardápio com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

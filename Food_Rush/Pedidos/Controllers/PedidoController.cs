using Food_Rush.Pedidos.Domain.Interfaces.IServices;
using Food_Rush.Pedidos.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Food_Rush.Pedidos.Controllers
{
    //Controller resposável pelos endpoints de pedidos
    [ApiController]
    [Route("api/pedidos")]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoService _service;

        //O serviço é injetado pelo sistema de injeção de dependência
        public PedidoController(IPedidoService service)
        {
            _service = service;
        }

        //GET: api/pedidos
        //Busca todos os pedidos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pedidos = await _service.GetAllAsync();
            return Ok(pedidos);
        }

        //GET: api/pedidos/1
        //Busca um pedido pelo Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var pedido = await _service.GetByIdAsync(id);
            if (pedido == null)
                return NotFound("Pedido não encontrado");
            return Ok(pedido);
        }

        //GET: api/pedidos/restaurante/1
        //Busca todos os pedidos de um restaurante
        [HttpGet("restaurante/{restauranteId}")]
        public async Task<IActionResult> GetByRestauranteId(int restauranteId)
        {
            var pedidos = await _service.GetByRestauranteIdAsync(restauranteId);
            return Ok(pedidos);
        }

        //POST: api/pedidos
        //Cria um novo pedido e retorna o pedido criado com o Id
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CriarPedidoDTO dto)
        {
            try
            {
                // Retorna o pedido criado com o Id gerado pelo banco
                var pedido = await _service.CreateAsync(dto);
                return Created("", pedido);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PATCH: api/pedidos/1/status
        //Atualiza o status de um pedido
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id)
        {
            try
            {
                await _service.UpdateStatusAsync(id);
                return Ok("Status atualizado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PATCH: api/pedidos/1/cancelar
        //Cancela um pedido
        [HttpPatch("{id}/cancelar")]
        public async Task<IActionResult> Cancel(int id)
        {
            try
            {
                await _service.CancelAsync(id);
                return Ok("Pedido cancelado com sucesso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
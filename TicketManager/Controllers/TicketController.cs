using Microsoft.AspNetCore.Mvc;

namespace TicketManager.Controllers;

[ApiController]
[Route("[controller]")]

public class TicketController : ControllerBase
{
    private readonly ILogger<TicketController> _logger;

    public TicketController(ILogger<TicketController> logger)
    {
        _logger = logger;
    }

    // CreatRoom
    [HttpPost]
    public IActionResult CreateRoom([FromBody] Room room)
    {
        return Ok();
    }

    // GetRoom
    [HttpGet]
    public IActionResult GetRoom()
    {
        return Ok();
    }

    

}
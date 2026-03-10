using LeadManagement.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace LeadManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateLead([FromBody] CreateLeadRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Console.WriteLine("Lead received:");
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(request));

            return Ok(new
            {
                message = "Lead received successfully",
                data = request
            });
        }
    }
}
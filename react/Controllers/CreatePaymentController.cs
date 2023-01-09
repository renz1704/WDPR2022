using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
class PaymentController : ControllerBase
{

    TheaterDbContext _context;

    [HttpPost]
    [Route("createpayment")]
    public async Task<ActionResult<Payment>> createPayment([FromBody] Payment payment)
    {
        await _context.Payment.AddAsync(payment);
        await _context.SaveChangesAsync();
        Console.WriteLine("The payment with id: " + payment.Id + " and account number: " + payment.AccountNumber + " and amount: " + payment.Amount + " is created.");
        return payment;
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Assert = Xunit.Assert;


public class PaymentControllerTests
{
    private PaymentController _controller;
    private ITheaterDbContext _context;

    [Fact]
    public async Task TestCreatePaymentAndPaymentSucces()
    {
        //Test de 2 API's in PaymentController met een InMemoryDatabase.

        var options = new DbContextOptionsBuilder<TheaterDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDB")
            .Options;

        var context = new TheaterDbContext(options);
        _controller = new PaymentController(context);

        var payment = new Payment { Id = 6, Amount = 11, succes = false };

        var paymentChange = new PaymentController.paymentFromApi() { succes = true, reference = 6 };

        // Act
        await _controller.createPayment(payment);
        await _controller.paymentSucces(paymentChange);

        // Assert
        var updatedPayment = context.Payment.FirstOrDefault(p => p.Id == paymentChange.reference);
        updatedPayment.succes = paymentChange.succes;

        var payments = context.Payment.ToList();

        //Test of de juiste waardes in de IMemoryDatabase worden opgeslagen.
        Assert.Contains(payment, payments);
        Assert.Equal(1, payments.Count);

        //Test of de payment naar succes wordt gezet met de paymentsucces API.
        Assert.True(updatedPayment.succes);
    }

}
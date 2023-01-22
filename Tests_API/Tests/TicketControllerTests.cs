using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Xunit;
using models.TicketDTO;
using System.Linq.Expressions;


public class TicketControllerTests
{
    private readonly TicketController _controller;

    private readonly Mock<ITheaterDbContext> _contextMock;

    public TicketControllerTests()
    {
        _contextMock = new Mock<ITheaterDbContext>();
        _controller = new TicketController(_contextMock.Object);
    }

    [Fact]
    public void Get_ShouldReturnNotFound_WhenTicketNotFound()
    {
        var mockSet = new Mock<DbSet<Ticket>>();
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.Provider).Returns(new List<Ticket>().AsQueryable().Provider);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.Expression).Returns(new List<Ticket>().AsQueryable().Expression);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.ElementType).Returns(new List<Ticket>().AsQueryable().ElementType);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.GetEnumerator()).Returns(new List<Ticket>().AsQueryable().GetEnumerator());
        _contextMock.Setup(x => x.Tickets).Returns(mockSet.Object);

        // Act
        var result = _controller.Get(1);

        // Assert
        Xunit.Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Get_ShouldReturnOk_WhenTicketFound()
    {
        // Arrange
        var ticket = new Ticket { Id = 1 };
        var mockSet = new Mock<DbSet<Ticket>>();
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.Provider).Returns(new List<Ticket> { ticket }.AsQueryable().Provider);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.Expression).Returns(new List<Ticket> { ticket }.AsQueryable().Expression);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.ElementType).Returns(new List<Ticket> { ticket }.AsQueryable().ElementType);
        mockSet.As<IQueryable<Ticket>>().Setup(m => m.GetEnumerator()).Returns(new List<Ticket> { ticket }.AsQueryable().GetEnumerator());
        _contextMock.Setup(x => x.Tickets).Returns(mockSet.Object);

        // Act
        var result = _controller.Get(1);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        Xunit.Assert.Same(ticket, okResult.Value);
    }

    // [Fact]
    // public void CreateTicket_ShouldReturnOk_WhenTicketCreatedSuccessfully()
    // {
    //     // Arrange
    //     var ticketDto = new TicketDTO { Id = 1, PerformanceId = 2, SeatId = 3, Price = 10 };
    //     var show = new Show { Id = 1 };
    //     var room = new Room { Id = 1, Show = show };
    //     var performance = new Performance { showId = show.Id, roomId = room.Id, _contextMock };
    //     var seat = new Seat { Id = 3 };

    //     var mockSet = new Mock<DbSet<Ticket>>();
    //     _contextMock.Setup(x => x.Tickets).Returns(mockSet.Object);
    //     _contextMock.Setup(x => x.Performances.FirstOrDefault(It.IsAny<Expression<Func<Performance, bool>>>())).Returns(performance);
    //     _contextMock.Setup(x => x.Seats.FirstOrDefault(It.IsAny<Expression<Func<Seat, bool>>>())).Returns(seat);

    //     // Act
    //     var result = _controller.CreateTicket(ticketDto);

    //     // Assert
    //     var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
    //     Xunit.Assert.IsType<Ticket>(okResult.Value);
    //     var ticket = (Ticket)okResult.Value;
    //     Xunit.Assert.Equal(ticketDto.Id, ticket.Id);
    //     Xunit.Assert.Equal(ticketDto.PerformanceId, ticket.Performance.Id);
    //     Xunit.Assert.Equal(ticketDto.SeatId, ticket.Seat.Id);
    //     Xunit.Assert.Equal(ticketDto.Price, ticket.Price);
    //     mockSet.Verify(x => x.Add(It.IsAny<Ticket>()), Times.Once);
    //     _contextMock.Verify(x => x.SaveChanges(), Times.Once);
    // }
}



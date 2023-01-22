using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Assert = Xunit.Assert;


public class DonationControllerTests
{
    private DonationController _donationController;
    private UserManager<IdentityUser> _userManager;
    private TheaterDbContext _context;
    
    public void Initialize()
    {
        // Deze methode voegt o.a. de usermanager en de in memory database toe

        var options = new DbContextOptionsBuilder<TheaterDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        _context = new TheaterDbContext(options);
        
        var userStore = new UserStore<IdentityUser>(_context);
        var userManager = new UserManager<IdentityUser>(userStore, null, null, null, null, null, null, null, null);
        _userManager = userManager;

        
        _donationController = new DonationController(_context, _userManager);
    }

    [Fact]
    public async Task TestDonatieListener()
    {
        //Deze methode test of de donatie vanuit de donatielistener goed wordt toegevoegd aan de database bij de juiste gebruiker.
        Initialize();
        // Arrange
        var user = new IdentityUser { UserName = "test@test.nl", Email = "test@test.nl"};
        await _userManager.CreateAsync(user);
        _context.Visitors.Add(new Visitor { IdentityUser = user });
        _context.SaveChanges();

        var donationListenerModel = new donationListener
        {
            email = "test@test.nl",
            amount = 10.00,
            naam = "TestNaam"
        };
        var donationListenerModel2 = new donationListener
        {
            email = "test@test.nl",
            amount = 15.78,
            naam = "TestNaam"
        };

        // Act
        var result = await _donationController.DonatieListener(donationListenerModel);
        var result2 = await _donationController.DonatieListener(donationListenerModel2);

        // Assert
        var visitor = _context.Visitors.Include(v => v.Donations).First(v => v.IdentityUser.UserName == user.UserName);
        Assert.True(visitor.Donations.Count == 2);
        Assert.Equal(visitor.Donations[0].amount, donationListenerModel.amount);
        Assert.Equal(visitor.Donations[1].amount, donationListenerModel2.amount);
        
    }
}

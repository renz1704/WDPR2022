
using System.Diagnostics;
using Xunit;
using Xunit.Abstractions;
using Assert = Xunit.Assert;


public class PerformanceTests
{
    
    public long TestUrlPerformance()
    {
        string url = "https://google.com"; //Deze waarde nog wijzigen wanneer de website live staat.
        int users = 5;
        
        HttpClient client = new HttpClient();
        
        Stopwatch stopwatch = new Stopwatch();
        stopwatch.Start();
        
        Parallel.For(0, users, async i =>
        {
            await client.GetAsync(url);
        });

        stopwatch.Stop();
        Console.WriteLine($"Duur: {stopwatch.ElapsedMilliseconds} ms");

        return stopwatch.ElapsedMilliseconds;
    }
    
    
    [Fact]
    public void HomePagePerformanceTest(){
            
        long result = TestUrlPerformance();

        Assert.True(result < 10000); //Deze waarde nog wijzigen naar een goede waarde.
    }
}
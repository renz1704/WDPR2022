using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;

// in the beginning of the file
using System.Net;


namespace react.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] EmailData emailData)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Theater Laak", "theaterlaak3@gmail.com"));
                message.To.Add(new MailboxAddress(emailData.toName, emailData.toEmail));
                message.Subject = emailData.subject;
                message.Body = new TextPart("plain")
                {
                    Text = emailData.text
                };

                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("theaterlaak3@gmail.com", "hhhdsapbzclzdgau");
                    client.Send(message);
                    client.Disconnect(true);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
    
    public class EmailData {
        public String toEmail { get; set; }
        public String toName { get; set; }
        public String text { get; set; }
        public String subject { get; set; }
    }
}
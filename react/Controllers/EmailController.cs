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
        public async Task<IActionResult> SendEmail(String toEmail, String toName, String text, String subject)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Theater Laak", "theaterlaak3@gmail.com"));
                message.To.Add(new MailboxAddress(toName, toEmail));
                message.Subject = subject;
                message.Body = new TextPart("plain")
                {
                    Text = text
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

}

/*public IActionResult SendEmail(string recipient, string subject, string message)
        {
            try
            {
                // Create a new MailMessage object
                MailMessage mail = new MailMessage();
                mail.To.Add(recipient);
                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = true;

                // Set the sender's email address and password
                string senderEmail = "theaterlaak3@gmail.com";
                string senderPassword = "GoedGeheimWachtwoord1!";
                mail.From = new MailAddress(senderEmail);

                // Create a new SmtpClient object and set the server and port
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(senderEmail, senderPassword);
                smtp.EnableSsl = true;

                // Send the email
                smtp.Send(mail);

                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest("Error sending email: " + ex.Message);
            }
        }*/
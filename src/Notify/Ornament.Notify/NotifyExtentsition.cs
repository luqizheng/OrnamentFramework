using System;
using Microsoft.Extensions.DependencyInjection;
using Ornament.Notify.Senders;

namespace Ornament.Notify
{
    public static class NotifyExtentsition
    {
        public static IServiceCollection MailSender(
            this IServiceCollection services,
            string server,
            string fromEmail,
            Func<EmailSender, IServiceCollection> options = null)
        {
            var emailerSender = new EmailSender(server, fromEmail);
            options?.Invoke(emailerSender);
            return services;
        }
    }
}
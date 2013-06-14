using System;
using Qi.Domain;

namespace Ornament.MemberShip
{
    public enum PasswordResetTokenState
    {
        Normal,
        Expire,
        Complete,
    }

    /// <summary>
    /// 
    /// </summary>
    public class PasswordResetToken : DomainObject<PasswordResetToken, string>
    {
        public PasswordResetToken()
        {
            CreateTime = DateTime.Now;
        }

        /// <summary>
        /// 
        /// </summary>
        public PasswordResetTokenState Status { get; private set; }

        /// <summary>
        /// Gets or sets the reset
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// 
        /// Gets or Token creating time.
        /// </summary>
        public DateTime CreateTime { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="newPassword"></param>
        public void ResetPassword(string newPassword)
        {
            User.ChangePassword(newPassword);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="expireDay"></param>
        /// <returns></returns>
        public bool IsExpire(int expireDay)
        {
            TimeSpan a = DateTime.Now - CreateTime;
            if (a.TotalDays > expireDay)
            {
                Status = PasswordResetTokenState.Expire;
                return true;
            }
            return false;
        }
    }
}
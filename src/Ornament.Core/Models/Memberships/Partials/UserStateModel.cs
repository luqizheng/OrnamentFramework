using Ornament.MemberShip;

namespace Ornament.Models.Memberships.Partials
{
    public class UserStateModel
    {
        public UserStateModel()
        {

        }
        public UserStateModel(User user)
        {
            this.IsApproved = user.IsApproved;
            this.IsLock = user.IsLockout;
        }
        /// <summary>
        /// 
        /// </summary>
        public bool? IsApproved { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public bool? IsLock { get; set; }

        public void UpdateOn(User user)
        {
            if (IsLock != null)
            {
                user.IsLockout = this.IsLock.Value;
            }
            if (IsApproved != null)
            {
                user.IsApproved = this.IsApproved.Value;
            }

        }
    }
}

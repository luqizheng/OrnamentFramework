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

        public bool IsApproved { get; set; }
        public bool IsLock { get; set; }
    }
}

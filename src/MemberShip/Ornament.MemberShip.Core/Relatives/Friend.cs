using Qi.Domain;

namespace Ornament.MemberShip.Relatives
{
    public class Friend 
    {
        public Friend()
        {
            
        }
        public Friend(User user)
        {
            this.User = user;
        }

        public User User { get; set; }
        public string Name { get; set; }
        public string Remakrs { get; set; }
    }
}
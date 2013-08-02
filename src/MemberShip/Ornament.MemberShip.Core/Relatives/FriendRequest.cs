using Ornament.MemberShip.Dao;
using Qi.Domain;

namespace Ornament.MemberShip.Relatives
{
    public class FriendRequest : DomainObject<FriendRequest, string>
    {
        protected FriendRequest()
        {
        }

        public FriendRequest(User request, User target, string msg)
        {
            RequestUser = request;
            Target = target;
            Msg = msg;
        }

        public virtual User RequestUser { get; set; }
        public virtual User Target { get; set; }
        public virtual string Msg { get; set; }


        public virtual void Accept(IFriendDao friendDao)
        {
            var friend1 = new Friend(RequestUser, Target);
            var friend2 = new Friend(Target, RequestUser);
            friendDao.SaveOrUpdate(friend1);
            friendDao.SaveOrUpdate(friend2);
        }

        public virtual void Reject(IFriendRequestDao dao)
        {
            dao.Delete(this);
        }

    }
}
using System.Collections.Generic;
using Ornament.MemberShip;

namespace Ornament.Messages.Dao
{
    public class MessageSearcher
    {
        private IList<IPerformer> _performers;


        public MessageSearcher()
        {
            PageSize = 40;
            PageIndex = 0;
        }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public ReadStatus? ReadStatus { get; set; }

        public MessageState? MessageState { get; set; }

        public User RelivateUser { get; set; }

        public IList<IPerformer> Performers
        {
            get { return _performers ?? (_performers = new List<IPerformer>()); }
        }

        public string[] TypeNames { get; set; }


        public int GetFirstResult()
        {
            return PageSize * PageIndex;
        }
    }

    public class PersonalSearcher
    {

        public PersonalSearcher(User user, MessageType messageType)
        {
            User = user;
            MessageType = messageType;
            this.ReadStatus = ReadStatus.UnRead;
        }

        public bool IncludeSubType { get; set; }
        public int PageSize { get; set; }
        public ReadStatus ReadStatus { get; set; }
        public int PageIndex { get; set; }

        public User User { get; set; }
        public MessageType MessageType { get; set; }
    }
}
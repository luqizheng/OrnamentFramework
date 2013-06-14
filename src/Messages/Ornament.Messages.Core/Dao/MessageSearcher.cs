using System;
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
        private int _pageSize;

        public PersonalSearcher(User user, MessageType messageType)
        {
            User = user;
            MessageType = messageType;
            ReadStatus = ReadStatus.UnRead;
            PageSize = 10;
            PageIndex = 0;
        }

        public bool IncludeSubType { get; set; }

        public int PageSize
        {
            get { return _pageSize; }
            set
            {
                if (value <= 0)
                    throw new ArgumentOutOfRangeException("value", "PageSize cannot be less than 0");

                _pageSize = value;
            }
        }

        public ReadStatus ReadStatus { get; set; }
        public int PageIndex { get; set; }

        public User User { get; set; }
        public MessageType MessageType { get; set; }
    }
}
using System;
using Ornament.MemberShip;

namespace Ornament.Messages.Dao
{
    public class PersonalSearcher
    {
        private int _pageSize;

        public PersonalSearcher(User user)
        {
            Owener = user;
            PageSize = 10;
            PageIndex = 0;
        }

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
        public int PageIndex { get; set; }

        public User Owener { get; set; }
        public User Relative { get; set; }
    }
}
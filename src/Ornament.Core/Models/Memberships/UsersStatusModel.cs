using System;
using System.Linq;
using Ornament.MemberShip.Dao;

namespace Ornament.Models.Memberships
{
    public class UsersStatusModel
    {
        private readonly IMemberShipFactory _daoFactory;
        private int _activeDuringTime;
        private int? _onlineUser;
        private int? _totalUsers;
        private int? _totayRegist;

        public UsersStatusModel(IMemberShipFactory daoFactory)
        {
            _daoFactory = daoFactory;
            ActiveDuringTime = 20;
        }

        /// <summary>
        ///     统计在线人数的时候，在这段时间内都被认定位活跃用户。
        /// </summary>
        public int ActiveDuringTime
        {
            get { return _activeDuringTime; }
            set
            {
                if (value <= 0)
                    throw new ArgumentOutOfRangeException("value", "ActiveDuringTime should larger than 0");
                if (value != _activeDuringTime)
                {
                    _onlineUser = null;
                }
                _activeDuringTime = value;
            }
        }

        public int TotalUsers
        {
            get
            {
                if (_totalUsers == null)
                {
                    _totalUsers = _daoFactory.CreateUserDao().Count();
                }
                return _totalUsers.Value;
            }
        }

        /// <summary>
        ///     在线人数
        /// </summary>
        public int OnlineUser
        {
            get
            {
                if (_onlineUser == null)
                {
                    _onlineUser =
                        _daoFactory.CreateUserDao()
                                   .GetActivityDateNumber(DateTime.Now.AddMinutes(ActiveDuringTime * -1));
                }
                return _onlineUser.Value;
            }
        }

        /// <summary>
        ///     在线用户和注册人数比率
        /// </summary>
        public double OnlineUserRate
        {
            get
            {
                return Convert.ToDouble(
                    Convert.ToDouble(OnlineUser) / Convert.ToDouble(TotalUsers));
            }
        }

        /// <summary>
        ///     今天注册用户
        /// </summary>
        public int TodayRegist
        {
            get
            {
                if (_totayRegist == null)
                {
                    DateTime start = DateTime.Today;
                    DateTime end = start.AddDays(1);
                    var result = _daoFactory.CreateUserDao().CountNewUser(start, end);
                    if (result.Count != 0)
                    {
                        _totayRegist = result.Values.First();
                    }
                    _totayRegist = 0;
                }
                return _totayRegist.Value;
            }
        }
        /// <summary>
        /// 注册用户所占的比率
        /// </summary>
        public double TodayRegistRate
        {
            get
            {
                return
                    Convert.ToDouble(Convert.ToDouble(TodayRegist) / Convert.ToDouble(TotalUsers));
            }
        }

    }
}
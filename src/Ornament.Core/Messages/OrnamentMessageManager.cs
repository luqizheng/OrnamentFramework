using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages
{
    public class OrnamentMessageManager
    {
        private readonly IInfoTypeDao _infoTypeDao;


        public OrnamentMessageManager(IMessageDaoFactory messageFacotry, IMemberShipFactory memberShipFactory)
        {
            if (messageFacotry == null) throw new ArgumentNullException("messageFacotry");
            InfoDaoFactory = messageFacotry;
            MemberShipFactory = memberShipFactory;
            _infoTypeDao = InfoDaoFactory.MessageTypeDao;
        }

        public IMessageDaoFactory InfoDaoFactory { get; set; }
        public IMemberShipFactory MemberShipFactory { get; private set; }

        /// <summary>
        ///     公告，权限是任何人
        /// </summary>
        public MessageType Announcement
        {
            get { return GetOrCreate(null, "Announce"); }
        }

        /// <summary>
        ///     系统
        /// </summary>
        public MessageType SystemMessageType
        {
            get { return GetOrCreate(null, "System"); }
        }

        /// <summary>
        ///     应用程序信息
        /// </summary>
        public MessageType ApplicationMessageType
        {
            get { return GetOrCreate(null, "Application"); }
        }

        /// <summary>
        ///     系统信息下的权限信息
        /// </summary>
        public MessageType MemberShipType
        {
            get { return GetOrCreate(SystemMessageType, "Membership"); }
        }

        /// <summary>
        ///     系统信息->权限信息->改变密码
        /// </summary>
        public MessageType ChangePasswordMessageType
        {
            get { return GetOrCreate(MemberShipType, "ChangePassword"); }
        }

        /// <summary>
        ///     系统信息->权限信息->注册新用户
        /// </summary>
        public MessageType RegistryUserMessageType
        {
            get { return GetOrCreate(MemberShipType, "RegistryUser"); }
        }

        public User Admin
        {
            get { return MemberShipFactory.CreateUserDao().GetByLoginId("admin"); }
        }

        public UserGroup Administrators
        {
            get
            {
                return
                    MemberShipFactory.CreateUserGroupDao().GetByName(
                        "administrators");
            }
        }

        /// <summary>
        ///     系统信息->权限信息->创建新用户
        /// </summary>
        public MessageType CreateUserMessageType
        {
            get { return GetOrCreate(MemberShipType, "CreateUser"); }
        }

        /// <summary>
        /// </summary>
        /// <param name="parent"></param>
        /// <param name="infoName"></param>
        /// <returns></returns>
        private MessageType GetOrCreate(MessageType parent, string infoName)
        {
            MessageType messageType = _infoTypeDao.Get(infoName);
            if (messageType == null)
            {
                messageType = new MessageType(infoName, parent);
                _infoTypeDao.Save(messageType);
            }
            return messageType;
        }
    }
}
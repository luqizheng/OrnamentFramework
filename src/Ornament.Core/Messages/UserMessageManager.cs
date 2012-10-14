using System;
using Ornament.MemberShip;
using Ornament.Messages.Contents;
using Ornament.Messages.Stores;

namespace Ornament.Messages
{
    public static class UserMessageManager
    {
        /// <summary>
        /// 当用户改变密码的时候发出的通知
        /// </summary>
        /// <param name="manager"></param>
        /// <param name="user"></param>
        public static void ChangePassword(this OrnamentMessageManager manager, User user)
        {
            var result = new Message(manager.Admin, manager.ChangePasswordMessageType, new MemoryStore())
                             {
                                 State = MessageState.Published,
                                 Priority = Priority.Medium
                             };
            result.AddReaders(user);
            var content = new Content
                              {
                                  Value = String.Format("change the login password.")
                              };
            result.Contents.Add("zh-CN", content);
            manager.InfoDaoFactory.InfoDao.SaveOrUpdate(result);
        }

        /// <summary>
        /// 创建User的时候发出的系统通知
        /// </summary>
        /// <param name="manager"></param>
        /// <param name="newUser"></param>
        public static void CreateUser(this OrnamentMessageManager manager, User newUser, User @operator)
        {
            var result = new Message(manager.Admin, manager.CreateUserMessageType, new MemoryStore())
            {
                State = MessageState.Published,
                Priority = Priority.Medium
            };
            result.AddReaders(manager.Administrators);
            var content = new Content
                              {
                                  Value = String.Format("create new user {0},loginid is {0} by {1}(loginid={2})", newUser.Name, newUser.LoginId, @operator.Name, @operator.LoginId)
                              };
            result.Contents.Add("", content);
            result.AddReaders(manager.MemberShipFactory.CreateUserGroupDao().GetByName("administrators"));
            manager.InfoDaoFactory.InfoDao.SaveOrUpdate(result);
        }

        /// <summary>
        /// 注册新账户的时候发出的通知
        /// </summary>
        /// <param name="manager"></param>
        /// <param name="newUser"></param>
        public static void RegistryNewUser(this OrnamentMessageManager manager, User newUser)
        {
            if (newUser == null) throw new ArgumentNullException("newUser");
            var result = new Message(manager.Admin, manager.RegistryUserMessageType, new MemoryStore());
            var content = new Content
                              {
                                  Value = String.Format("A user which loginid is {0}, registed at {1}", newUser.LoginId, newUser.CreateTime.ToString("yyyyy-MM-dd HH-mm-ss"))
                              };
            result.Contents.Add("", content);
            result.AddReaders(manager.MemberShipFactory.CreateUserGroupDao().GetByName("administrators"));
            manager.InfoDaoFactory.InfoDao.SaveOrUpdate(result);
        }
        /// <summary>
        /// 关于Account改变的信息。
        /// </summary>
        /// <param name="manager"></param>
        /// <param name="user"></param>
        /// <param name="message"></param>
        public static void AccountMessage(this OrnamentMessageManager manager, User user, string message)
        {
            var result = new Message(manager.Admin, manager.RegistryUserMessageType, new MemoryStore());
            var content = new Content
                              {
                                  Value = message
                              };
            result.Contents.Add("", content);
            result.AddReaders(user);
            manager.InfoDaoFactory.InfoDao.SaveOrUpdate(result);
        }
    }
}
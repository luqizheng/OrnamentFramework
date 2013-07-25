using Ornament.MemberShip;

namespace Ornament.Messages.Notification.Contents
{
    public class SimpleMessage : NotifyMessageBase
    {
        protected SimpleMessage(){}

        public SimpleMessage(User user)
            : base(user)
        {

        }
        /// <summary>
        /// 
        /// </summary>
        public virtual Content Content { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="language">It could be empty</param>
        /// <returns></returns>
        public override Content Show(string language)
        {
            return Content;
        }

        
    }
}
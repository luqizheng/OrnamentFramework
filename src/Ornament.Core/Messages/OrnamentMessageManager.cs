using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages
{
    public class OrnamentMessageManager
    {
        


        public OrnamentMessageManager(IMessageDaoFactory messageFacotry, IMemberShipFactory memberShipFactory)
        {
            if (messageFacotry == null) throw new ArgumentNullException("messageFacotry");
            InfoDaoFactory = messageFacotry;
            MemberShipFactory = memberShipFactory;
            
        }

        public IMessageDaoFactory InfoDaoFactory { get; set; }
        public IMemberShipFactory MemberShipFactory { get; private set; }

     
      
      
    }
}
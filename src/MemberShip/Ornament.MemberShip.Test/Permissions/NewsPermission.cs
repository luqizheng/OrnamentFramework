using System;
using System.Collections.Generic;
using System.Text;


namespace MemberShip.Test.Permissions
{
    //public class NewsPermission : TypePermission<NewsOperator>
    //{
    //    public NewsPermission(Guid id)
    //    {
    //        this.Id = id;
    //    }
    //}
    public enum NewsOperator
    {
        ReadPublish = 0, // default 
        ReadDraf = 1,
        Create = 3, // include ReadDraf,
        Publish = 5,//include ReadDraf                
        Delete = 9,//include ReadDraf
        Modify = 26  //include readDraf and delete.
    }
}

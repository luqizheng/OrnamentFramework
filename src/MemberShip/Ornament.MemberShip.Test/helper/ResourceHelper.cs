using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ornament.MemberShip.Permissions;
using MemberShip.Test.Permissions;

namespace MemberShip.Test.helper
{
    public partial class ResourceHelper
    {
        public static MockResource Foo
        {
            get
            {
                return new MockResource(Guid.NewGuid(), typeof(NewsOperator).GetType().Name)
                {
                    Name = "Foo"
                };
            }
        }
    }
    public partial class ResourceHelper
    {
        public class MockResource : Ornament.MemberShip.Permissions.ResourceInfo
        {
            public MockResource(Guid id, string operatorType)
            {
                this.Id = id;
                this.OperatorType = operatorType;
            }
            
        }
    }
}

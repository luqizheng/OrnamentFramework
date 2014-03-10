using System;
using Ornament.Contexts;
using Ornament.MemberShip;

namespace Ornament.Web.MemberShips
{
    public class MenuPermission
    {
        private readonly MemberShipContext _context;
        private readonly string _express;

        public MenuPermission(string express, MemberShipContext context)
        {
            _express = express;
            _context = context;

            string[] ary = _express.Split(':');
            if (ary.Length < 0)
                throw new FormatException("expression is not a right format, it should be [resource]:[operator]");
            Resource = ary[0];
            try
            {
                Type enmType = OrnamentContext.ResourceManager.GetOperator(ary[0]);
                OperatorValue = (Enum) Enum.Parse(enmType, ary[1], true);
            }
            catch (ArgumentException)
            {
                throw new FormatException(String.Format("{0} is not recognized in the {1}", ary[1],
                    OrnamentContext.ResourceManager.GetOperator(ary[0]).Name));
            }
        }

        private object Resource { get; set; }
        private Enum OperatorValue { get; set; }

        public bool HasRight(User user)
        {
            return _context.HasRight(user, Resource, OperatorValue);
        }
    }
}
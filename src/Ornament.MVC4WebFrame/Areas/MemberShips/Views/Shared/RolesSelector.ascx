<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Ornament.MemberShip" %>
<%@ Import Namespace="Ornament.MemberShip.Dao" %>
<%@ Import Namespace="Ornament.Web" %>
<%
    
    //style is write gloabal.css,please search RolesSelector.ascx.

    int pageSize = 40;
    IRoleDao roleDao =  OrnamentContext.DaoFactory.MemberShipFactory.CreateRoleDao();
    IOrderedQueryable<Role> roles = from role in
                                        roleDao.Roles
                                        .Skip(0 * pageSize)
                                        .Take(pageSize)
                                    orderby role.Name
                                    select role;

%>
<div>
    <div>
        <%=Resources.Basic.Name %><input id="roleNameSearch" type="text" style="width: 80px" />
        <button id="roleSearch">
            Search
        </button>
    </div>
    <ul id="roleSelector">
        <%foreach (Role role in roles)
          {%>
        <li><a id="#<%=role.Id.ToString() %>" title="<%=role.Remark %>">
            <%=role.Name %></a> </li>
        <%} %>
    </ul>
    <script type="text/javascript">
        $("#roleSearch").button({
            icons: {
                primary: 'ui-icon-search'
            },
            text: false
        })
    </script>
</div>

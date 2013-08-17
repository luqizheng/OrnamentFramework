define(function (require) {

    function Permission(name, id) {
        this.Name = name;
        this.Id = id;
        this.Remark;
        this.Resource;
        this.Operator;
    }

    Permission.prototype.hasPermission = function (iOperator) {
        if (typeof intOperator == 'string')
            iOperator = parseInt(iOperator);
        return iOperator != 0 && this.Operator >= iOperator && (this.Operator & iOperator) == iOperator;
    };
    return Permission;
})
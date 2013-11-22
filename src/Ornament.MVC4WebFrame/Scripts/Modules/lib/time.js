define(function () {
    Date.prototype.addHours = function (intHours) {
        /// <summary>
        /// 增加时间
        /// </summary>
        /// <param name="intHours"></param>
        this.setHours(this.getHours() + intHours);
    };
    
});
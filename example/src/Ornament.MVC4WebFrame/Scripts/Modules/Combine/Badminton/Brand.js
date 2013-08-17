define(function () {
    function brand(name, id) {
        this.Name = null;
        this.Id = null;
        if (name) {
            this.Name = name;
        }
        if (id) {
            this.Id = id;
        }
    }

    brand.prototype.save = function (func) {
        var url = "/Badminton/Brand/Save";
        var data = { Name: this.Name };
        if (this.Id) {
            data.Id = this.Id;
        }
        $.post(url, data, func);

    };
    return brand;
})
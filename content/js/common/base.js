class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }
    setDataUrl() {

    }
    loadData() {
        //lấy thông tin các cột giữ liệu

        var column = $('table thead th');
        var fieldName = [];
        var getDataUrl = this.getDataUrl;

        $.ajax(
            {
                url: getDataUrl,
                method: "GET",
            }
        )
            .done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //Lấy thông tin các cột giữ liệu sẽ map tương ứng

                    $.each(column, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldname'); 
                        
                        var value = obj[fieldName];
                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })

            })
            .fail(function (res) { })
    }
}
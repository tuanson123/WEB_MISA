class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.clickEvent();
        this.loadData();
        
    }
    setDataUrl() {

    }
    clickEvent() {
        /**
         *Ân hiện form
         * **/

        $("#btnShow").click(function () {
            $("#btnDialog").show();
        });
        $("#btnClose").click(function () {
            $("#btnDialog").hide();
        });
        /**
         *Nạp dữ liệu khi nhấn nạp
         * **/
        $('#btnRefresh').click(function () {
            alert('Load lại dữ liệu');
        });
        /**
         *Ân dữ liệu khi nhấn hủy
         * **/
        $('#btnCancel').click(function () {
            $("#btnDialog").hide();
        });
        /**
     *Thực hiện lưu dữ liệu khi nhấn lưu
     * **/
        $('#btnSave').click(function () {
            alert('Lưu lại dữ liệu');
        });
    /**
    *Hiện thị thông tin chi tiết khi click đúp chuột vào
    * **/
        $('table tbody').on('dblclick', 'tr', function () {
            $("#btnDialog").show();     
        })

        

    }
    /**
     * Load dữ liệu
     * CreatedBy:DTSON(12/29/2020)
     * */
    loadData() {
        //lấy thông tin các cột giữ liệu:
        try {
            var column = $('table thead th');
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
                            var formatType = $(th).attr('formatType');

                            switch (formatType) {
                                case "ddmmyyyy":
                                    td.addClass("text-align-center");
                                    value = formatDate(value);
                                    break;
                                case "MoneyVND":
                                    td.addClass("text-align-right");
                                    value = formatMoney(value);
                                    break;
                                default:
                                    break;
                            }

                            td.append(value);
                            $(tr).append(td);
                        })
                        $('table tbody').append(tr);
                    })

                })
                .fail(function (res) { })
        }
        catch (e) {
            //ghi log lỗi:
            console.log(e);
        }

    }
}
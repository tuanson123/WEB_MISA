class BaseJS {
    constructor() {
        
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.clickEvent();
        this.loadData();

    }
    setApiRouter() {}
    
    clickEvent() {
        var me = this;
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
            me.loadData();
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

            //Validate dữ liệu
            var inputValidates = $('.input-required,input[type="email"]');
            $.each(inputValidates, function (index, input) {

                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }

            //thu thập thông tin dữ liệu được nhập=>buid thành object
            //Lấy tất cả các control nhập liệu
            var inputs = $('input[fieldName],select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                
                //check vs trường hợp input là radio, thì chỉ lấy value của input có attribute checked
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        entity[propertyName] = value;
                    }
                } else {
                    entity[propertyName] = value;
                }

            })
            console.log(entity);
            //Gọi service tương ứng thực hiên lưu dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'POST',
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                //Sau khi lưu thành công thì: 
                //+đưa ra thông báo 
                //+ẩn form chi tiết, load lại dữ liệu
                alert("Thêm thành công");
                $("#btnDialog").hide();
                me.loadData();
                

            }).fail(function (res) {
                alert("Thêm thất bại");
                

            })
          
        }.bind(this))
        /**
        *Hiện thị thông tin chi tiết khi click đúp chuột vào
        * **/
        $('table tbody').on('dblclick', 'tr', function () {
            $("#btnDialog").show();
        })
        /**
         *Validate bắt buộc nhập
         * CreateBy:DoTuanSon(1/4/2021)
         */
        $('.input-required').blur(function () {
            //Kiểm tra dữ liệu đã nhập, nếu để trống thi cảnh báo:
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })
        /**
         *Validate email nhập đúng định dạng
         * CreateBy:DoTuanSon(1/4/2021)
         */
        $('input[type="email"]').blur(function () {
            var valueToTest = $(this).val();
            var testEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!testEmail.test(valueToTest)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }
        })




    }
    /**
     * Load dữ liệu
     * CreatedBy:DTSON(12/29/2020)
     * */
    loadData() {
        var me = this;
        //lấy thông tin các cột giữ liệu:
        try {
            var column = $('table thead th');
            var getDataUrl = this.getDataUrl;

            $.ajax(
                {
                    url: me.host + me.apiRouter,
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
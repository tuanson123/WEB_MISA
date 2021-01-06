class BaseJS {
    constructor() {

        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.clickEvent();
        this.loadData();

    }
    setApiRouter() { }

    clickEvent() {
        var me = this;
        /**
         *Ân hiện form
         * **/
        $("#btnShow").click(me.btnAddOnClick.bind(me));
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
        $('#btnSave').click(me.btnSaveOnClick.bind(me));

        //load form
        //Load dữ liệu cho các combobox
        var select = $('select#cbxCustomerGroup');
        select.empty();
        //Load chờ màn hình
        $('.loading').show();
        //Lấy dữ liệu nhóm khách hàng
        $.ajax({
            url: me.host + "/api/customergroups",
            method: "GET"

        }).done(function (res) {
            if (res) {
                $.each(res, function (index, obj) {
                    var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                    select.append(option);
                })
            }
            $('.loading').hide();
        }).fail(function (res) {
            $('.loading').hide();
        })

        /**
        *Hiện thị thông tin chi tiết khi click đúp chuột vào
        * **/
        $('table tbody').on('dblclick', 'tr', function () {
            //Màu khi click đúp
            $(this).find('td').addClass('row-selected');
            me.FormMode = 'Edit';
            //Lấy khóa chính của bản ghi
            var recordId = $(this).data('recordId');
            me.recordId = recordId;
            //Gọi service lấy thông tin chi tiết qua Id:
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"

            }).done(function (res) {

                //Biding du lieu len  lên form chi tiết
                //Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName],select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];
                    $(this).val(value);
                    //check vs trường hợp input là radio, thì chỉ lấy value của input có attribute checked
                    //if ($(this).attr('type') == "radio") {
                    //    if (this.checked) {
                    //        entity[propertyName] = value;
                    //    }
                    //} else {
                    //    entity[propertyName] = value;
                    //}

                })
            }).fail(function (res) {

            })


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
            var testEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
            $('.loading').show();
            $.ajax(
                {
                    url: me.host + me.apiRouter,
                    method: "GET",
                }
            )
                .done(function (res) {
                    $.each(res, function (index, obj) {
                        var tr = $(`<tr></tr>`);
                        $(tr).data('recordId', obj.CustomerId);
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
                        $('.loading').hide();
                    })

                })
                .fail(function (res) { })
        }
        catch (e) {
            //ghi log lỗi:
            $('.loading').hide();
            console.log(e);
        }

    }
    /**
     * Hàm xử lý khi ấn button thêm mới
     * CreatedBy:DOTUANSON(1/6/2021)
     * */
    btnAddOnClick() {
        try {
            var me = this;
            me.FormMode = 'Add';
            //Reset lại field text của trường dữ liệu text và email
            $("input[type=text],input[type=email]").val("");
            //Hiển thị thông tin chi tiết
            $("#btnDialog").show();
            //load dữ liệu cho các combobox
            var selects = $('select[id]');
            selects.empty();
            $.each(selects, function (index, select) {
                var api = $(select).attr('api');
                var fieldName = $(select).attr('fieldName');
                var fieldValue = $(select).attr('fieldValue');
                //Lấy dữ liệu nhóm khách hàng
                $.ajax({
                    url: me.host + api,
                    method: 'GET',
                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                            selects.append(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            })
            

        }
        catch (e) {
            console.log(e);
        }
    }
/**
 * Hàm xử lý khi ấn button lưu dữ liệu
 * CreatedBy:DOTUANSON(1/6/2021)
 * */
    btnSaveOnClick() {
        var me = this;
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
        var method = "POST";
        if (me.FormMode == 'Edit') {
            method = "PUT";
            entity.CustomerId = me.recordId;
        }
        //Gọi service tương ứng thực hiên lưu dữ liệu
        $.ajax({
            url: me.host + me.apiRouter,
            method: method,
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
    }
}
$(document).ready(function () {
    new EmployeeJS();
})
/**
 * Class quản lý các sự kiện cho trang Employee
 * CreateBy:DTSON(12/29/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        //this.loadData();
        super();
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
    setApiRouter() {
        this.apiRouter = "/api/employees";
    }
    /**
     * Load dữ liệu
     * CreateBy:DTSON(12/29/2020)
     * */
    //loadData() {
    //    $.ajax(
    //        {
    //            url: "http://api.manhnv.net/api/employees",
    //            method: "GET",
    //        }
    //    )
    //        .done(function (res) {

    //            var data = res;

    //            $.each(data, function (index, item) {
    //                var dateOfBirthy = item["DateOfBirth"];
    //                dateOfBirthy = formatDate(dateOfBirthy);
    //                var salary = item["Salary"];
    //                if (salary == null) {
    //                    salary = "0";
    //                }
    //                else {

    //                    salary = formatMoney(salary);
    //                }
    //                var checkbox = `<input type="checkbox"/>`;
    //                if (item.Gender > 0) {
    //                    var checkbox = `<input type="checkbox" checked/>`;
    //                }
    //                var tr = $(`<tr>
    //                    <td>`+ item['EmployeeCode'] + `</td>
    //                    <td>`+ item['FullName'] + `</td>
    //                    <td class="text-align-center">`+ checkbox + `</td>
    //                    <td>`+ item['LastName'] + `</td>
    //                    <td class="text-align-center">`+ dateOfBirthy + `</td>
    //                    <td>`+ item['PhoneNumber'] + `</td>
    //                    <td>`+ item['Email'] + `</td>
    //                    <td>`+ item['PositionName'] + `</td>
    //                    <td>`+ item['DepartmentName'] + `</td>
    //                    <td class="text-align-right">`+ salary + `</td>
    //                    <td title="`+ item['Address'] + `">` + item['Address'] + `</td>
    //                    <td>`+ item['WorkStatusName'] + `</td>
    //                </tr >`);
    //                $('table tbody').append(tr);
    //                debugger;
    //            })
    //        })
    //        .fail(function (res) { })
    //}
    /**
     * Thêm dữ liệu
     * CreateBy:DTSON(12/29/2020)
     * */
    add() {

    }
    /**
    * Sửa dữ liệu
    * CreateBy:DTSON(12/29/2020)
    * */
    edit() {

    }



}


/**
 * Load dữ liệu
 * CreatedBy:DTSON(12/29/2020)
 * */
//function loadData() {
//    //Lấy dữ liệu
//    $.ajax(
//        {
//            url: "http://api.manhnv.net/api/employees",
//            method: "GET",
//        }
//    )
//        .done(function (res) {

//            var data = res;

//            $.each(data, function (index, item) {
//                var dateOfBirthy = item["DateOfBirth"];
//                dateOfBirthy = formatDate(dateOfBirthy);
//                var salary = item["Salary"];
//                if (salary == null) {
//                    salary = "0";
//                }
//                else {

//                    salary = formatMoney(salary);
//                }
//                var checkbox = `<input type="checkbox"/>`;
//                if (item.Gender > 0) {
//                    var checkbox = `<input type="checkbox" checked/>`;
//                }
//                var tr = $(`<tr>
//                        <td>`+ item['EmployeeCode'] + `</td>
//                        <td>`+ item['FullName'] + `</td>
//                        <td class="text-align-center">`+ checkbox + `</td>
//                        <td>`+ item['LastName'] + `</td>
//                        <td class="text-align-center">`+ dateOfBirthy + `</td>
//                        <td>`+ item['PhoneNumber'] + `</td>
//                        <td>`+ item['Email'] + `</td>
//                        <td>`+ item['PositionName'] + `</td>
//                        <td>`+ item['DepartmentName'] + `</td>
//                        <td class="text-align-right">`+ salary + `</td>
//                        <td title="`+ item['Address'] + `">` + item['Address'] + `</td>
//                        <td>`+ item['WorkStatusName'] + `</td>
//                    </tr >`);
//                $('table tbody').append(tr);
//                debugger;
//            })
//        })
//        .fail(function (res) { })
//    //binding dữ liệu

//}

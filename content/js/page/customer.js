$(document).ready(function () {
    loadData();
})
/**
 * Load dữ liệu
 * CreatedBy:DTSON(12/29/2020)
 * */
function loadData() {
    //Lấy dữ liệu
    $.ajax(
        {
            url: "http://api.manhnv.net/api/employees",
            method: "GET",
        }
    )
        .done(function (res) {

            var data = res;

            $.each(data, function (index, item) {
                var dateOfBirthy = item["DateOfBirth"];
                dateOfBirthy = formatDate(dateOfBirthy);
                var salary = item["Salary"];
                if (salary == null) {
                    salary = "0";
                }
                else {

                    salary = formatMoney(salary);
                }
                var checkbox = `<input type="checkbox"/>`;
                if (item.Gender > 0) {
                    var checkbox = `<input type="checkbox" checked/>`;
                }
                var tr = $(`<tr>
                        <td>`+ item['EmployeeCode'] + `</td>
                        <td>`+ item['FullName'] + `</td>
                        <td class="text-align-center">`+ checkbox + `</td>
                        <td>`+ item['LastName'] + `</td>
                        <td class="text-align-center">`+ dateOfBirthy + `</td>
                        <td>`+ item['PhoneNumber'] + `</td>
                        <td>`+ item['Email'] + `</td>
                        <td title="`+ item['Address'] + `">` + item['Address'] + `</td>
                        
                    </tr >`);
                $('table tbody').append(tr);
                debugger;
            })
        })
        .fail(function (res) { })
    //binding dữ liệu

}
/**
 * Format dữ liệu ngày/tháng/năm
 * CreatedBy:DoTuanSon(12/29/2020 )
 * @param {any} date
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";

    }
    else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }

}
/**
 * Format dữ liệu tiền lương
 * CreatedBy:DoTuanSon(12/29/2020 )
 * @param {any} money
 */
function formatMoney(money) {
    var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return num;
}
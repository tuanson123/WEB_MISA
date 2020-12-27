$(document).ready(function () {
    loadData();
})
function loadData() {
    //Lấy dữ liệu
    $.ajax(
        {
            url:"http://api.manhnv.net/api/employees",
            method:"GET",
        }
    )
        .done(function (res) {
          
            var data = res;
           
            $.each(data, function (index, item) {
                var dateOfBirthy = item["DateOfBirth"];
                dateOfBirthy = formatDate(dateOfBirthy);
                var tr = $(`<tr>
                        <td>`+ item['EmployeeCode'] +`</td>
                        <td>`+ item['FullName'] +`</td>
                        <td>`+ item['LastName'] + `</td>
                        <td>`+ dateOfBirthy +`</td>
                        <td>`+ item['PhoneNumber'] +`</td>
                        <td>`+ item['Email'] +`</td>
                        <td>`+ item['PositionName'] +`</td>
                        <td>`+ item['DepartmentName'] +`</td>
                        <td>`+ item['Salary'] +`</td>
                        <td title="`+ item['Address'] +`">`+ item['Address'] +`</td>
                        <td>`+ item['WorkStatusName'] +`</td>
                    </tr >`);
                $('table tbody').append(tr);
                debugger;
            })
        })
        .fail(function (res) { })
    //binding dữ liệu

}
function formatDate(date) {
    var date = new Date(date);
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    return day + '/' + month + '/' + year;
}
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
                var tr = $(`<tr>
                        <td>`+ item['EmployeeCode'] +`</td>
                        <td>`+ item['FullName'] +`</td>
                        <td>`+ item['WorkStatus'] +`</td>
                        <td>`+ item['JoinDate'] +`</td>
                        <td>`+ item['PhoneNumber'] +`</td>
                        <td>`+ item['Address'] +`</td>
                        
                    </tr >`);
                $('table tbody').append(tr);
                debugger;
            })
        })
        .fail(function (res) { })
    //binding dữ liệu
}
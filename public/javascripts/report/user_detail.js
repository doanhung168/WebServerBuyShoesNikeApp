function longToDate(longValue) {

    // Create a new Date object
    const date = new Date(longValue);

    // Now, you can use various methods of the Date object to get different components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Display the formatted date
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}
function createItemUI (element){
    
    $('#user-detail').append(
        `<div class="col" id="order-item-list-${element._id}">
            <i><b style="font-size: 14px;"><a style="color: blue" href="#">#${element._id}</a></b></i>
            
            <p class="mt-2">Tên người dùng: ${element.name}</p>
            <p class="mt-2">Số điện thoại: ${element.phone_number}</p>
            <p class="mt-2">Email: ${element.email}</p>
            <p class="mt-2">Giơi tính: ${element.gender == 0 ? "undefine" : "Male"}</p>
            <p class="mt-2">Ngày đăng ký: ${longToDate(element.created_date)}</p>
            <p class="mt-2">Sinh nhật: ${longToDate(element.birthday)}</p>
            <div class="mt-2 d-flex">
                <p>Trạng thái: </p>
                <select id="user_state" class="mx-4" style="border: none; outline: none;"  ${element.state == 5 ? 'disabled' : ''}>
                    <option value="0" ${element.state == 0? 'selected' : ''}>Không hoạt động</option>
                    <option value="1" ${element.state == 1? 'selected' : ''}>Hoạt động</option>
                    <option value="2" ${element.state == 2 ? 'selected' : ''}>Giới hạn</option>
                </select>   
            </div>
            <button class="mt-3 btn btn-outline-success" id="updateUser" onClick="updateUser()">Cập nhật trạng thái người dùng</button>
        </div>`
    );

}
function loadUserDetail(id){
    $.ajax({
        type: "get",
        url: "/user/getUserDetail?id=" + id,
        success: function (response) {
            console.log(response)
            if (response.success) {
                $('#user-detail').empty()
                if (response.success) {
                    console.log(response.data)
                    createItemUI(response.data)
                } else {
                    console.log(response.message)
                }

            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}
loadUserDetail($('#user_id').val())
function updateUser(){
    const status = $('#user_state').val()
    $.ajax({
        type: "put",
        url: "/user/",
        data: {id: $("#user_id").val(), state: $('#user_state').val()},
        success: function (response) {
            if(response.success) {
                alert("Cập nhật trạng thái người dùng thành công")
            } else {
                console.log(response.message)
            }
        }
    })
}
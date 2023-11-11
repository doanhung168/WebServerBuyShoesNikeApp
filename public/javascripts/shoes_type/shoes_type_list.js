function openUpdateForm(id) {
    $.ajax({
        type: "get",
        url: "/shoes-type?_id=" + id,
        success: function (response) {
            if (response.success) {
                const shoesType = response.data[0]
                if (shoesType != null) {
                    $('#updated-shoes-type-id').attr('data-id', shoesType._id)
                    $('#updated_shoes_type_name').val(shoesType.name)
                    $('#updated-shoes-type-state').val(`${shoesType.active}`)
                    $('#updateShoesTypeModal').modal('show');
                }
            } else {
                console.log(response.message)
            }
        },
        error: function (_, error) {
            console.log(error)
        }
    });
}

function loadShoesTypeList() {
    $.ajax({
        type: "get",
        url: "/shoes-type",
        success: function (response) {
            if (response.success) {
                $('#number_of_type_shoes').text(' ' + response.data.length)
                response.data.forEach(element => {
                    $('#shoes-type-list-container').append(
                        `<div class="mb-3 bg-light p-3">
                            <p><b>Tên loại giày: </b><span>${element.name}</span></p>
                            <p><b>Trạng thái: </b><span>${element.active ? 'Đang hoạt động' : 'Không hoạt động'}</span> </p>
                            <p class="text-primary text-decoration-underline hand-pointer" onclick="openUpdateForm('${element._id}')">Chỉnh sửa</p>
                        </div>`
                    );
                });
            } else {
                console.log(response.message)
            }
        },
        error: function (_, error) {
            console.log(error)
        }
    });
}

loadShoesTypeList()

function createShoesType() {

    const shoesTypeName = $('#shoes_type_name').val()

    $.ajax({
        type: "post",
        url: "/shoes-type/",
        data: { name: shoesTypeName },
        success: function (response) {
            if (response.success) {
                alert('Tạo một loại giày thành công!')
                $('#createShoesTypeModal').modal('hide');
                loadShoesTypeList()
            } else {
                alert(response.message)
            }
        }
    });
}

function updateShoesType() {
    const id = $('#updated-shoes-type-id').attr('data-id')
    const active = $('#updated-shoes-type-state').val()

    $.ajax({
        type: "put",
        url: "/shoes-type/",
        data: { id: id, active: active },
        success: function (response) {
            if (response.success) {
                alert('Cập nhật loại giày thành công')
                location.reload()
            } else {
                console.log(response.message)
            }
        },
        error: function (_, error) {
            console.log(error)
        }
    });
}
const input = $('#image_input').change(function (e) {
    e.preventDefault();
    const formData = new FormData($('#image_form')[0])

    $.ajax({
        url: '/shoes_image/',
        data: formData,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.success) {
                data.data.forEach(element => {
                    $('#image_container').append(
                        `<div class="me-3" style="position: relative;display: inline-block;">
                            <i class="fa-solid fa-circle-minus" onclick="return removeImage(this);" style="position: absolute; right: 18px; top: 2px;color: #e41b4d"></i>
                            <img src="${element}"  width="150px" height="150px" alt="" class="me-3 shoes_image_item">
                        </div>`
                    );
                });
            } else {
                alert(data.message)
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    })
});

const btnAddImage = $('#btn_add_image').click(function (e) {
    e.preventDefault();
    $('#image_input').value = null
    $('#image_input').click()
});

function removeImage(target) {
    const img = target.parentElement.getElementsByClassName('shoes_image_item')[0]
    const src = img.getAttribute('src')

    $.ajax({
        url: '/shoes_image/',
        data: { src: src },
        type: 'DELETE',
        success: function (data) {
            if (data.success) {
                const parent = target.parentElement
                parent.remove()
            } else {
                alert(data.message)
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error);
        }
    })

}
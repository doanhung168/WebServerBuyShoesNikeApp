$('#offer-image').click(function (e) {
    $('#image_input').click()
});

$('#image_input').change(function (e) {
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
                    $('#offer-image').attr('src', `${element}`)
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

function removePreviousImage() {
    const imageSrc = $('#offer-image').attr('src')
    if(imageSrc != '/images/placeholder.png') {
        $.ajax({
            url: '/shoes_image/',
            data: { src: imageSrc },
            type: 'DELETE',
            success: function (data) {
                console.log('delete image successful')
            },
            error: function (xhr, status, error) {
                alert('Error: ' + error);
            }
        })
    }
   
}
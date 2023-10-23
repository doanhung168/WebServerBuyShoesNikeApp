
function createShoesType(element) {

    const shoesTypeName = $('#shoes_type_name').val()

    $.ajax({
        type: "post",
        url: "/shoes_type/",
        data: {name: shoesTypeName},
        success: function (response) {
            if(response.success) {
                alert('Create shoes type successfully')
                $('#shoes_type_name').val('')
            } else {
                alert(response.message)
            }
        }
    });
}
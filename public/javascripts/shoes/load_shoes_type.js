
loadShoesType()

function loadShoesType() {

    $.ajax({
        type: "get",
        url: "/shoes-type/",
        success: function (response) {
            if (response.success) {
                response.data.forEach(element => {
                    $('#shoes_type').append(
                        `<option value="${element._id}">${element.name}</option>`
                    )
                });

            } else {
                console.log('Error: ' + response.message)
            }
        }
    });
}

$('#shoes_type').change(function (e) {
    $('#product-input').empty()
    $('#product-input').append(
        `<div class="mb-3">
        <label for="search_shoes_type" class="form-label fw-bolder">Search shoes type</label>
        <input class="form-control" type="text" id="search_shoes_type"/>
        <div class="d-flex flex-row mt-2 align-items-center">
            <button class="btn btn-outline-success">Search</button>
            <p class="ms-3" data-shoes-type="" id="searched_shoes_type">...</p>
            <a class="ms-3 text-success" style="cursor: pointer;">Add</a>
        </div>
        <div id="shoes_type_list">
            
        </div>
    </div>`
    )
});


function searchShoesType() {
    const shoesTypeName = $('search_shoes_type').val()
    if(shoesTypeName) {
        alert('Please, enter shoes type before searching....')
        return
    }

    $.ajax({
        type: "get",
        url: "/shoes_type?active=true",
        success: function (response) {
            if(response.success) {
                $('#searched_shoes_type').html(response.data.name)
                $('#searched_shoes_type').attr('data-shoes-type', response.data._id)
            } else {
                alert('Error: ' + response.message)
            }
        }
    });
}


function addShoesType() {
    const searchedShoesType =  $('#searched_shoes_type').attr('data-shoes-type')
    $('#shoes_type_list').append(
        
    )
}


$('#shoes').change(function (e) {
    $('#product-input').empty()
    $('#product-input').append(
        `<div class="mb-3">
        <label for="search_shoes" class="form-label fw-bolder">Search shoes</label>
        <input class="form-control" type="text" id="search_shoes">
        <div class="d-flex flex-row mt-2 align-items-center">
            <button class="btn btn-outline-success">Search</button>
            <p class="ms-3" id="specified_shoes" data-shoes="">...</p>
            <a class="ms-3 text-success" style="cursor: pointer;">Add</a>
        </div>
        <div id="shoes_list">
            
        </div>
    </div>`
    )
});
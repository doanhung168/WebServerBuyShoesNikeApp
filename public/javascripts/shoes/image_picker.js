$('#btn_add_image').click(function (e) {
    e.preventDefault();
    $('#image_input').value = null
    $('#image_input').click()
});

function removeImage(target) {
    const img = target.parentElement.getElementsByClassName('shoes_image_item')[0]
    const src = img.getAttribute('src')

    const deleteRef = firebase.storage().refFromURL(src)
    deleteRef.delete().then(() => {
        const parent = target.parentElement
        parent.remove()
    }).catch((error) => {
        console.log(error)
    });
}

function uploadImage(file) {
    const ref = firebase.storage().ref()
    const metadata = {
        contentType: file.type
    }
    const name = file.name
    const uploadImg = ref.child(`shoes-images/${name}-${Date.now()}`).put(file, metadata)
    uploadImg.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            $('#image_container').append(
                `<div class="me-3 mt-3" style="position: relative;display: inline-block;">
                    <i class="fa-solid fa-circle-minus" onclick="return removeImage(this);" style="position: absolute; right: 18px; top: 2px;color: #e41b4d"></i>
                    <img src="${url}" width="150px" height="150px" alt="" class="me-3 shoes_image_item">
                </div>`
            );
        })
        .catch((err) => console.log(err))
}


$('#image_input').on('change', function () {
    var selectedFile = this.files[0];
    uploadImage(selectedFile)
})


$('#offer-image').click(function (e) {
    $('#image_input').click()
});

$('#image_input').on('change', function () {
    var selectedFile = this.files[0];
    uploadImage(selectedFile)
})

function uploadImage(file) {
    const ref = firebase.storage().ref()
    const metadata = {
        contentType: file.type
    }
    const name = file.name
    const uploadImg = ref.child(`offer-images/${name}-${Date.now()}`).put(file, metadata)
    uploadImg.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            removePreviousImage()
            $('#offer-image').attr('src', `${url}`)
        })
        .catch((err) => console.log(err))
}

function removePreviousImage() {
    const imageSrc = $('#offer-image').attr('src')
    if (imageSrc != '/images/placeholder.png') {
        const deleteRef = firebase.storage().refFromURL(imageSrc)
        deleteRef.delete().then(() => {
            console.log("delete success")
        }).catch((error) => {
            console.log(error)
        });
    } else {
        console.log('not available to delete')
    }
}


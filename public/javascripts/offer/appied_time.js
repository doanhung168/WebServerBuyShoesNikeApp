
$('#time').change(function (e) {
    $('#time-input').empty();
    $('#time-input').append(
        `<div class="mb-3">
            <div class="row">
                <div class="col">
                    <label class="form-label fw-bolder">Start time</label>
                    <input id="started_time" type='date' class="form-control" />
                </div>
                <div class="col">
                    <label class="form-label fw-bolder">End time</label>
                    <input id="ended_time" type='date' class="form-control" />
                </div>
            </div>
        </div>`
    )
});

$('#day').change(function (e) {
    $('#time-input').empty();
    $('#time-input').append(
        `<div class="mb-3">
            <div class="form-check">
                <input class="form-check-input" id="monday" type="checkbox" value="1" name="day" />
                <label class="form-check-label" for="monday">Monday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="tuesday" type="checkbox" value="2" name="day" />
                <label class="form-check-label" for="tuesday">Tuesday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="wednesday" type="checkbox" value="3" name="day" />
                <label class="form-check-label" for="wednesday">Wednesday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="thursday" type="checkbox" value="4" name="day" />
                <label class="form-check-label" for="thursday">Thusday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="friday" type="checkbox" value="5" name="day" />
                <label class="form-check-label" for="friday">Friday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="saturday" type="checkbox" value="6" name="day" />
                <label class="form-check-label" for="saturday">Saturday</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" id="sunday" type="checkbox" value="7" name="day" />
                <label class="form-check-label" for="sunday">Sunday</label>
            </div>
        </div>`
    )
});
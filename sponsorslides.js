function loadJSON(filePath, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText));
                }
            } else {
                if (error) {
                    error(xhr);
                }
            }
        }
    };
    xhr.open("GET", filePath, true);
    xhr.send();
}

function onLoad() {
    loadJSON("sponsordata.json", function(data) {
        sponsorData = data;
        console.log("Successfully loaded sponsor data.");
    }, function(xhr) {
        alert("Could not load sponsor data, status code: " + xhr.status);
    });
}

var sponsorData;

document.addEventListener("DOMContentLoaded", function() {
    onLoad();
});
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
        console.log("Successfully loaded sponsor data.");
        generateHTML(data);
    }, function(xhr) {
        alert("Could not load sponsor data, status code: " + xhr.status);
    });
}

function generateSponsorHTML(status, data) {
    var html = '<div class="' + status + '">';
    for (var i = 0; i < data.length; i++) {
        var sponsor = data[i];
        html += '<div><a href="' + sponsor.link + '"><img src="logos/' + sponsor.logo + '" alt="' + sponsor.name + '" title="' + sponsor.name + '" /></a></div>';
    }
    html += '</div>';
    return html;
}

function generateHTML(data) {
    var html = generateSponsorHTML("platinum", data.platinum);
    html += generateSponsorHTML("gold", data.gold);
    html += generateSponsorHTML("silver", data.silver);
    document.getElementById("sponsors").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    onLoad();
});
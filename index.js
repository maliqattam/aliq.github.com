function send(e) {
    let hasNumber = /\d/;
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;

    if (hasNumber.test(firstname) || hasNumber.test(lastname) || !(/^[a-zA-Z]+$/.test(firstname) || !(/^[a-zA-Z]+$/.test(lastname)))) {
        alert("First name or last name is not valid");
        e.preventDefault();
        return;
    }
    let email = document.getElementById("email").value;
    if (validateEmail(email) === false) {
        alert("E-mail is not valid");
        e.preventDefault();
        return;
    }
    let number = document.getElementById("mobilenumber").value;
    let ort = document.getElementById("stadt").value;
    let straße = document.getElementById("straße").value;
    let plz = document.getElementById("plz").value;
    if (isNaN(plz)) {
        alert("PLZ is not valid");
        e.preventDefault();
        return;
    }
    let geburtsdatum = document.getElementById("dob").value;
    let _event = document.getElementById("events").value;
    let jsonOb = {
        "Vorname": firstname,
        "Nachname": lastname,
        "Geburtsdatum": geburtsdatum,
        "Straße": straße,
        "Ort": ort,
        "Postleitzahl": plz,
        "Telefonnummer": number,
        "Email": email,
        "Event": _event
    };
    url = 'https://localhost:44358/api/visitors/person';

    let jsonString = JSON.stringify(jsonOb);
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: jsonString
        })
        .then(response => {
            if (response.ok) {
                let contentType = response.headers.get("Content-Type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
            }
            //  return response.json();
            throw new Error("Error in response!");
        })
        .then(data => {
            return data;
        })
        .then(function(data) {
            document.getElementById("recordForm").hidden = true;
            let p = document.createElement('p');
            p.innerHTML = data;
            document.getElementById('saveID').appendChild(p);
        })

    .catch(error => { alert("An error occured! " + error); })
    e.preventDefault();
}

function validateEmail(email) { //check if the E-Mail is valid
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var intervalID = function() {
    setInterval(
        function() {
            var elemnts = document.querySelectorAll("#register_form input[type=text]");
            var empty = false;
            for (var i = 0, element; element = elemnts[i++];) {
                if (element.type === "text" && element.value === "") {
                    empty = true;
                }
            }
            if (empty) {
                document.getElementById('register').setAttribute("disabled", "disabled");
            } else {
                document.getElementById('register').removeAttribute("disabled");
            }
        }, 100)
}();


function events(e) {
    let sidenav = document.getElementsByClassName('sidenav')[0];

    fetch('https://localhost:44358/api/events')
        .then(response => {
            if (response.ok) {
                let contentType = response.headers.get("Content-Type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
            }
            //   return response.json();
            throw new Error("Error in response!");
        })
        .then(data => data)
        .then(function(data) {
            data.forEach(element => {
                let option = document.createElement('option');
                option.innerHTML = element;
                option.value = element;
                document.getElementById('events').appendChild(option);
                let a = document.createElement('a');
                a.innerText = element;
                sidenav.appendChild(a);
            });
        })
        .catch(error => { alert("An error occured! " + error); })
    e.preventDefault();

}


//3b7a0d98-3d46-4efc-94b5-40d32925d368
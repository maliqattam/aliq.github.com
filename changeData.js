function getVisitorById(e) {
    let id = document.getElementById('id1').value;
    let _event = document.getElementById('events').value;
    let url = 'https://localhost:44358/api/visitors/' + _event + '/' + id;
    fetch(url)
        .then(response => response.json())
        .then(data => data)
        .then(function(data) {
            //  console.log(data);
            addForm(data.email, data.geburtsdatum, data.nachname, data.ort, data.postleitzahl, data.straße, data.telefonnummer,
                data.vorname);
            document.getElementById('hide').hidden = true;
            josnObObjectMethod();

        })
    e.preventDefault();
}

function events() {
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
                document.getElementById('events').appendChild(option)
            });
        })
        .catch(error => { alert("An error occured! " + error); })

}

function addForm(_email, _geburtsdatum, nachname, _ort, _plz, _straße, telefonnumer, vorname) {
    let firstname = document.createElement('input')
    let firstnamelabel = document.createElement('label');
    firstnamelabel.innerHTML = "Vorname*";
    firstnamelabel.setAttribute('for', 'fname');
    firstname.setAttribute('id', 'fname');
    firstname.value = vorname;

    let lastname = document.createElement('input')
    let lastnamelabel = document.createElement('label');
    lastnamelabel.setAttribute('for', 'lname');
    lastnamelabel.innerHTML = "Nachname*";
    lastname.setAttribute('id', 'lname');
    lastname.value = nachname;


    let email = document.createElement('input')
    let emaillabel = document.createElement('label');
    emaillabel.setAttribute('for', 'email');
    emaillabel.innerHTML = "E-mail*";
    email.setAttribute('id', 'email');
    email.value = _email;

    let number = document.createElement('input')
    let numberlabel = document.createElement('label');
    numberlabel.setAttribute('for', 'mobilenumber');
    numberlabel.innerHTML = "Telefonnummer*";
    number.setAttribute('id', 'mobilenumber');
    number.value = telefonnumer;

    let ort = document.createElement('input')
    let ortlabel = document.createElement('label');
    ortlabel.setAttribute('for', 'stadt');
    ortlabel.innerHTML = "Stadt*";
    ort.setAttribute('id', 'stadt');
    ort.value = _ort;

    let straße = document.createElement('input')
    let straßelabel = document.createElement('label');
    straßelabel.innerHTML = "Adresse Zeile 1*";
    straßelabel.setAttribute('for', 'straße');
    straße.setAttribute('id', 'straße');
    straße.value = _straße;

    let plz = document.createElement('input')
    let plzlabel = document.createElement('label');
    plzlabel.innerHTML = "PLZ*";
    plzlabel.setAttribute('for', 'plz');
    plz.setAttribute('id', 'plz');
    plz.value = _plz;

    let geburtsdatum = document.createElement('input')
    let geburtsdatumlabel = document.createElement('label');
    geburtsdatumlabel.innerHTML = "Geburtsdatum ";
    geburtsdatumlabel.setAttribute('for', 'dob');
    geburtsdatum.setAttribute('id', 'dob');
    geburtsdatum.value = _geburtsdatum;

    let ChangeButton = document.createElement('button');
    ChangeButton.setAttribute("onclick", "changeData(event)");
    ChangeButton.innerHTML = "Submit changes";
    let DeleteButton = document.createElement('button');
    DeleteButton.setAttribute("onclick", "_delete(event)");
    DeleteButton.innerHTML = "Delete Record";

    document.getElementById('myform').append(firstnamelabel, firstname, lastnamelabel, lastname,
        geburtsdatumlabel, geburtsdatum, straßelabel, straße, plzlabel, plz,
        ortlabel, ort, emaillabel, email, numberlabel, number, ChangeButton, DeleteButton);
}



function _delete() {
    console.log("Hallo");
    //let url = 'https://localhost:44358/api/visitors/' + event name + '/' +  das angegebene id;
    ///fetch mit einer Methode: delete
    let eventname = document.getElementById('events').value;
    let id = document.getElementById('id1').value;
    let url = 'https://localhost:44358/api/visitors/' + eventname + '/' + id;
    fetch(url, {
            method: 'DELETE'
        })
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
        .then(function(data) {
            document.getElementById('myform').hidden = true;
            let h2 = document.createElement('h2');
            h2.innerHTML = data;
            document.getElementById('result').append(h2);
        })
        .catch(error => { alert("An error occured! " + error); })
    e.preventDefault();

}

function changeData(e) {
    //url = http://localhost:5000/api/visitors/' + das angegebene id
    //fetch mit meiner method PUT
    //du solltest nur ein json string senden wie fetch mit der Methode post aus index.js 
    //ich habe dir eine hilfe Methode
    //josnObObjectMethod erstellt, die ein json string zurück liefert, die man angegeben hat, um seine Daten zu aktulisieren
    //dieses string solltest du mit put schicken
    let id = document.getElementById('id1').value;
    console.log(id);
    let url = 'https://localhost:44358/api/visitors/' + id;

    let data = josnObObjectMethod();
    console.log(data);
    fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        })
        .then(response => {
            if (response.ok) {
                let contentType = response.headers.get("Content-Type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
            }
            throw new Error("Error in response!");
        })
        .then(function(data) {
            document.getElementById('myform1').hidden = true;
            let h2 = document.createElement('h2');
            h2.innerText = data;
            document.getElementById('result').append(h2);
        })
        .catch(error => { alert("An error occured! " + error); })

    e.preventDefault();
}


function josnObObjectMethod() {
    let hasNumber = /\d/;
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("mobilenumber").value;
    let ort = document.getElementById("stadt").value;
    let straße = document.getElementById("straße").value;
    let plz = document.getElementById("plz").value;
    let geburtsdatum = document.getElementById("dob").value;
    let _event = document.getElementById("events").value;
    //   console.log(firstname, lastname, email, number, ort, straße, plz, geburtsdatum, _event);

    if (hasNumber.test(firstname) || hasNumber.test(lastname) || !(/^[a-zA-Z]+$/.test(firstname) || !(/^[a-zA-Z]+$/.test(lastname)))) {
        alert("First name or last name is not valid");
        e.preventDefault();
        return;
    }

    if (validateEmail(email) === false) {
        alert("E-mail is not valid");
        e.preventDefault();
        return;
    }

    if (isNaN(plz)) {
        alert("PLZ is not valid");
        e.preventDefault();
        return;
    }


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
    // console.log(jsonOb);
    return JSON.stringify(jsonOb);

}

function validateEmail(email) { //check if the E-Mail is valid
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
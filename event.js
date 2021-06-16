function info(e) {
    //das ist das url, das du brauchst http: //localhost:5000/api/events/infos;
    //fetch mit einer Methode get liefert dir ein zwei dim array
    //ein Beispiel .... data = ["Name der Party" => "info über diese Party", "halloParty" => "nur für ober 18 Jahre alt"];
    //data["halloParty"] liefert "nur für ober 18 jahre alt"
    //du kannst die neue Elemente in das div mit dem Klassenname column hinzufügen (siehe das in events.html)
    url = "https://localhost:44358/api/events/infos";
    fetch(url, {
            method: "GET"
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
        .then(data => data)
        .then(function(data) {
            for (var key in data) {
                let h1 = document.createElement('h1')
                h1.setAttribute('id', key);
                h1.innerHTML = key;
                let p1 = document.createElement('p');
                p1.innerHTML = data[key];
                document.getElementById('listofEvents').append(h1, p1);

            }
        })
}

//send data zum Anmelden
//delete Visitor
//change Data visitor
//events info
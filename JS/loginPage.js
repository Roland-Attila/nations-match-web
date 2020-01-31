window.loginPage = {

    API_BASE_URL: "http://localhost:8086/nations-match",

    getUsers: function () {
        $.ajax({
            url: loginPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            let saveId;
            for (let i = 0; i < response.content.length; i++) {
                if (username == response.content[i].email && password == response.content[i].password) {
                    saveId = response.content[i].id;
                    saveUrl = response.content[i].imageUrl;
                    sessionStorage.setItem("saveId", saveId);
                    sessionStorage.setItem("saveUrl", saveUrl);
                    firstReload = true;
                    window.location = "http://localhost:63342/nations-match-web/home.html";
                    return
                }
            }
        })
    },

    createUser: function () {
        let imageUrl = $("#imageUrl").val();
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let age = $("#age").val();
        let description = $("#description").val();
        let nationality = $("#nationality").val();
        let email = $("#email").val();
        let password = $("#passwordField").val();

        var requestBody = {
            imageUrl: imageUrl,
            firstName: firstName,
            lastName: lastName,
            age: age,
            description: description,
            nationality: nationality,
            email: email,
            password: password
        };

        $.ajax({
            url: loginPage.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location = "http://localhost:63342/nations-match-web/login.html";
            alert("You created successfully a user")
        })
    },


};
document.getElementById("create").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex";
});
document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});
loginPage.getUsers();

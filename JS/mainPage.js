window.mainPage = {

    API_BASE_URL: "http://localhost:8086/nations-match",

    activeId: sessionStorage.getItem("saveId"),

    getUsers: function () {
        $.ajax({
            url: mainPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {

            mainPage.display(response.content);
        })
    },

    display: function (users) {
        var usersHtml = "";

            users.splice(mainPage.findUser(users, Number(mainPage.activeId)),1);

            users.forEach(user => usersHtml += mainPage.getUsersHtml(user));

            $(".info #User tbody").html(usersHtml);
    },

    displayUserasBySearch: function (users) {
        var usersHtml = "";

        users.forEach(user => usersHtml += mainPage.getUsersHtml(user));

        $(".info #User tbody").html(usersHtml);
    },

    getUsersHtml: function (user) {
        return `<tr>
                    <td><img src=${user.imageUrl} alt="" border=3 height=100 width=100></td>
                    <td align="center">${user.firstName}<br>${user.lastName}</td>
                    <td align="center">${user.nationality}</td>
                    <td>${user.description}</td>
                    <td align="center">Age:<br>${user.age}<br>Email:<br>${user.email}</td>
                    <td align="center">
                         <a href="http://localhost:63342/nations-match-web/messages.html" class="message-user" data-id="${user.id}"><i class="fas fa-paper-plane" style="font-size: 2.0em"></i></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="6"><div class="line"></div></td>
                </tr>`
    },

    getMainUser: function () {
        $.ajax({
            url: mainPage.API_BASE_URL,
            method: "GET"
        }).done(function (response) {

            mainPage.displayMainUser(response.content);
        })

    },

    displayMainUser: function (user) {

        let usersHtml = mainPage.getMainUserHtml(user[mainPage.findUser(user, Number(mainPage.activeId))]);
        $(".info #Personal tbody").html(usersHtml);
    },

    findUser: function(user, title){
        const index = user.findIndex(function (user) {
            return (user.id) === title.valueOf();
        });
        return index;
    },

    getMainUserHtml: function (user) {
        return `<tr>
                    <td><img src=${user.imageUrl} alt="" border=3 height=100 width=100></td>
                    <td align="center"><div id="firstName" contenteditable="true">${user.firstName}</div><br><div id="lastName" contenteditable="true">${user.lastName}</div></td>
                    <td align="center" contenteditable="true" id="nationality">${user.nationality}</td>
                    <td contenteditable="true" id="description">${user.description}</td>
                    <td align="center">Age:<br><div contenteditable="true" id="age">${user.age}</div><br>Email:<br><div id="email" contenteditable="true">${user.email}</div></td>
                    <td align="center"><a href="#" class="delete-item" data-id="${user.id}"><center><i class="far fa-trash-alt" 
                                            style="font-size: 2.0em"></i></center></a><br>
                                       <a href="#" class="edit-item" data-id="${user.id}" id="edit"><i class="fas fa-user-edit" 
                                            style="font-size: 2.0em"></i></a>
                    </a></td>
                </tr>
                <tr>
                    <td colspan="6"><div class="line"></div></td>
                </tr>`
    },

    updateContact: function(id, firstName, lastName, age, description, nationality, email){
        let requestBody = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            description: description,
            nationality: nationality,
            email: email
        };

        $.ajax({
            url: mainPage.API_BASE_URL + "/" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            mainPage.getMainUser();
            mainPage.getUsers();
        })
    },

    searchUserProfiles: function(minAge, maxAge, firstName, lastName, nationality){
         if(minAge !=='' && maxAge !=='' && nationality !==''){
            $.ajax({
                url: mainPage.API_BASE_URL + "?maxAge=" + maxAge + "&minAge=" + minAge  + "&sameNationality=" + nationality,
                method: "GET"
            }).done(function (response) {

                console.log(response.content);
                mainPage.displayUserasBySearch(response.content);

            })
        } else  if(minAge !=='' && maxAge !==''){
            $.ajax({
                url: mainPage.API_BASE_URL + "?maxAge=" + maxAge + "&minAge=" + minAge,
                method: "GET"
            }).done(function (response) {

                console.log(response.content);
                mainPage.displayUserasBySearch(response.content);

            })
        } else if(nationality !=='') {
            $.ajax({
                url: mainPage.API_BASE_URL + "?sameNationality=" + nationality,
                method: "GET"
            }).done(function (response) {

                console.log(response.content);
                mainPage.displayUserasBySearch(response.content);

            })
        } else if(firstName !=='') {
            $.ajax({
                url: mainPage.API_BASE_URL + "?partialFirstName=" + firstName,
                method: "GET"
            }).done(function (response) {

                console.log("First Name is working");
                console.log(response.content);
                mainPage.displayUserasBySearch(response.content);

            })
        } else if(lastName !=='') {
            $.ajax({
                url: mainPage.API_BASE_URL + "?partialLastName=" + lastName,
                method: "GET"
            }).done(function (response) {

                console.log("Last Name is working");
                console.log(response.content);
                mainPage.displayUserasBySearch(response.content);

            })
        } else {
             window.location = "http://localhost:63342/nations-match-web/home.html";
         }
    },

    deletePersonalProfile: function(id){

        $.ajax({
            url: mainPage.API_BASE_URL + "/" + id,
            method: "DELETE",
        }).done(function(){
            alert("You deleted your account")
            window.location = "http://localhost:63342/nations-match-web/login.html"
        })
    },

    bindEvents: function () {
        $(".info").delegate(".edit-item", "click", function (event) {
            event.preventDefault();

            const personal = {
                firstName: $("#firstName").text(),
                lastName: $("#lastName").text(),
                age: $("#age").text(),
                description: $("#description").text(),
                nationality: $("#nationality").text(),
                email: $("#email").text()
            };

            let id = $(this).data("id");

            mainPage.updateContact(id, personal.firstName, personal.lastName, personal.age,
                personal.description, personal.nationality, personal.email)
        });

        $("#search-form").submit(function (event) {
            event.preventDefault();

            const person = {
                firstName: $('#firstNameField').val(),
                lastName: $('#lastNameField').val(),
                minAge: $('#minAgeField').val(),
                maxAge: $('#maxAgeField').val(),
                nationality: $('#nationalityField').val(),
            };

            mainPage.searchUserProfiles(person.minAge, person.maxAge, person.firstName,
                person.lastName, person.nationality)
        });

        $(".info #Personal tbody").delegate(".delete-item", "click", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            mainPage.deletePersonalProfile(id);
        });


    }
};

if(mainPage.activeId !== '0' && mainPage.activeId !==null){
    mainPage.getMainUser();
    mainPage.getUsers();
    mainPage.bindEvents();
}else{
    window.location = "http://localhost:63342/nations-match-web/login.html"
}

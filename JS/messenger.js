window.messenger = {

    API_BASE_URL: "http://localhost:8086/chat-content",

    activeId: sessionStorage.getItem("saveId"),
    activeUrl: sessionStorage.getItem("saveUrl"),

    getText: function () {
        $.ajax({
            url: messenger.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            messenger.display(response.content);
        })
    },

    display: function (users) {

        let HtmlBody = [];
        for (let i = 0; i < users.length; i++) {
            if(users[i].userId === parseInt(messenger.activeId)){
                HtmlBody[i] = messenger.getSelfTextHtml(users[i]);
            }else{
                HtmlBody[i] = messenger.getFriendTextHtml(users[i]);
            }
        }
        $(".chatbox .chatlogs").html(HtmlBody);
    },

    getFriendTextHtml: function (user) {
        return `<div class="chat friend">
                    <div class="user-photo"><img src=${user.imageUrl}></div>
                    <p class="chat-message">${user.text}</p>
                </div>`
    },

    getSelfTextHtml: function (user) {
        return `<div class="chat self">
                    <div class="user-photo"><img src=${user.imageUrl}></div>
                    <p class="chat-message">${user.text}</p>
                </div>`
    },

    createText: function () {
        let text = $("#textUser").val();

        var requestBody = {
            userId: messenger.activeId,
            imageUrl: messenger.activeUrl,
            text: text
        };

        $.ajax({
            url: messenger.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            //window.location = "http://localhost:63342/nations-match-web/messages.html";
            messenger.getText();
            $(".chatlogs").scrollTop($(".chatlogs")[0].scrollHeight);

        })
    }
};
messenger.getText();

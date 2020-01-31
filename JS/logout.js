window.logout = {
    var: saveId = 0,

    setIdToZero: function(){

        sessionStorage.setItem("saveId", saveId);

        window.location = "http://localhost:63342/nations-match-web/login.html"

    }
};
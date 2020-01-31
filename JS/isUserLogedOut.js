window.isUserLogedOut = {

    activeId: sessionStorage.getItem("saveId"),

};
if(isUserLogedOut.activeId !== '0' && isUserLogedOut.activeId !==null){
}else{
   window.location = "http://localhost:63342/nations-match-web/login.html"
}
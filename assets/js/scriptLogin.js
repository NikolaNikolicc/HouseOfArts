$(document).ready(function () {

    let users = [
        {
            id: 1,
            username: "admin",
            password: "admin123"
        },
        {
            id: 2,
            username: "Mina",
            password: "mina123"
        },
        {
            id: 3,
            username: "Nikola",
            password: "nikola123"
        },
        
    ];

    initFunc();

    $("#login-btn").click(function(event) {
        event.preventDefault();
        let username = $("input.username").val();
        let password = $("input.password").val();
        for(let i = 0; i < users.length; i++){
            if(users[i].username == username && users[i].password == password){
                localStorage.setItem("userID", users[i].id);
                let parts = window.location.href.split("/");
                parts.pop();
                parts.push("index.html");
                window.location.href = parts.join("/");
            }
        }
    })

    function initFunc(){
        if(localStorage.getItem("users") == null){
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

});
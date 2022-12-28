 //zaloguj sie klik- do storage ma sie załadowac user
 const btnLogin = document.querySelector('.login');
 const emailInput = document.querySelector('#email');
 const passwordInput = document.querySelector('#password');

 const user1 = {
     name: "Zuzanna",
     email:"zuzanna@",
     password:"11111",
 }

 const user2 = {
     name: "Marcin",
     email:"Marcin@",
     password:"22222"
 }

 const users = [user1,user2]

 let currentUser;
 let loginHref;

 console.log( "Hello!")

//  const loginHandler = (e) => {
//      e.preventDefault();
//     //  if (emailInput.value) {
//     //     //  currentUser = users.find(user => user.email === emailInput.value);
//     //     //  loginHref = "/user";
//     //      localStorage.setItem("user","zuza");
//     //      console.log("login correct")
         
//     //  }else{
//     //      loginHref = "/";
//     //      emailInput.style.color = "red";
//     //      return
//     //      //jesli wpisaes zle dane haslo login to nie mozesz wejsc. link nie moze cie dac na druga strone 
//     //  }

//      console.log("login correct")

//  }

 btnLogin.addEventListener("click", function(){
    console.log("login correct")
           localStorage.setItem("user","zuza");
 });
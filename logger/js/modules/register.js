import {
   showPopup,
   closePopup,
   sendPopupInfo
} from "./components/popup.js";
import {
   routeAction
} from "../script.js";

let registrationState = "error";

const registerUser = () => {
   showPopup();
   const name = document.querySelector(`input[name="name"]`);
   const email = document.querySelector(`input[name="email"]`);
   const password = document.querySelector(`input[name="password"]`);;

   axios.post('http://localhost:3000/api/user/register', {
         "name": name.value,
         "email": email.value,
         "password": password.value
      })
      .then(function (res) {
         const msg = res.data;
         sendPopupInfo("Success!","success");
         registrationState = "success";
      })
      .catch(function (err) {
         const msg = err.response.data;
         sendPopupInfo(msg,"error");
         registrationState = "error";
      })
}

const regContinue = () => {
   if (registrationState == "success") {
      routeAction("#login")
   } else if(registrationState == "error") {
      closePopup();
   }
}

export const regViewSetup = () => {
   const loginLink = document.querySelector(".login_link");
   loginLink.addEventListener("click", () => {
      routeAction("#login")
   })

   const btnRegister = document.querySelector(".btn_register");
   btnRegister.addEventListener("click", () => {
      registerUser()
   })

   const btnContinue = document.querySelector(".btn_continue");
   btnContinue.addEventListener("click", () => {
      regContinue();
   })
}
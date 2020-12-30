import {
   showPopup,
   closePopup,
   sendPopupInfo
} from "./components/popup.js";
import {
   routeAction
} from "../script.js";


let loginState = "error";

const loginUser = () => {
   showPopup();

   const name = document.querySelector(`input[name="name"]`);
   const password = document.querySelector(`input[name="password"]`);

   axios.post('http://localhost:3000/api/user/login', {
         "name": name.value,
         "password": password.value
      })
      .then(function (res) {
         const authToken = res.data;
         sendPopupInfo("Success!","success");
         loginState = "success";

         profiler = axios.create({
            baseURL: "http://localhost:3000/api/profile",
            headers: {"auth-token": authToken}
         });
      })
      .catch(function (err) {
         const msg = err.response.data;
         sendPopupInfo(msg, "error");
         loginState = "error";
      })
}

const loginContinue = () => {
   if (loginState == "success") {
   routeAction("#profile")
   } else if(loginState == "error") {
      closePopup();
   }
}

export const loginViewSetup = () => {
   const signupLink = document.querySelector(".signup-link");
   signupLink.addEventListener("click", () => {
      routeAction("#signup")
   })

   const btnLogin = document.querySelector(".btn_login");
   btnLogin.addEventListener("click", () => {
      loginUser();
   })

   const btnContinue = document.querySelector(".btn_continue");
   btnContinue.addEventListener("click", () => {
      loginContinue();
   })
}


export let profiler;
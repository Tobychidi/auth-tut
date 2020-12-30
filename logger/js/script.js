import {
   regViewSetup
} from "./modules/register.js";

import {
   loginViewSetup
} from "./modules/login.js";

import {
   profileViewSetup
} from "./modules/profile.js";

const loginTemplate = document.querySelector("template#login");
const loginContent = loginTemplate.content;

const signupTemplate = document.querySelector("template#signup");
const signupContent = signupTemplate.content;

const profileTemplate = document.querySelector("template#profile");
const profileContent = profileTemplate.content;


function switchPage() {
   document.body.innerHTML = "";
   switch (location.hash) {
      case "#signup":
         document.body.appendChild(signupContent.cloneNode(true));
         regViewSetup();
         break;
      case "#login":
         document.body.appendChild(loginContent.cloneNode(true));
         loginViewSetup();
         break;
      case "#profile":
         document.body.appendChild(profileContent.cloneNode(true));
         profileViewSetup();
         break;
      default:
         document.body.appendChild(loginContent.cloneNode(true));
         loginViewSetup();
         break;
   }
} switchPage();

//ROUTES HANDLING
export function routeAction(route) {
   window.location.hash = route;
}

// window.addEventListener("hashchange", function () {
//    switchPage();
// })

window.addEventListener("popstate", function () {
   switchPage();
})
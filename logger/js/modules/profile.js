import { routeAction } from "../script.js";
import {
   profiler
} from "./login.js"
const getProfile = () => {
   const viewMain = document.querySelector(".view_main");
   const name = document.querySelector(`input[name="name"]`);
   const email = document.querySelector(`input[name="email"]`);
   const password = document.querySelector(`input[name="password"]`);
   const fullname = document.querySelector(`input[name="fullname"]`);
   const extra = document.querySelector(`input[name="extra"]`);
   const headerName = document.querySelector(".header_name")

   if (profiler) {
      profiler.get()
      .then(function (res) {
         const userName = res.data.name;
         const userEmail = res.data.email;
         let userFullname, userExtra;
         if (res.data.fullname) userFullname = res.data.fullname;
         if (res.data.extra) userExtra = res.data.extra;

         name.value = userName;
         email.value = userEmail;
         if(userExtra) extra = userExtra;
         if(userFullname) fullname = userFullname;
         headerName.innerHTML = userName;
      }, function (err) {
         alert(err)
      })
      .catch(function (err) {
         alert(err)
      })
   } else {
      alert("You need to login to access your profile");
      routeAction("#login")
   }
}

export const profileViewSetup = () => {
   getProfile()
}
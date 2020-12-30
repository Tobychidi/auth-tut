// const loadAnim = document.querySelector("load-anim");

export const resetPopup = () => {
   const infoText = document.querySelector(".info_text");
   const infoImg = document.querySelector(".info_img");
   infoText.innerHTML = "";
   // loadAnim.classList.add("active");
   infoImg.src = ""
   infoImg.classList.remove("active")
}
export const showPopup = () => {
   const popup = document.querySelector(".info_popup");
   const overlay = document.querySelector(".overlay");

   popup.classList.add("active");
}

export const closePopup = () => {
   const popup = document.querySelector(".info_popup");
   const overlay = document.querySelector(".overlay");

   popup.classList.remove("active");
   resetPopup();
}

export const sendPopupInfo = (message, state) => {
   const infoText = document.querySelector(".info_text");
   const infoImg = document.querySelector(".info_img");
   infoText.innerHTML = message;
   // loadAnim.classList.remove("active");
   infoImg.classList.add("active")
   if (state == "success") {
      infoImg.src = "/assets/success.svg"
      infoImg.alt = "Good"
   } else {
      infoImg.src = "/assets/error.svg"
   }
}
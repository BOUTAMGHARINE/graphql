import { navigateTo } from "./index.js";
export function PageNotfound() {
  console.log("hi");
  
    const div2 = document.getElementById("div")
    div2.innerHTML=""
    div2.innerHTML=`<main class="err-main">
      <div class="err-bg"></div>
      <div class="err-content">
          <center>
              <h2>This content does not exist</h2>
          </center>
          <!-- <form action="/"> -->
          <button class="go-back-error" >Go Back</button>
          <!-- </form> -->
      </div>
  </main>`;
  document.querySelector(".go-back-error").addEventListener("click",(e)=>{
    e.preventDefault();
     
      navigateTo("/login");

   })
  }
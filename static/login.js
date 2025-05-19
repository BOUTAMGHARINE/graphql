import { FetchProfile } from "./Profile.js";





export function CreatloginePage() {
  const token = localStorage.getItem("jwt");


  if (token) {
    FetchProfile()
    return
  }
  const onlydiv = document.getElementById("div")
  onlydiv.style.maxWidth = "400px"
  onlydiv.innerHTML = ""
  onlydiv.innerHTML = `  <div class="header"> <h1>Welcomme to GraphQL</h1></div>

    <div class="centerdiv">
     <form action="/" class="forme" id="loginForm">
        <input type="text" name="username" id="usernameOrEmail" placeholder="usernameOrEmail">
        <br>
        <input type="password" name="passwod" id="password" placeholder="passwod">
        <br>
        <span id="error"></span>
        <br>
        <button type="submit" class="button">Login</button>

     </form>

    </div>
    <script src="../static/index.js"></script>
    
</body>`
  login()
}
export function login() {


  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;
    let Messageerror = document.getElementById('error');
    Messageerror.innerHTML = "";

    const credentials = `${usernameOrEmail}:${password}`;

    const base64Credentials = btoa(credentials);

    fetch('https://learn.zone01oujda.ma/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
      },
      body: new URLSearchParams()
    })
      .then(response => {

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      .then(data => {



        localStorage.setItem('jwt', data);
        FetchProfile()
        // navigateTo("/profile")

      })
      .catch(error => {

        // Gérer les erreurs (informations d'identification incorrectes)

        Messageerror.innerHTML = error;
        Messageerror.style.color = "red"
      });
  });
}


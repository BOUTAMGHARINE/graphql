// Sélectionner le formulaire et ajouter un gestionnaire d'événements
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche l'envoi du formulaire traditionnel
  
    // Récupérer les valeurs du formulaire
    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;
    let Messageerror = document.getElementById('error') ;
     Messageerror.innerHTML="";
  
    // Créer les données pour l'authentification de base
    const credentials = `${usernameOrEmail}:${password}`;
    
    // Encoder les informations en base64
    const base64Credentials = btoa(credentials); // Utilisation de btoa pour base64
  
    // Effectuer la requête POST pour récupérer le JWT
    fetch('https://learn.zone01oujda.ma/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,  // Ajouter l'en-tête Authorization
      },
      body: new URLSearchParams()  // Corps vide car les données sont dans les en-têtes
    })
      .then(response => {
        console.log(response);
        
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();  // Extraire le JSON de la réponse
      })
      .then(data => {
        
        const jwt = data;  // Récupérer le JWT de la réponse
  
        // Stocker le JWT localement (dans localStorage ou sessionStorage)
        localStorage.setItem('jwt', jwt);  // Vous pouvez aussi utiliser sessionStorage selon vos besoins
  
        // Afficher un message de succès ou rediriger vers la page de profil
        console.log('Login successful! JWT:', jwt);
        //window.location.href = 'profile.html';  // Rediriger vers la page de profil après la connexion
      })
      .catch(error => {
        
        // Gérer les erreurs (informations d'identification incorrectes)
       
        Messageerror.innerHTML = error;
        Messageerror.style.color="red"
      });
  });
  


async function FetchProfile() {
    const token = localStorage.getItem("token");

if (!token) {

    navigateTo("/login")
}

  const  div3 = document.getElementById("div1")
  div3.innerHTML=""
  div3.innerHTML`<div class="container">
        <h2>Profil Utilisateur</h2>
        <div id="profile"></div>
        <h3>Statistiques</h3>
        <svg id="statsGraph" width="400" height="200"></svg>
        <button onclick="logout()">Déconnexion</button>
    </div>`
    
    
    const query = `{
        user {
            id
            login
        }
        transaction(where: { type: { _eq: "xp" } }) {
            amount
            createdAt
        }
    }`;

    const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    displayProfile(data.data);
    drawGraph(data.data.transaction);
}

function displayProfile(data) {
    document.getElementById("profile").innerHTML = `
        <p><strong>Nom d'utilisateur :</strong> ${data.user[0].login}</p>
        <p><strong>ID :</strong> ${data.user[0].id}</p>
    `;
}

function drawGraph(transactions) {
    const svg = document.getElementById("statsGraph");
    const maxXP = Math.max(...transactions.map(t => t.amount));

    transactions.forEach((t, index) => {
        const barHeight = (t.amount / maxXP) * 100;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rect.setAttribute("x", index * 40);
        rect.setAttribute("y", 100 - barHeight);
        rect.setAttribute("width", 30);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("fill", "blue");

        svg.appendChild(rect);
    });
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

fetchProfile();

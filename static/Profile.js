import { navigateTo } from "./index.js";



export async function FetchProfile() {
    const token = localStorage.getItem("jwt");
    console.log(token);
    

if (!token) {

    navigateTo("/login")
}

  const  div3 = document.getElementById("div")
  div3.innerHTML=""
  div3.innerHTML=`<div class="navbar">
  <img src="./img/1697464140948.jpeg">
   <button class="btn-logout" >logout</button>
   <h1>
   <div class="Profilename"></div>
  
  </div>
                 <div class="containere">
                    <section id="text">
                    <div id="profile"></div>
                    <div id="level" ></div>
                    <div id="projects"></div>
                    <div id="auditratio"></div>
                     </section>
                     <section id="graphs">
                    <div id ="audit"></div>
                    <div id="skils"></div>
                    </section>
                    <svg id="statsGraph" width="400" height="200"></svg>
                    
                        </div>`




    const logout_button = document.querySelector(".btn-logout")
      
    logout_button.addEventListener("click",()=>{
        logout();

    })
    
    
    const query = `{
        user {
            login
            firstName
            lastName
            totalUp
            totalDown
            auditRatio
        }
         audit :transaction(where: { type: { _eq: "up" } }) {
            amount
        }
        xp :transaction_aggregate(where: {type: {_eq: "level"}, event: {object: {name: {_eq: "Module"}}}}
                                      order_by: {createdAt: desc}
                                    ) {
                                      aggregate {
                                        max {
                                          amount
                                        }
                                      }
                                    }
        transaction(where: { type: { _eq: "xp" } }) {
            amount
            createdAt
        }
          USER_AUDITS: 
        user {
            auditRatio
            sucess: audits_aggregate(where: { closureType: { _eq: succeeded } }) {
                aggregate {
                    count
                }
            }
            failed: audits_aggregate(where: { closureType: { _eq: failed } }) {
                aggregate {
                    count
                }
            }
        }
        skills: transaction(where: {type: {_like: "%skill%"}}) {
        amount
        type
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
    console.log(data.data);
    console.log(data.data.USER_AUDITS[0].sucess.aggregate.count);
    console.log(data.data.USER_AUDITS[0].failed.aggregate.count);
    
    
    console.log(data.data.xp.aggregate.max.amount);

    

    document.querySelector(".Profilename").innerHTML+=`<p><strong>${data.data.user[0].login}</strong></p>`
    console.log( document.querySelector(".Profilename"));
    document.querySelector("#profile").innerHTML+=`<p><strong>Welcome, ${data.data.user[0].firstName} ${data.data.user[0].lastName}</strong></p>`
    document.querySelector("#auditratio").innerHTML+=`<h2>audit ratio </h2> ${roundToOneDecimal(data.data.user[0].auditRatio)}`
    document.querySelector("#level").innerHTML+=`<h2> your level </h2> ${data.data.xp.aggregate.max.amount}`
    


  
    
  //  displayProfile(data.data);
   // drawGraph(data.data.transaction);
}

function displayProfile(data) {
    document.getElementById("profile").innerHTML = `
        <p><strong>Nom d'utilisateur :</strong> ${data.user[0].login}</p>
        <p><strong>ID :</strong> ${data.user[0].id}</p>
    `;
}
function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
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
    navigateTo("/login")
}


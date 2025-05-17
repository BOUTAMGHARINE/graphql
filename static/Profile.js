import { navigateTo } from "./index.js";
import { jwt } from "./login.js";



export async function FetchProfile() {

  const token = localStorage.getItem("jwt");


  if (!token || token !== jwt) {

    navigateTo("/login")
    return
  }

  const div3 = document.getElementById("div")
  div3.style.maxWidth = ""
  div3.innerHTML = ""
  div3.innerHTML = `<div class="navbar">
  <img src="../static/img/1697464140948.jpeg" id="logo">
   <button class="btn-logout" >logout</button>
   <h1>
   <div class="Profilename"></div>
  
  </div>
                 <div class="containere">
                    <section id="text">
                    <div id="profile"></div>
                    <div id="level" ></div>
                    <div id="auditratio"></div>
                    <div id="projects"></div>
                     </section>
                     <section id="graphs">
                    <div id ="audit"></div>
                    <div id="skils"></div>
                    <div id="skills">
                    <svg id="skillsChart" width="800" height="500"></svg>

                    </div>
                    </section>
                    <svg id="statsGraph" width="400" height="200"></svg>
                    
                        </div>`

   window.addEventListener('resize', adjustTextPosition);


  const logout_button = document.querySelector(".btn-logout")

  logout_button.addEventListener("click", () => {
    div3.innerHTML = ""
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



  xp: transaction_aggregate(
    where: {
      type: { _eq: "level" }
      event: { object: { name: { _eq: "Module" } } }  
    }
    order_by: { createdAt: desc }
  ) {
    aggregate {
      max {
        amount
      }
    }
  }

  

  skills: transaction(where: { type: { _like: "%skill%" } }) {
    amount
    type
  }

  project_xp: transaction(
    where: { type: { _eq: "xp" }, eventId: { _eq: 41 } }
    order_by: { createdAt: desc }
  ) {
    path
    amount
    createdAt
  }
}
`;

  const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  if (data){

document.querySelector("#profile").innerHTML = `<p><strong>Welcome, ${data.data.user[0].firstName} ${data.data.user[0].lastName}</strong></p>`
  document.querySelector("#auditratio").innerHTML = `<h2>Audits ratio </h2>${roundToOneDecimal(data.data.user[0].auditRatio)}`
  document.querySelector("#projects").innerHTML = `<h2> The Last Three Validated Projects</h2>
  <ul>
  <li>${cleanstr(data.data.project_xp[0].path)}</li>
  <li>${cleanstr(data.data.project_xp[1].path)}</li>
  <li>${cleanstr(data.data.project_xp[2].path)}</li>
  </ul>`
  document.querySelector("#level").innerHTML = `<h2>Current level</h2>${data.data.xp.aggregate.max.amount}`
  createSvgPieChart(data.data.user[0].sucess.aggregate.count, data.data.user[0].failed.aggregate.count)
  createSvgRectangle(Sort(data.data.skills))
  }

}


function cleanstr(str) {
  return str.replace(/\/oujda\/module\//g, "")
}


function Sort(data) {
  const typeMap = {};

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const currentType = item.type;

    if (!typeMap[currentType] || item.amount > typeMap[currentType].amount) {
      typeMap[currentType] = item;
    }
  }
  

  return Object.values(typeMap);
}

function roundToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}




function logout() {
  localStorage.removeItem("jwt");
  navigateTo("/login")
}
function createSvgRectangle(data) {

  const svg = document.getElementById('skillsChart');
  const barHeight = 25;
  const barGap = 5;
  const maxBarWidth = 600;

  const maxAmount = Math.max(...data.map(d => d.amount));

  data.forEach((item, index) => {
    const y = index * (barHeight + barGap);
    const barWidth = (item.amount / maxAmount) * maxBarWidth;

    // Barre
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", 150);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", "#3498db");
    svg.appendChild(rect);

    // Texte de type
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", 0);
    label.setAttribute("y", y + barHeight / 2 + 4);
    label.textContent = item.type;
    svg.appendChild(label);

    // Texte de valeur
    const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueText.setAttribute("x", 160 + barWidth);
    valueText.setAttribute("y", y + barHeight / 2 + 4);
    valueText.textContent = `${item.amount}%`;
    svg.appendChild(valueText);
  });

  // Adapter la hauteur du SVG
  svg.setAttribute("height", data.length * (barHeight + barGap));
}
function createSvgPieChart(value1, value2) {

  const values = [value1, value2]; // tes données
  const colors = ["#4CAF50", "#FF0000"];

  const total = values.reduce((sum, v) => sum + v, 0);
  const center = 250;
  const radius = 100;
  const strokeWidth = 50;
  const circumference = 2 * Math.PI * radius;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 500 500");
  svg.setAttribute("width", 500);
  svg.setAttribute("height", 500);
  svg.style.transform = "rotate(-90deg)"; // pour commencer en haut

  let offset = 0;

  values.forEach((value, i) => {
    const percent = value / total;
    const dash = percent * circumference;

    // Créer un cercle pour chaque portion
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", center);
    circle.setAttribute("cy", center);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", colors[i]);
    circle.setAttribute("stroke-width", strokeWidth);
    circle.setAttribute("stroke-dasharray", `${dash} ${circumference}`);
    circle.setAttribute("stroke-dashoffset", -offset);

    offset += dash;

    svg.appendChild(circle);

    // Ajouter un texte pour le pourcentage
  
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", center + Math.cos((offset - dash / 2) / radius) * radius);
    text.setAttribute("y", center + Math.sin((offset - dash / 2) / radius) * radius);
    text.setAttribute("fill", "black");
    text.setAttribute("font-size", "18");
    text.classList=`text${i}`
    text.setAttribute("text-anchor", "middle");
    text.textContent = `${(percent * 100).toFixed(1)}%`;

    svg.appendChild(text);
  });
  const centerText = document.createElementNS(svgNS, "text");
  centerText.setAttribute("x", center);
  centerText.classList="total"
  centerText.setAttribute("y", center); // ajustement vertical
  centerText.setAttribute("text-anchor", "middle"); // centré horizontalement
  centerText.setAttribute("font-size", "20");
  centerText.setAttribute("fill", "#333");
  centerText.textContent = `${total}audit`; // ou un label comme "Total"
  centerText.setAttribute("transform", `rotate(90, ${center}, ${center})`)

  svg.appendChild(centerText);

  // Ajouter le SVG dans le div
  document.querySelector("#audit").appendChild(svg);
  const legend = document.createElement("div");
  legend.className = "legend"
  legend.style.marginTop = "20px";
  legend.style.display = "flex";
  legend.style.justifyContent = "center";
  legend.style.gap = "20px";

  // Noms pour chaque couleur
  const labels = ["seccecf", "failaid"]; 

  values.forEach((value, i) => {
    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "5px";

    const colorBox = document.createElement("div");
    colorBox.style.width = "15px";
    colorBox.style.height = "15px";
    colorBox.style.backgroundColor = colors[i];

    const label = document.createElement("span");
    label.textContent = `${labels[i]} (${value})`;

    item.appendChild(colorBox);
    item.appendChild(label);
    legend.appendChild(item);
  });

  document.querySelector("#audit").appendChild(legend);

}

        function adjustTextPosition() {
             var textElement0 = document.querySelector('.text0');
             var totalaudit = document.querySelector('.total');
             var textElement1 = document.querySelector('.text1');
            if (window.innerWidth <= 480) {
                totalaudit.setAttribute('x', 150);
                textElement0.setAttribute('y', 120);
                textElement1.setAttribute('y', 120);
            } else {
                textElement0.setAttribute('y', '50%');
                totalaudit.setAttribute('x', 250);
                textElement1.setAttribute('y',210)
            }
           
        }

        
       

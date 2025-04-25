


  const values = [40, 30]; // tes données
  const colors = ["#4CAF50", "#2196F3"];
  
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
    text.setAttribute("text-anchor", "middle");
    text.textContent = `${(percent * 100).toFixed(1)}%`;

    svg.appendChild(text);
  });

  // Ajouter le SVG dans le div
  document.querySelector("#test").appendChild(svg);

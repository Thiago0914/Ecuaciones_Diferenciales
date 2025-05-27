let currentPDF = 1;
let añoSecreto, tSecreto, poblacionSecreta, vidas, intentos, historial, pistaDada, juegoTerminado;
const preguntas = [
  "El valor de k define qué tan rápido crece la curva poblacional.",
  "En este modelo se consideran limitaciones humanas para el crecimiento con el tiempo.",
  "El modelo exponencial es útil para predecir a corto plazo, pero puede fallar a largo plazo.",
  "El modelo logístico considera un límite máximo de población.",
  "La gráfica logística nunca cambia su pendiente en el tiempo.",
  "Visualmente, la curva logística se aplana al acercarse a la capacidad de carga."
];
let respuestas = [];

function poblacion(t) {
  return 2000000 / (3.0444 * Math.exp(-0.059 * t) + 1);
}

function añoAT(año) {
  return (año - 2010) * 0.5;
}

function contarFijasPicas(secreto, intento) {
  let fijas = 0, picas = 0;
  let usadasSecreto = [false, false, false, false];
  let usadasIntento = [false, false, false, false];
  
  for (let i = 0; i < 4; i++) {
    if (intento[i] === secreto[i]) {
      fijas++;
      usadasSecreto[i] = true;
      usadasIntento[i] = true;
    }
  }
  
  for (let i = 0; i < 4; i++) {
    if (!usadasIntento[i]) {
      for (let j = 0; j < 4; j++) {
        if (!usadasSecreto[j] && intento[i] === secreto[j]) {
          picas++;
          usadasSecreto[j] = true;
          break;
        }
      }
    }
  }
  return [fijas, picas];
}

function togglePDF() {
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfHeader = document.getElementById("pdfHeader");
  const pdfExplanation = document.getElementById("pdfExplanation");

  if (currentPDF === 1) {
    currentPDF = 2;
    pdfViewer.src = "ProyectoED_corte2of.pdf";
    pdfHeader.textContent = "Proyecto ecuaciones diferenciales - Parte 2";
    pdfExplanation.innerHTML = `       <h2>📗 Proyecto de Ecuaciones Diferenciales - Corte 2</h2>       <p><strong>Tema:</strong> Modelamiento poblacional con ecuación logística 🧬</p>       <p><strong>Objetivo:</strong> Usar un modelo más realista que el exponencial. Se aplica la ecuación logística:<br>       <code>P(t) = K / (A * e<sup>-rt</sup> + 1)</code> para considerar límites naturales.</p>       <p><strong>¿Qué se hizo?</strong></p>       <ul>         <li>Se usaron dos pares de datos: [1984-2004] y [2010-2020]</li>         <li>Se resolvió la ecuación logística hallando <code>r</code> y <code>A</code> con <code>K = 2,000,000</code></li>         <li>Se proyectó población al 2025 y se compararon errores</li>         <li>Error en modelo 1: 10.21% - Modelo 2: 4.24%</li>       </ul>       <p>🎮 Se agregó un juego interactivo para reforzar la comprensión llamado <em>“Adivina el Año”</em>.</p>`;
  } else if (currentPDF === 2) {
    currentPDF = 3;
    pdfViewer.src = "proyecto ecuaciones corte 3.pdf"; // Aquí va el PDF
    pdfHeader.textContent = "Proyecto ecuaciones diferenciales - Parte 3";
    pdfExplanation.innerHTML = `       <h2>📙 Proyecto de Ecuaciones Diferenciales - Corte 3</h2>       <p><strong>Tema:</strong> Análisis comparativo de modelos poblacionales 📊</p>       <p><strong>Objetivo:</strong> Comparar los modelos exponencial y logístico aplicados a Bucaramanga.</p>       <p><strong>¿Qué se hizo?</strong></p>       <ul>         <li>Comparación detallada de ambos modelos</li>         <li>Análisis de errores y precisión</li>         <li>Conclusiones sobre la aplicabilidad de cada modelo</li>         <li>Recomendaciones para futuras proyecciones</li>       </ul>       <p>🔍 Se demostró que el modelo logístico es más preciso para proyecciones a largo plazo.</p>`;
  } else {
    currentPDF = 1;
    pdfViewer.src = "proyecto ecuaciones corte 1.pdf";
    pdfHeader.textContent = "Proyecto ecuaciones diferenciales - Parte 1";
    pdfExplanation.innerHTML = `       <h2>📘 Proyecto de Ecuaciones Diferenciales - Corte 1</h2>       <p><strong>Tema:</strong> Modelamiento del crecimiento poblacional de Bucaramanga 🏙️</p>       <p><strong>Objetivo:</strong> Crear un modelo con ecuación exponencial:<br>       <code>dp/dt = kp</code> para predecir la población futura.</p>       <p><strong>¿Qué se hizo?</strong></p>       <ul>         <li>Datos de población (1984-2024) ajustados al 46%</li>         <li>Se aplicaron 5 modelos exponenciales con PVI diferentes</li>         <li>Se usó MATLAB para graficar y proyectar la población al 2025</li>         <li>Se calcularon errores de predicción y se analizó su utilidad</li>       </ul>       <p>🔍 Se concluye que el modelo exponencial sobreestima a largo plazo. En el segundo corte se mejora con un modelo logístico.</p>`;
  }
}

window.onload = function() {
  reiniciarJuego();
  togglePDF(); // Inicializa el primer PDF
};

let graficaActual = 0;
const graficas = [
  '<iframe id="geogebra" src="https://www.geogebra.org/calculator/vfezspxw" width="800" height="600" style="border: 1px solid #e4e4e4;border-radius: 4px;" frameborder="0" allowfullscreen></iframe>',
  '<img src="nueva_imagen.png" alt="Nueva Gráfica" style="width: 100%; height: auto; border-radius: 8px;"/>'
];

function cambiarGrafica(direccion) {
  if (direccion === 'anterior') {
    graficaActual = (graficaActual - 1 + graficas.length) % graficas.length;
  } else if (direccion === 'siguiente') {
    graficaActual = (graficaActual + 1) % graficas.length;
  }
  const geogebraContainer = document.getElementById("graficas");
  geogebraContainer.innerHTML = graficas[graficaActual] +
    '<div class="manipulable-text">🔧 Este apartado es manipulable, puedes moverla a tu gusto.</div>';
}

function mostrarExplicacion() {
  document.getElementById("popup").style.display = "block";
}

function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}

function reiniciarJuego() {
  añoSecreto = Math.floor(Math.random() * (2070 - 2010 + 1)) + 2010;
  tSecreto = añoAT(añoSecreto);
  poblacionSecreta = Math.floor(poblacion(tSecreto));
  vidas = 10;
  intentos = 0;
  historial = [];
  pistaDada = false;
  juegoTerminado = false;
  
  document.getElementById("poblacion").textContent = `La población proyectada es: ${poblacionSecreta} habitantes`;
  document.getElementById("vidas").textContent = vidas;
  document.getElementById("mensaje").textContent = "";
  document.getElementById("historial").innerHTML = "";
  document.getElementById("inputAño").value = "";
}

function verificarIntento() {
  if (juegoTerminado) return;
  
  const input = document.getElementById("inputAño");
  const año = input.value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!/^\d{4}$/.test(año)) {
    mensaje.textContent = "😅 Ups... ¿no sabes que un año tiene 4 dígitos? Pierdes 2 vidas.";
    vidas -= 2;
  } else {
    const añoNum = parseInt(año);
    if (añoNum < 2010 || añoNum > 2070) {
      mensaje.textContent = "⚠️ El año debe estar entre 2010 y 2070. Pierdes 1 vida.";
      vidas--;
    } else {
      const [fijas, picas] = contarFijasPicas(añoSecreto.toString(), año);
      intentos++;
      vidas--;
      historial.push({ intento: año, fijas, picas });
      
      const h = document.getElementById("historial");
      const entrada = document.createElement("div");
      entrada.textContent = `Intento ${intentos}: ${año} → 🔢 Fijas: ${fijas}, Picas: ${picas}`;
      h.appendChild(entrada);

      mensaje.textContent = `🔢 Fijas: ${fijas} | Picas: ${picas}`;

      if (fijas === 4) {
        juegoTerminado = true;
        mensaje.textContent += intentos === 1
          ? "\n🎉 ¡Eres un genio, tienes un IQ de 1000!"
          : intentos <= 5
            ? "\n🎉 ¡Felicidades crack! ¡Lo resolviste muy rápido!"
            : `\n🎉 ¡Bien hecho! Adivinaste el año correctamente en ${intentos} intentos.`;
      } else if (vidas < 5 && !pistaDada) {
        for (let i = 0; i < 4; i++) {
          const digito = añoSecreto.toString()[i];
          if (!historial.some(h => h.intento.includes(digito))) {
            mensaje.textContent += `\n💡 Modo fácil activado: el año contiene el dígito '${digito}'`;
            pistaDada = true;
            break;
          }
        }
      }
    }
  }

  if (vidas <= 0 && !juegoTerminado) {
    juegoTerminado = true;
    mensaje.textContent = `💀 Te quedaste sin vidas. Has perdido.\n📅 El año correcto era: ${añoSecreto}`;
    for (let i = 0; i < 4; i++) {
      const digito = añoSecreto.toString()[i];
      if (!historial.some(h => h.intento.includes(digito))) {
        mensaje.textContent += `\n💡 Una pista que te habría ayudado: el año contenía el dígito '${digito}'`;
        break;
      }
    }
    mensaje.textContent += "\n💬 ¡No te preocupes! Hasta los mejores fallan a veces. ¡Sigue practicando! 💪";
  }

  document.getElementById("vidas").textContent = vidas;
  input.value = "";
}

function mostrarEncuesta() {
  const preguntasDiv = document.getElementById("preguntas");
  preguntasDiv.innerHTML = "";
  preguntas.forEach((pregunta, index) => {
    const respuestaCorrecta = Math.random() < 0.5 ? "👉 Verdadero ✅" : "👉 Falso ❌";
    const respuestaIncorrecta = respuestaCorrecta === "👉 Verdadero ✅" ? "👉 Falso ❌" : "👉 Verdadero ✅";
    const preguntaDiv = document.createElement("div");
    preguntaDiv.innerHTML = `<p>${pregunta}</p>
      <input type="radio" name="respuesta${index}" value="1"> ${respuestaCorrecta}<br>
      <input type="radio" name="respuesta${index}" value="0"> ${respuestaIncorrecta}<br>`;
    preguntasDiv.appendChild(preguntaDiv);
  });
  document.getElementById("survey").style.display = "block";
}

function evaluarEncuesta() {
  const totalPreguntas = preguntas.length;
  let respuestasCorrectas = 0;

  for (let i = 0; i < totalPreguntas; i++) {
    const respuesta = document.querySelector(`input[name="respuesta${i}"]:checked`);
    if (respuesta && respuesta.value === "1") {
      respuestasCorrectas++;
    }
  }

  let mensajeFinal = "";
  if (respuestasCorrectas === 0) {
    mensajeFinal = "😔 Oye, no leíste el documento. ¡Intenta nuevamente!";
  } else if (respuestasCorrectas === 1) {
    mensajeFinal = "🤔 Solo una respuesta correcta, ¡puedes hacerlo mejor!";
  } else if (respuestasCorrectas < totalPreguntas) {
    mensajeFinal = `😊 Buen trabajo, acertaste ${respuestasCorrectas} de ${totalPreguntas} preguntas. ¡Sigue practicando!`;
  } else {
    mensajeFinal = "🎉 ¡Espectacular! Alguien que realmente le interesa las ecuaciones diferenciales.";
  }

  alert(mensajeFinal);
  cerrarEncuesta();
}

function cerrarEncuesta() {
  document.getElementById("survey").style.display = "none";
}

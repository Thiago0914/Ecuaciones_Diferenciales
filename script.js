let currentPDF = 1;
let añoSecreto, tSecreto, poblacionSecreta, vidas, intentos, historial, pistaDada, juegoTerminado;
const preguntas = ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7", "Pregunta 8", "Pregunta 9", "Pregunta 10"];
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
    pdfViewer.src = "ProyectoED_corte2of.pdf";
    pdfHeader.textContent = "Proyecto ecuaciones diferenciales - Parte 2";
    pdfExplanation.textContent = "Texto explicativo para el PDF 2.";
    currentPDF = 2;
  } else {
    pdfViewer.src = "proyecto ecuaciones corte 1.pdf";
    pdfHeader.textContent = "Proyecto ecuaciones diferenciales - Parte 1";
    pdfExplanation.textContent = "Texto explicativo para el PDF 1.";
    currentPDF = 1;
  }
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
  const preguntasElegidas = [];
  while (preguntasElegidas.length < 3) {
    const randomIndex = Math.floor(Math.random() * preguntas.length);
    if (!preguntasElegidas.includes(randomIndex)) {
      preguntasElegidas.push(randomIndex);
    }
  }
  const preguntasDiv = document.getElementById("preguntas");
  preguntasDiv.innerHTML = ""; // Limpiar preguntas anteriores
  preguntasElegidas.forEach(index => {
    const pregunta = document.createElement("div");
    pregunta.innerHTML = `<p>${preguntas[index]}</p>
                         <input type="radio" name="respuesta${index}" value="1"> Correcta<br>
                         <input type="radio" name="respuesta${index}" value="0"> Incorrecta<br>`;
    preguntasDiv.appendChild(pregunta);
  });
  document.getElementById("survey").style.display = "block";
}

function evaluarEncuesta() {
  let correctas = 0;
  for (let i = 0; i < preguntas.length; i++) {
    const respuesta = document.querySelector(`input[name="respuesta${i}"]:checked`);
    if (respuesta) {
      correctas += parseInt(respuesta.value);
    }
  }
  let mensaje = "";
  if (correctas === 3) {
    mensaje = "¡Excelente!";
  } else if (correctas === 2) {
    mensaje = "Aún puedes mejorar, pero no estás mal.";
  } else if (correctas === 1) {
    mensaje = "Debes leer un poco más el documento.";
  } else {
    mensaje = "Me lastimaste, no leíste el documento.";
  }
  alert(mensaje);
  cerrarEncuesta();
}

function cerrarEncuesta() {
  document.getElementById("survey").style.display = "none"; // Ocultar encuesta
}

// Iniciar juego al cargar
reiniciarJuego();

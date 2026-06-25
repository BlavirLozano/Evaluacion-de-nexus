const totalSlides = 47;
const pdfPath = "assets/Portada.pdf";
const passingGrade = 80;
const supabaseUrl = "https://hcaqiselmayfbcjofmwo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYXFpc2VsbWF5ZmJjam9mbXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTU3NjEsImV4cCI6MjA5Nzg5MTc2MX0.9YKDn7sWchdoP2ub3jQXucYYNkQ6FQW7hDp-MIFswRE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const questions = [
  {
    text: "Que datos se requieren para recuperar una contrasena olvidada?",
    options: [
      "Nombre de usuario y correo registrado en el sistema.",
      "Solo el numero de aula.",
      "La calificacion final del curso.",
      "El nombre de todos los estudiantes inscritos."
    ],
    answer: 0
  },
  {
    text: "Para que sirve la seccion Mi Cuenta?",
    options: [
      "Para consultar o modificar informacion personal como correo y contrasena.",
      "Para publicar automaticamente todos los examenes.",
      "Para borrar cursos completos sin confirmacion.",
      "Para sustituir el programa analitico."
    ],
    answer: 0
  },
  {
    text: "Que funcion cumplen las carpetas en la pagina principal?",
    options: [
      "Organizar cursos o accesos para localizar informacion de manera mas ordenada.",
      "Cambiar el idioma del navegador.",
      "Enviar mensajes privados automaticamente.",
      "Sustituir los foros de discusion."
    ],
    answer: 0
  },
  {
    text: "Que informacion contiene el Programa Analitico?",
    options: [
      "Bienvenida, datos de identificacion, presentacion, propositos, competencias y estructura del curso.",
      "Solo el nombre del profesor.",
      "Un registro de pagos.",
      "La bitacora de accesos del servidor."
    ],
    answer: 0
  },
  {
    text: "En Configuracion, que puede definir el maestro?",
    options: [
      "Disponibilidad del curso, fechas, modelo, ordenamiento y pagina inicial.",
      "El sistema operativo del alumno.",
      "La velocidad de internet de cada participante.",
      "El diseno fisico del aula."
    ],
    answer: 0
  },
  {
    text: "Que permite consultar la vista de Evaluacion?",
    options: [
      "Detalle de evidencias o elementos complementarios: periodo, valor, criterios, actividad, contenidos y recursos.",
      "Solo fotografias de perfil.",
      "La contrasena de alumnos.",
      "La informacion bancaria del usuario."
    ],
    answer: 0
  },
  {
    text: "Cual es el proposito de los Foros de Discusion?",
    options: [
      "Abrir espacios de intercambio donde se pueden consultar, responder o administrar comentarios.",
      "Guardar contrasenas de acceso.",
      "Sustituir el calendario del curso.",
      "Crear reportes financieros."
    ],
    answer: 0
  },
  {
    text: "Que permite la herramienta Equipos?",
    options: [
      "Agregar equipos, editar sus datos, integrar alumnos y elegir representantes.",
      "Cambiar la version del navegador.",
      "Enviar calificaciones oficiales al sistema escolar.",
      "Eliminar todos los documentos del curso."
    ],
    answer: 0
  },
  {
    text: "Que acciones se describen para Examenes en NEXUS?",
    options: [
      "Agregar, publicar, editar informacion, eliminar, calificar y ver vista previa de examenes.",
      "Solo cambiar el logotipo institucional.",
      "Crear carpetas personales fuera del curso.",
      "Bloquear la recuperacion de contrasenas."
    ],
    answer: 0
  },
  {
    text: "Que son los Bancos de Reactivos?",
    options: [
      "Conjuntos de reactivos que pueden agregarse, editarse, eliminarse, compartirse o importarse a examenes.",
      "Listas de alumnos sin relacion con evaluaciones.",
      "Repositorios de imagenes decorativas.",
      "Calendarios personales del profesor."
    ],
    answer: 0
  }
];

// === Rutas de assets ===
const certificateTemplatePath = "assets/Constancia.pdf";

// === Coordenadas del nombre sobre la plantilla de constancia ===
// Ajusta estos valores cuando tengas la plantilla real (origen 0,0 en la esquina
// inferior izquierda de la pagina, en puntos PDF; carta = 612 x 792).
const certificateNameField = {
  x: 306,        // posicion horizontal (se usa como centro si centerText es true)
  y: 332,        // posicion vertical desde abajo
  fontSize: 22,
  color: { r: 0.05, g: 0.16, b: 0.15 }, // aprox. var(--accent-dark)
  centerText: true
};

const certificateGradeField = {
  x: 180,
  y: 260,
  fontSize: 18,
  color: { r: 0.05, g: 0.16, b: 0.15 }
};

const certificateDateField = {
  x: 135,
  y: 220,
  fontSize: 14,
  color: { r: 0.05, g: 0.16, b: 0.15 }
};

// === Estado de la aplicacion ===
let currentSlide = 1;
let examStarted = false;
let examGraded = false;
let studentName = "";
let employeeNumber = "";
let lastGrade = 0;
let lastCorrect = 0;

const examQuestions = questions.map((question, index) => {
  const shift = index % question.options.length;
  const options = question.options.map((option, optionIndex) => ({
    text: option,
    correct: optionIndex === question.answer
  }));
  return {
    text: question.text,
    options: options.slice(shift).concat(options.slice(0, shift))
  };
});

// === Referencias DOM ===
const pdfCanvas = document.querySelector("#pdfViewer");
  pdfCanvas.addEventListener("click", () => {
  goToSlide(1);
});

const pdfFallback = document.querySelector("#pdfFallback");
const slideCounter = document.querySelector("#slideCounter");
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");
const lastSlidePanel = document.querySelector("#lastSlidePanel");
const startExamButton = document.querySelector("#startExam");
const examPanel = document.querySelector("#examPanel");
const examForm = document.querySelector("#examForm");
const scoreCard = document.querySelector("#scoreCard");
const finalResultPanel = document.querySelector("#finalResultPanel");
const finalScoreCard = document.querySelector("#finalScoreCard");
const resetButton = document.querySelector("#resetExam");
const nameDialog = document.querySelector("#nameDialog");
const nameForm = document.querySelector("#nameForm");
const studentInput = document.querySelector("#studentName");
const employeeInput = document.querySelector("#employeeNumber");
const nameError = document.querySelector("#nameError");
const studentLabel = document.querySelector("#studentLabel");
const courseStatus = document.querySelector("#courseStatus");

// =========================================================================
// 1) VISOR DE PDF CON PDF.JS (evita pantallas en negro al avanzar paginas)
// =========================================================================
if (window["pdfjsLib"]) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

let pdfDocument = null;
let pdfLoadError = false;
let renderingPage = false;
let pendingPage = null;

async function loadPdfDocument() {
  if (!window["pdfjsLib"]) {
    pdfLoadError = true;
    showPdfFallback();
    return;
  }
  try {
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    pdfDocument = await loadingTask.promise;
  } catch (error) {
    console.error("No se pudo cargar el PDF del manual:", error);
    pdfLoadError = true;
    showPdfFallback();
  }
}

function showPdfFallback() {
  pdfCanvas.hidden = true;
  pdfFallback.hidden = false;
}

async function renderPage(pageNumber) {
  if (!pdfDocument || pdfLoadError) return;

  // Si ya hay un render en curso, guardamos la pagina pedida y la atendemos
  // al terminar, para no solapar renders (causa comun de "pantallas negras").
  if (renderingPage) {
    pendingPage = pageNumber;
    return;
  }
  renderingPage = true;

  try {
    const page = await pdfDocument.getPage(pageNumber);
    const container = pdfCanvas.parentElement;
    const availableWidth = container.clientWidth || 900;
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = availableWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const outputScale = window.devicePixelRatio || 1;
    pdfCanvas.width = Math.floor(viewport.width * outputScale);
    pdfCanvas.height = Math.floor(viewport.height * outputScale);
    pdfCanvas.style.width = `${Math.floor(viewport.width)}px`;
    pdfCanvas.style.height = `${Math.floor(viewport.height)}px`;

    const context = pdfCanvas.getContext("2d");
    context.clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);

    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
    await page.render({ canvasContext: context, viewport, transform }).promise;
  } catch (error) {
    console.error(`No se pudo renderizar la pagina ${pageNumber}:`, error);
  } finally {
    renderingPage = false;
    if (pendingPage !== null) {
      const next = pendingPage;
      pendingPage = null;
      renderPage(next);
    }
  }
}

function updateSlide() {
  slideCounter.textContent = `Diapositiva ${currentSlide} de ${totalSlides}`;
  prevButton.disabled = examStarted || currentSlide === 1;
  nextButton.disabled = examStarted || currentSlide === totalSlides;
  lastSlidePanel.hidden = examStarted || currentSlide !== totalSlides;
  renderPage(currentSlide);
}

function goToSlide(direction) {
  if (examStarted) return;
  currentSlide = Math.min(totalSlides, Math.max(1, currentSlide + direction));
  updateSlide();
}

window.addEventListener("resize", () => {
  if (!examStarted) renderPage(currentSlide);
});

// =========================================================================
// 2) VALIDACION DE NOMBRE (solo nombres/apellidos + filtro de groserias)
// =========================================================================

// Lista basica de palabras no permitidas en espanol (insensible a mayusculas/acentos).
const bannedWords = [
  "puto", "puta", "putos", "putas", "pendejo", "pendeja", "pendejos", "pendejas",
  "mierda", "cabron", "cabrona", "cabrones", "verga", "vergas", "chinga", "chingas",
  "chingar", "chingada", "chingado", "joder", "jodete", "culero", "culera", "culo",
  "marica", "maricon", "maricones", "puñal", "panocha", "coño", "carajo", "idiota",
  "imbecil", "estupido", "estupida", "perra", "perro", "zorra", "guey", "wey",
  "naco", "naca", "ojete", "pito", "pitos", "nalga", "nalgas", "cagada", "cagado"
];

function normalizeForCheck(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita acentos para comparar
}

function containsBannedWord(value) {
  const normalized = normalizeForCheck(value);
  const tokens = normalized.split(/[^a-z]+/).filter(Boolean);
  return tokens.some(token => bannedWords.includes(token));
}

// Solo letras (con acentos/ñ/ü), espacios y apostrofe; minimo nombre + apellido.
const namePattern = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü']+(?:\s+[A-Za-zÁÉÍÓÚÑÜáéíóúñü']+)+$/;

function validateStudentName(rawValue) {
  const value = rawValue.trim().replace(/\s+/g, " ");

  if (!value) {
    return { valid: false, value, message: "Escribe tu nombre para continuar." };
  }
  if (!namePattern.test(value)) {
    return {
      valid: false,
      value,
      message: "Usa solo letras y espacios. Escribe al menos un nombre y un apellido (sin numeros ni simbolos)."
    };
  }
  if (containsBannedWord(value)) {
    return { valid: false, value, message: "El nombre contiene una palabra no permitida. Escribe tu nombre real." };
  }
  return { valid: true, value, message: "" };
}

function showNameError(message) {
  nameError.textContent = message;
  nameError.hidden = !message;
  studentInput.setAttribute("aria-invalid", message ? "true" : "false");
}

studentInput.addEventListener("input", () => showNameError(""));

// =========================================================================
// Render del examen
// =========================================================================
function renderExam() {
  examForm.innerHTML = examQuestions.map((question, index) => `
    <fieldset class="question" id="question-${index}">
      <legend>${index + 1}. ${question.text}</legend>
      <div class="options">
        ${question.options.map((option, optionIndex) => `
          <label class="option">
            <input type="radio" name="q${index}" value="${optionIndex}" required>
            <span>${option.text}</span>
          </label>
        `).join("")}
      </div>
      <p class="feedback"></p>
    </fieldset>
  `).join("");
}

function beginExam(event) {
  event.preventDefault();
  const employeeValue = employeeInput.value.trim();

  if (!/^\d{5,10}$/.test(employeeValue)) {
    showNameError("Escribe un número de empleado válido de 5 a 10 dígitos.");
    employeeInput.focus();
    return;
  }
  const result = validateStudentName(studentInput.value);

  if (!result.valid) {
    showNameError(result.message);
    studentInput.focus();
    return;
  }

  studentName = result.value;
  employeeNumber = employeeValue;
  showNameError("");
  examStarted = true;
  examGraded = false;
  courseStatus.textContent = "Examen en curso";
  studentLabel.textContent = `Participante: ${studentName}`;
  examPanel.hidden = false;
  document.body.classList.add("exam-active");
  updateSlide();
  nameDialog.close();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =========================================================================
// 5) CALIFICACION AL FINAL (sin regresar al inicio) + boton de constancia abajo
// =========================================================================
async function gradeExam(event) {
    event.preventDefault();
    let correct = 0;

    examQuestions.forEach((question, index) => {
      const fieldset = document.querySelector(`#question-${index}`);
      const selected = examForm.querySelector(`input[name="q${index}"]:checked`);
      const feedback = fieldset.querySelector(".feedback");
      fieldset.classList.remove("correct", "incorrect", "unanswered");

      if (!selected) {
        fieldset.classList.add("unanswered");
        feedback.textContent = `Sin responder. Respuesta correcta: ${question.options.find(option => option.correct).text}.`;
        return;
      }

      if (question.options[Number(selected.value)].correct) {
        correct += 1;
        fieldset.classList.add("correct");
        feedback.textContent = "Correcto.";
      } else {
        fieldset.classList.add("incorrect");
        feedback.textContent = `Incorrecto. Respuesta correcta: ${question.options.find(option => option.correct).text}.`;
      }
    });

    lastCorrect = correct;
    lastGrade = Math.round((correct / questions.length) * 100);
    const passed = lastGrade >= passingGrade;
    examGraded = true;

    const resultHtml = `
      <strong>${lastGrade}/100</strong>
      <span>${correct} de ${questions.length} reactivos correctos. ${passed ? "Curso aprobado." : "Se requiere una calificación mínima de 80 para aprobar."}</span>
    `;

    scoreCard.innerHTML = resultHtml;
    finalScoreCard.innerHTML = resultHtml;
    finalResultPanel.hidden = false;

    if (passed) {
      const { error } = await supabaseClient
        .from("cursos_nexus")
        .insert([{
          num_empleado: employeeNumber,
          nombre_profesor: studentName,
          calificacion: lastGrade,
          correctas: correct,
          total_preguntas: questions.length,
          aprobado: true,
          fecha: new Date().toLocaleDateString("es-MX")
        }]);

      if (error) {
        console.error("Error al guardar curso:", error);
        alert("Aprobaste el curso, pero no se pudo guardar en la base de datos.");
        return;
      }

      alert("Curso terminado y aprobado. Tu resultado fue guardado correctamente.");

      resetExam();
      examStarted = false;
      document.body.classList.remove("exam-active");
      examPanel.hidden = true;
      finalResultPanel.hidden = true;
      currentSlide = 1;
      courseStatus.textContent = "Presentacion activa";
      updateSlide();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finalResultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Indicador breve arriba (estado general)...
  scoreCard.innerHTML = resultHtml;
  // ...y resultado completo al final del examen, junto al boton de constancia.
  finalScoreCard.innerHTML = resultHtml;
  finalResultPanel.hidden = false;
  certificatePanel.hidden = !passed;

  // El resultado se muestra al final del examen, no se regresa al inicio.
  finalResultPanel.scrollIntoView({ behavior: "smooth", block: "start" });

function resetExam() {
  examForm.reset();
  lastGrade = 0;
  lastCorrect = 0;
  examGraded = false;
  finalResultPanel.hidden = true;
  certificatePanel.hidden = true;
  document.querySelectorAll(".question").forEach(fieldset => {
    fieldset.classList.remove("correct", "incorrect", "unanswered");
    fieldset.querySelector(".feedback").textContent = "";
  });
  scoreCard.innerHTML = `
    <strong>Sin calificar</strong>
    <span>Responde todos los reactivos y envia el examen.</span>
  `;
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =========================================================================
// 2) CONSTANCIA: se toma la plantilla PDF y solo se escribe el nombre encima
// =========================================================================
async function buildCertificatePdfBytes() {
  if (!window["PDFLib"]) {
    throw new Error("La libreria pdf-lib no esta disponible.");
  }
  const { PDFDocument, rgb, StandardFonts } = PDFLib;

  const templateBytes = await fetch(certificateTemplatePath).then(response => {
    if (!response.ok) throw new Error("No se pudo cargar la plantilla de constancia.");
    return response.arrayBuffer();
  });

  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { x, y, fontSize, color, centerText } = certificateNameField;
  let drawX = x;

  if (centerText) {
    const textWidth = font.widthOfTextAtSize(studentName, fontSize);
    drawX = x - textWidth / 2;
  }

  page.drawText(studentName, {
    x: drawX,
    y,
    size: fontSize,
    font,
    color: rgb(color.r, color.g, color.b)
  });

  const gradeText = `${lastGrade}/100`;
    const currentDate = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  page.drawText(gradeText, {
    x: certificateGradeField.x,
    y: certificateGradeField.y,
    size: certificateGradeField.fontSize,
    font,
    color: rgb(
      certificateGradeField.color.r,
      certificateGradeField.color.g,
      certificateGradeField.color.b
    )
  });

  page.drawText(currentDate, {
    x: certificateDateField.x,
    y: certificateDateField.y,
    size: certificateDateField.fontSize,
    font,
    color: rgb(
      certificateDateField.color.r,
      certificateDateField.color.g,
      certificateDateField.color.b
    )
  });

  return pdfDoc.save();
}

async function downloadCertificate() {
  downloadCertificateButton.disabled = true;
  const originalLabel = downloadCertificateButton.textContent;
  downloadCertificateButton.textContent = "Generando...";

  try {
    const pdfBytes = await buildCertificatePdfBytes();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "participante";
    link.href = url;
    link.download = `constancia-nexus-${safeName}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("No se pudo generar la constancia:", error);
    alert("No se pudo generar la constancia. Verifica que el archivo de plantilla este disponible en assets/.");
  } finally {
    downloadCertificateButton.disabled = false;
    downloadCertificateButton.textContent = originalLabel;
  }
}

// =========================================================================
// Listeners
// =========================================================================
prevButton.addEventListener("click", () => goToSlide(-1));
nextButton.addEventListener("click", () => goToSlide(1));

window.addEventListener("keydown", (event) => {
  if (examStarted) return;

  const tag = document.activeElement.tagName.toLowerCase();

  if (tag === "input" || tag === "textarea" || tag === "select") return;

  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
    event.preventDefault();
    prevButton.click();
  }

  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    event.preventDefault();
    nextButton.click();
  }
});

startExamButton.addEventListener("click", () => {
  studentInput.value = studentName;
  showNameError("");
  nameDialog.showModal();
  studentInput.focus();
});
document.querySelector("#cancelName").addEventListener("click", () => {
  showNameError("");
  nameDialog.close();
});
nameForm.addEventListener("submit", beginExam);
examForm.addEventListener("submit", gradeExam);
resetButton.addEventListener("click", resetExam);
downloadCertificateButton.addEventListener("click", downloadCertificate);

renderExam();
loadPdfDocument().then(() => updateSlide());

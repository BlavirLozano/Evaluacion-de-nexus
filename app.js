const totalSlides = 47;
const pdfPath = "assets/Portada.pdf";
const passingGrade = 80;
const supabaseUrl = "https://hcaqiselmayfbcjofmwo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYXFpc2VsbWF5ZmJjam9mbXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTU3NjEsImV4cCI6MjA5Nzg5MTc2MX0.9YKDn7sWchdoP2ub3jQXucYYNkQ6FQW7hDp-MIFswRE";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const questions = [
  {
    text: "De acuerdo con los roles de usuario en la plataforma Nexus, ¿cuál es la función principal del rol de *Profesor*?",
    options: [
      "Gestionar los cursos Master de trabajo colegiado y de academia.",
      "Impartir los cursos asignados para el semestre vigente.",
      "Acceder únicamente a los cursos de capacitación docente.",
      "Administrar las cuentas de todos los usuarios de la plataforma."
    ],
    answer: 1  // Opción B
  },
  {
    text: "¿Cuál es una posible causa de que no aparezca mi curso en el Nexus?",
    options: [
      "El curso está en la siguiente página.",
      "Los cursos únicamente se muestran después de que el estudiantado realiza su primera actividad.",
      "El equipo de cómputo debe tener instalada una versión específica de Microsoft Office.",
      "Es obligatorio descargar la aplicación móvil de Nexus para visualizar los cursos."
    ],
    answer: 0  // Opción A
  },
  {
    text: "Antes de iniciar el semestre, ¿qué acción es recomendable realizar en la portada del curso para informar al estudiantado sobre las expectativas y lineamientos de la asignatura?",
    options: [
      "Configurar la imagen de portada del curso.",
      "Redactar el mensaje de bienvenida.",
      "Agregar los compromisos del curso.",
      "Editar las fechas de inicio y fin del curso."
    ],
    answer: 2  // Opción C
  },
  {
    text: "¿En qué apartado de la plataforma Nexus se agregan las fases del programa, las actividades, las evidencias, los recursos y la evaluación del curso?",
    options: [
      "Portada.",
      "Portafolio.",
      "Estructura.",
      "Exámenes."
    ],
    answer: 2  // Opción C
  },
  {
    text: "Antes de publicarse como disponible en Nexus, todo curso debe contar con la ficha de programa debidamente completada, incluyendo los apartados de documento, datos de identificación, representación gráfica, propósitos, fundamentación y competencias.",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
  },
  {
    text: "Al crear una evidencia y ponerla como trabajo en equipo, ¿qué debe hacer el profesor para que el alumno la pueda visualizar?",
    options: [
      "Pedirle al alumno que se dé de alta en un equipo de Nexus.",
      "Crear los equipos en la ficha de estudiantes en Nexus.",
      "Nada, se hace automáticamente.",
      "Todas las anteriores."
    ],
    answer: 1  // Opción B
  },
  {
    text: "Toda la información de las guías instruccionales debe capturarse en el apartado de Contenido, dentro de las evidencias y las actividades correspondientes.",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
  },
  {
    text: "¿Qué requerimos hacer para que los recursos sean visualizados para los estudiantes?",
    options: [
      "Dar clic en el botón mostrar a estudiantes.",
      "Subir dos veces el recurso.",
      "Solicitar al estudiante que pague su boleta de Rectoría.",
      "Nada, se hace automáticamente."
    ],
    answer: 0  // Opción A
  },
  {
    text: "¿Qué acción en la Rúbrica permite definir los niveles de desempeño que se utilizarán para evaluar la actividad?",
    options: [
      "Asignar las Competencias.",
      "Agregar el Nivel Dominio.",
      "Agregar los Criterios.",
      "Adjuntar los Recursos."
    ],
    answer: 1  // Opción B
  },
  {
    text: "¿Qué opción en la Rúbrica debe seleccionarse para incorporar un aspecto específico que será evaluado en la rúbrica?",
    options: [
      "Agregar los Criterios.",
      "Agregar el Nivel de Dominio.",
      "Asignar las Competencias.",
      "Contenidos."
    ],
    answer: 0  // Opción A
  },
  {
    text: "¿De qué formas puede el profesor acceder a las evidencias para realizar la evaluación en el apartado *Portafolio*?",
    options: [
      "Únicamente seleccionando al estudiante.",
      "Únicamente seleccionando la fase del curso.",
      "Seleccionando al estudiante o el elemento evaluable que desea revisar.",
      "Seleccionando el Programa Analítico del curso."
    ],
    answer: 2  // Opción C
  },
  {
    text: "¿Qué debe hacer el docente con el curso al inicio de clases?",
    options: [
      "Ocultarlo hasta la primera evaluación.",
      "Habilitar el curso como \"disponible\".",
      "Eliminar los contenidos anteriores.",
      "Restringir el acceso a los estudiantes."
    ],
    answer: 1  // Opción B
  },
  {
    text: "Tipo de reactivos que se pueden configurar en un examen en Nexus",
    options: [
      "Opción múltiple",
      "Falso o verdadero",
      "Relacionar columnas",
      "Todas las anteriores."
    ],
    answer: 3  // Opción D
  },
  {
    text: "Sección de Nexus que permite al profesorado comunicar al estudiantado información relevante o urgente sobre el curso, con la opción de enviar el mensaje también por correo electrónico.",
    options: [
      "Glosario",
      "Bitácora",
      "Avisos",
      "Ninguna de las anteriores."
    ],
    answer: 2  // Opción C
  },
  {
    text: "¿Es posible aplicar encuestas a través de la plataforma de enseñanza y aprendizaje Nexus?",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
  },
  {
    text: "Sección de Nexus en el cual podemos propiciar que los estudiantes den su opinión acerca de un tema específico con respeto y tolerancia hacia las opiniones de los demás.",
    options: [
      "Foro",
      "Bitácora",
      "Encuestas",
      "Ninguna de las anteriores."
    ],
    answer: 0  // Opción A
  },
  {
    text: "Sección de Nexus cuyo objetivo es mantener una comunicación constante con los estudiantes de manera individual o en equipos. Parecido a lo que es el chat de Teams.",
    options: [
      "Foro",
      "Mensajes",
      "Encuestas",
      "Glosario"
    ],
    answer: 1  // Opción B
  },
  {
    text: "Sección de Nexus en donde solamente el profesor puede agregar conceptos básicos de la unidad de aprendizaje con su respectiva definición.",
    options: [
      "Foro",
      "Mensajes",
      "Encuestas",
      "Glosario"
    ],
    answer: 3  // Opción D
  },
  {
    text: "En la modalidad no escolarizada, ¿hasta qué semana se evalúa el porcentaje de avance del curso?",
    options: [
      "Semana 16.",
      "Semana 18.",
      "Semana 20.",
      "Semana 24."
    ],
    answer: 2  // Opción C
  },
  {
    text: "¿Cuál de las siguientes acciones forma parte de los lineamientos para el uso de la plataforma digital Nexus en modalidad escolarizada y no escolarizada?",
    options: [
      "No habilitar el curso como \"disponible\"",
      "Evitar responder mensajes de estudiantes.",
      "Mantener un trato respetuoso y comunicación efectiva con el estudiantado.",
      "Limitar la participación en los foros."
    ],
    answer: 2  // Opción C
  },
  {
    text: "El tiempo de respuesta máximo es de 72 horas, para responder dudas de los estudiantes a través de mensajes, foros o correos.",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
  },
  {
    text: "El tiempo máximo para dar retroalimentación a las actividades que los estudiantes suben en su portafolio es hasta el final del semestre.",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 1  // Falso
  },
  {
    text: "La unidad de aprendizaje Seminario para el desempeño profesional, se califica con AC (Acreditado) o NC (No acreditado).",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
  },
  {
    text: "Al finalizar el semestre es importante acudir a la Secretaría de Tecnologías de la Información y Educación Digital a firmar su reporte final de asistencia en línea que genera el SIE (Sistema Integral Ejecutivo), por los siguientes motivos:",
    options: [
      "Porque se requiere en auditorías de RH",
      "Porque se requiere para evaluar a los maestros",
      "Para generar los reportes de estímulos.",
      "Todas las anteriores."
    ],
    answer: 3  // Opción D
  },
  {
    text: "Los elementos requeridos para el diseño de un curso como apoyo a la modalidad escolarizada son: portada, programa y estructura del curso.",
    options: [
      "Verdadero",
      "Falso"
    ],
    answer: 0  // Verdadero
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
      <span>${correct} de ${questions.length} reactivos correctos. ${passed ? "Curso aprobado." : "Se requiere una calificación mínima de 80 para aprobar y sera necesario volver a realizar el examen"}</span>
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


function resetExam() {
  examForm.reset();
  lastGrade = 0;
  lastCorrect = 0;
  examGraded = false;
  finalResultPanel.hidden = true;
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

renderExam();
loadPdfDocument().then(() => updateSlide());

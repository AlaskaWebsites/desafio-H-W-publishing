const form = document.querySelector("#form");
const leadFormSection = document.querySelector("#lead-form");
const productPageSection = document.querySelector("#product-page");
const userNameSpan = document.querySelector("#user-name");
const successMessage = document.querySelector("#success-message");
const successName = document.querySelector("#success-name");
const submitButton = document.querySelector("#submit-button");
const submitText = document.querySelector("#submit-text");
const submitSpinner = document.querySelector("#submit-spinner");

// Máscara de telefone
document.querySelector("#telefone").addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não é número
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Formata DDD
  value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Formata número
  event.target.value = value;
});

// Validação de e-mail
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const telefone = document.querySelector("#telefone").value;

  // Validações
  if (!nome || !email || !telefone) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (telefone.length < 14) {
    alert("Por favor, insira um telefone válido.");
    return;
  }

  // Exibe o spinner e desabilita o botão
  submitText.textContent = "Enviando...";
  submitSpinner.classList.remove("hidden");
  submitButton.disabled = true;

  // Simula o envio do formulário
  setTimeout(() => {
    // Exibe o nome do usuário na página de produto
    userNameSpan.textContent = nome;
    successName.textContent = nome;

    // Transição entre seções
    leadFormSection.classList.add("hidden");
    productPageSection.classList.remove("hidden");

    // Exibe a mensagem de sucesso
    successMessage.classList.remove("hidden");

    // Restaura o botão
    submitText.textContent = "Enviar";
    submitSpinner.classList.add("hidden");
    submitButton.disabled = false;
  }, 2000); // Simula 2 segundos de envio
});

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Modal da Galeria
const galleryImages = document.querySelectorAll(".gallery img");
const modalImage = document.querySelector("#modalImage");
const modalProgress = document.querySelector("#modalProgress");
const galleryModal = new bootstrap.Modal(
  document.getElementById("galleryModal")
);
let currentImageIndex = 0;

// Abre o modal com a imagem clicada
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    console.log("Imagem clicada:", img.src); // Log para depuração
    currentImageIndex = index;
    updateModalImage();
    galleryModal.show();
  });
});

// Atualiza a imagem no modal
function updateModalImage() {
  console.log(
    "Atualizando modal com imagem:",
    galleryImages[currentImageIndex].src
  ); // Log para depuração
  modalImage.src = galleryImages[currentImageIndex].src; // Atualiza o src da imagem no modal
  modalProgress.textContent = `Imagem ${currentImageIndex + 1} de ${
    galleryImages.length
  }`;
}

// Botão "Anterior"
document.querySelector("#prevImage").addEventListener("click", () => {
  console.log("Botão Anterior clicado"); // Log para depuração
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalImage();
});

// Botão "Próximo"
document.querySelector("#nextImage").addEventListener("click", () => {
  console.log("Botão Próximo clicado"); // Log para depuração
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateModalImage();
});

// Thumbnails do Hero Section
const thumbnails = document.querySelectorAll(".thumbnail");
const carousel = new bootstrap.Carousel("#carouselHero");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const index = thumbnail.getAttribute("data-index");
    carousel.to(index); // Muda para a imagem correspondente
  });
});

// Swiper para Depoimentos
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  grabCursor: true, // Cursor de arrastar
  autoplay: {
    delay: 5000, // 5 segundos
  },
});

// Contagem Regressiva
const timer = document.querySelector("#timer");
const endTime = new Date().getTime() + 600000; // 10 minutos

function updateTimer() {
  const now = new Date().getTime();
  const timeLeft = endTime - now;

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  if (timeLeft < 0) {
    clearInterval(interval);
    timer.textContent = "Promoção encerrada!";
  }
}

const interval = setInterval(updateTimer, 1000);

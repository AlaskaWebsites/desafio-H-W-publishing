// Seletores
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
  value = value.substring(0, 11); // Limita a 11 dígitos

  // Aplica a máscara
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Formata DDD
  value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Formata número

  event.target.value = value;
});

// Bloqueia caracteres não numéricos no telefone
document.querySelector("#telefone").addEventListener("keypress", (event) => {
  if (isNaN(event.key)) {
    event.preventDefault(); // Bloqueia caracteres não numéricos
  }
});

// Validação de e-mail
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const telefone = document.querySelector("#telefone").value;

  // Limpa mensagens de erro anteriores
  document.querySelectorAll(".is-invalid").forEach((el) => {
    el.classList.remove("is-invalid");
  });

  // Validações
  if (!nome) {
    document.querySelector("#nome").classList.add("is-invalid");
    return;
  }

  if (!validarEmail(email)) {
    document.querySelector("#email").classList.add("is-invalid");
    return;
  }

  if (telefone.replace(/\D/g, "").length !== 11) {
    document.querySelector("#telefone").classList.add("is-invalid");
    return;
  }

  // Exibe o spinner e desabilita o botão
  submitText.textContent = "Enviando...";
  submitSpinner.classList.remove("hidden");
  submitButton.disabled = true;

  // Simula o envio do formulário
  setTimeout(() => {
    const sucesso = true; // Simula sucesso ou falha
    if (sucesso) {
      userNameSpan.textContent = nome;
      successName.textContent = nome;
      leadFormSection.classList.add("hidden");
      setTimeout(() => {
        productPageSection.classList.remove("hidden");
        successMessage.classList.remove("hidden");
      }, 3000);
    } else {
      alert("Erro ao enviar o formulário. Tente novamente.");
    }

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
    currentImageIndex = index;
    updateModalImage();
    galleryModal.show();
  });
});

// Atualiza a imagem no modal
function updateModalImage() {
  modalImage.src = galleryImages[currentImageIndex].src;
  modalProgress.textContent = `Imagem ${currentImageIndex + 1} de ${
    galleryImages.length
  }`;
}

// Botão "Anterior"
document.querySelector("#prevImage").addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalImage();
});

// Botão "Próximo"
document.querySelector("#nextImage").addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateModalImage();
});

// Navegação por teclado no modal
document.addEventListener("keydown", (event) => {
  if (galleryModal._element.classList.contains("show")) {
    // Verifica se o modal está aberto
    if (event.key === "ArrowLeft") {
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      updateModalImage();
    } else if (event.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      updateModalImage();
    }
  }
});

// Thumbnails do Hero Section
const thumbnails = document.querySelectorAll(".thumbnail");
const carousel = new bootstrap.Carousel("#carouselHero");

// Atualiza a thumbnail ativa
function updateActiveThumbnail(index) {
  thumbnails.forEach((t) => t.classList.remove("active"));
  thumbnails[index].classList.add("active");
}

// Atualiza a thumbnail ativa quando o carrossel muda
document
  .querySelector("#carouselHero")
  .addEventListener("slide.bs.carousel", (event) => {
    const nextIndex = event.to;
    updateActiveThumbnail(nextIndex);
  });

// Adiciona evento de clique nas thumbnails
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    carousel.to(index);
    updateActiveThumbnail(index);
  });
});

// Swiper para Depoimentos
const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  grabCursor: true,
  autoplay: {
    delay: 5000,
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

  if (timeLeft < 10000) {
    timer.classList.add("blink");
  }

  if (timeLeft < 0) {
    clearInterval(interval);
    timer.textContent = "Promoção encerrada!";
    timer.classList.remove("blink");
  }
}

const interval = setInterval(updateTimer, 1000);

// Botão "Voltar ao Topo"
const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

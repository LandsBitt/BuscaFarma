// Estado do modo de leitura por hover
let isHoverReadingEnabled = false;
const synth = window.speechSynthesis;

// Função para alternar o modo de leitura por hover
function toggleHoverReading() {
  isHoverReadingEnabled = !isHoverReadingEnabled;
  const toggleButton = document.querySelector('#toggle-hover-reading');
  toggleButton.textContent = isHoverReadingEnabled ? 'Desativar Leitura' : 'Ativar Leitura';
  toggleButton.setAttribute('aria-label', isHoverReadingEnabled ? 'Desativar leitura por hover' : 'Ativar leitura por hover');
  
  // Adicionar ou remover a classe reading-off
  if (isHoverReadingEnabled) {
    toggleButton.classList.remove('reading-off');
  } else {
    toggleButton.classList.add('reading-off');
  }
  
  // Salvar preferência no localStorage
  localStorage.setItem('hoverReading', isHoverReadingEnabled);

  // Adicionar ou remover eventos de hover com base no estado
  if (isHoverReadingEnabled) {
    addHoverReadingEvents();
  } else {
    removeHoverReadingEvents();
    synth.cancel(); // Para qualquer leitura ativa
  }
}

// Função para ler texto de um elemento
function readElementText(element) {
  if (!isHoverReadingEnabled) return;

  // Interrompe qualquer leitura anterior
  synth.cancel();

  // Obtém o texto do elemento, priorizando innerText
  const text = element.innerText.trim() || element.textContent.trim();
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Idioma português do Brasil
    utterance.rate = 1; // Velocidade normal
    utterance.volume = 1; // Volume máximo
    synth.speak(utterance);
  }
}

// Função para adicionar eventos de hover
function addHoverReadingEvents() {
  const readableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span, button');
  readableElements.forEach(element => {
    element.addEventListener('mouseenter', () => readElementText(element));
    element.classList.add('hover-readable');
  });
}

// Função para remover eventos de hover
function removeHoverReadingEvents() {
  const readableElements = document.querySelectorAll('.hover-readable');
  readableElements.forEach(element => {
    element.removeEventListener('mouseenter', () => readElementText(element));
    element.classList.remove('hover-readable');
  });
}

// Função para aprimorar navegação por teclado
function enhanceKeyboardNavigation() {
  // Adiciona feedback visual para elementos focados
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
  interactiveElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('keyboard-focus');
    });
    element.addEventListener('blur', () => {
      element.classList.remove('keyboard-focus');
    });
  });

  // Atalhos de teclado para navegação
  document.addEventListener('keydown', (e) => {
    // Alt + 1: Pular para a seção Farmácias
    if (e.altKey && e.key === '1') {
      const farmaciasSection = document.querySelector('section.farmacias');
      if (farmaciasSection) {
        farmaciasSection.focus();
        farmaciasSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Alt + 2: Pular para a seção Quem Somos
    if (e.altKey && e.key === '2') {
      const quemSomosSection = document.getElementById('quem-somos');
      if (quemSomosSection) {
        quemSomosSection.focus();
        quemSomosSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Alt + 3: Pular para o footer
    if (e.altKey && e.key === '3') {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.focus();
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// Inicializa as funcionalidades ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  // Carregar preferência de leitura por hover
  if (localStorage.getItem('hoverReading') === 'true') {
    toggleHoverReading();
  } else {
    // Aplicar a classe reading-off inicialmente
    const toggleButton = document.querySelector('#toggle-hover-reading');
    if (toggleButton) {
      toggleButton.classList.add('reading-off');
    }
  }

  // Inicializa navegação por teclado
  enhanceKeyboardNavigation();
});
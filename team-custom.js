// Controle do menu mobile
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Efeito de fade na transição de seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Animação de entrada dos membros do time
const teamMembers = document.querySelectorAll('.team-member');

function fadeInElements() {
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        setTimeout(() => {
            member.style.transition = 'opacity 0.6s ease';
            member.style.opacity = '1';
        }, index * 300);
    });
}

window.addEventListener('load', fadeInElements);

// Prevenir comportamento padrão do menu mobile ao clicar em links
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
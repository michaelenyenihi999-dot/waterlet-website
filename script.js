// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// Product filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// Category cards also filter
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = card.getAttribute('data-filter');
    
    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

    // Activate matching filter button
    setTimeout(() => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-filter') === filter) {
          b.classList.add('active');
        }
      });
      productCards.forEach(pc => {
        if (pc.getAttribute('data-category') === filter) {
          pc.classList.remove('hide');
        } else {
          pc.classList.add('hide');
        }
      });
    }, 400);
  });
});

// Contact form → WhatsApp
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = contactForm.name.value.trim();
  const phone = contactForm.phone.value.trim();
  const email = contactForm.email.value.trim();
  const interest = contactForm.interest.value;
  const message = contactForm.message.value.trim();

  let text = `Hello Waterlet Global Empire!%0A%0A`;
  text += `*Name:* ${name}%0A`;
  text += `*Phone:* ${phone}%0A`;
  if (email) text += `*Email:* ${email}%0A`;
  text += `*Interested in:* ${interest}%0A%0A`;
  text += `*Message:*%0A${message}`;

  const waUrl = `https://wa.me/2349066227200?text=${text}`;
  window.open(waUrl, '_blank');
});

// Smooth reveal on scroll (simple)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card, .why-card, .info-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

let currentPage = 'home';

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });
    
    currentPage = pageId;
    
    // Move footer to the active page
    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    activePage.appendChild(footer);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize footer position
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    homePage.appendChild(footer);
});

// Add interactive parallax effect to background shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-shapes');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add click ripple effect to glass elements
document.querySelectorAll('.glass').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(46, 204, 113, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
    
    document.body.appendChild(successMsg);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
    
    // Reset form
    this.reset();
});

// Add fade in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(fadeStyle);

// -------------------- Search --------------------
var inputEl = document.getElementById('searchInput');
var keyword = (inputEl && inputEl.value ? inputEl.value : '').trim().toLowerCase();
var cards = document.querySelectorAll('.features.rest-features:not(.banner-section) > div');

cards.forEach(function(card) {
  var titleDiv = card.querySelector('div[style*="margin-top"]');
  if (!titleDiv) return;

  var title = (titleDiv.innerText || '').toLowerCase();
  if (keyword === '' || title.indexOf(keyword) !== -1) {
    card.style.display = '';
  } else {
    card.style.display = 'none';
  }
});

// -------------------- Pagination for demo cards --------------------
const demoCards = document.querySelectorAll('.features.rest-features.search-target > div');
const itemsPerPage = 6;
let totalPages = Math.ceil(demoCards.length / itemsPerPage);

function showDemoPage(page) {
  demoCards.forEach((card, index) => {
    card.style.display = (index >= (page-1)*itemsPerPage && index < page*itemsPerPage)
      ? "inline-block" : "none";
  });

  function createButton(pageNum, currentPage) {
    const btn = document.createElement("button");
    btn.textContent = pageNum;
    btn.style.margin = "0 5px";
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.border = "none";
    btn.style.background = (pageNum === currentPage) ? "#60f81a" : "#555";
    btn.style.color = (pageNum === currentPage) ? "#ca1010" : "#fff";
    btn.onclick = () => showDemoPage(pageNum);
    return btn;
  }

  const topPagination = document.getElementById("demo-pagination-top");
  const bottomPagination = document.getElementById("demo-pagination");

  if (topPagination) {
    topPagination.innerHTML = "";
    for (let i=1; i<=totalPages; i++) {
      topPagination.appendChild(createButton(i, page));
    }
  }
  if (bottomPagination) {
    bottomPagination.innerHTML = "";
    for (let i=1; i<=totalPages; i++) {
      bottomPagination.appendChild(createButton(i, page));
    }
  }
}

// 초기 페이지 표시
if (demoCards.length > 0) {
  showDemoPage(1);
}

})();

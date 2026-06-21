// ========== 主入口：加载配置并渲染 ==========
async function init() {
  try {
    // 并行加载配置和所有项目信息
    const configRes = await fetch('config.json');
    const config = await configRes.json();

    const projectDirs = config.projects.dirs;
    const projectPromises = projectDirs.map(dir =>
      fetch(`projects/${dir}/info.json`).then(r => r.json()).then(info => ({ dir, ...info }))
    );
    const projects = await Promise.all(projectPromises);

    // 渲染各模块
    renderNav(config);
    renderHero(config);
    renderAbout(config);
    renderExperience(config);
    renderProjects(config, projects);
    renderProjectList(config);
    renderSkills(config);
    renderContact(config);
    renderFooter(config);

    // 设置页面标题
    document.title = config.site.title;

    // 初始化交互
    initNavbar();
    initScrollReveal();
    initParticles();
    initParallax();
    initModal(projects);
  } catch (err) {
    console.error('加载配置失败:', err);
  }
}

// ========== 渲染函数 ==========

function renderNav(config) {
  document.getElementById('navLogo').textContent = config.site.logo;
  const navLinks = document.getElementById('navLinks');
  navLinks.innerHTML = config.nav.links.map(link =>
    `<li><a href="${link.href}">${link.label}</a></li>`
  ).join('');
}

function renderHero(config) {
  const h = config.hero;
  const chars = [...h.name].map((c, i) =>
    `<span class="char" style="--i:${i}">${c}</span>`
  ).join('');

  document.getElementById('heroContent').innerHTML = `
    <p class="hero-greeting">${h.greeting}</p>
    <h1 class="hero-name">${chars}</h1>
    <p class="hero-tagline">${h.tagline}</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">
        ${h.cta_primary}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="#contact" class="btn btn-outline">${h.cta_secondary}</a>
    </div>
  `;

  document.getElementById('heroAvatar').innerHTML = `
    <div class="avatar-placeholder">${h.avatar_emoji}</div>
  `;
}

function renderAbout(config) {
  const a = config.about;
  const advantagesHTML = a.advantages.map(text =>
    `<li><span class="list-icon">✦</span><span>${text}</span></li>`
  ).join('');

  const statsHTML = a.stats.map(s =>
    `<div class="stat-card">
      <span class="stat-number">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>`
  ).join('');

  document.getElementById('aboutContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${a.tag}</span>
      <h2 class="section-title">${a.title}</h2>
    </div>
    <div class="about-grid">
      <div class="about-text">
        <h3>${a.subtitle}</h3>
        <ul class="about-list">${advantagesHTML}</ul>
      </div>
      <div class="about-stats">${statsHTML}</div>
    </div>
  `;
}

function renderExperience(config) {
  const e = config.experience;
  const itemsHTML = e.items.map(item => {
    const detailsHTML = item.details.map(d => `<li>${d}</li>`).join('');
    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-content">
          <span class="timeline-type">${item.type}</span>
          <h3>${item.role}</h3>
          <p class="timeline-company">${item.company}</p>
          <ul>${detailsHTML}</ul>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('experienceContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${e.tag}</span>
      <h2 class="section-title">${e.title}</h2>
    </div>
    <div class="timeline">${itemsHTML}</div>
  `;
}

function renderProjects(config, projects) {
  const p = config.projects;
  const gradientColors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#ffecd2', '#fcb69f'],
  ];

  const cardsHTML = projects.map((proj, i) => {
    const grad = proj.gradient || gradientColors[i % gradientColors.length];
    const gradStr = `linear-gradient(135deg, ${grad[0]} 0%, ${grad[1]} 100%)`;
    return `
      <div class="project-card" data-project="${proj.dir}">
        <div class="project-thumb" style="background: ${gradStr};">
          <div class="project-icon">${proj.icon}</div>
          <span class="project-tag">${proj.category}</span>
        </div>
        <div class="project-info">
          <h4>${proj.name}</h4>
          <p>${proj.description}</p>
          <span class="project-link">查看详情 →</span>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('projectsContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${p.tag}</span>
      <h2 class="section-title">${p.title}</h2>
      <p class="section-desc">${p.desc}</p>
    </div>
    <div class="project-grid">${cardsHTML}</div>
  `;
}

function renderProjectList(config) {
  const pl = config.projectList;
  const groupsHTML = pl.groups.map(g => {
    const itemsHTML = g.items.map(item => `<li>${item}</li>`).join('');
    return `
      <div class="list-group">
        <h3>${g.name}</h3>
        <ul>${itemsHTML}</ul>
      </div>
    `;
  }).join('');

  document.getElementById('projectListContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${pl.tag}</span>
      <h2 class="section-title">${pl.title}</h2>
      <p class="section-desc">${pl.desc}</p>
    </div>
    <div class="list-grid">${groupsHTML}</div>
  `;
}

function renderSkills(config) {
  const s = config.skills;
  const tagsHTML = s.items.map(item =>
    `<span class="skill-tag">${item}</span>`
  ).join('');

  document.getElementById('skillsContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${s.tag}</span>
      <h2 class="section-title">${s.title}</h2>
    </div>
    <div class="skills-cloud">${tagsHTML}</div>
  `;
}

function renderContact(config) {
  const c = config.contact;
  const itemsHTML = c.items.map(item =>
    `<a href="${item.href}" class="contact-card">
      <div class="contact-icon">${item.icon}</div>
      <span>${item.label}</span>
    </a>`
  ).join('');

  document.getElementById('contactContainer').innerHTML = `
    <div class="section-header">
      <span class="section-tag">${c.tag}</span>
      <h2 class="section-title">${c.title}</h2>
      <p class="section-desc">${c.desc}</p>
    </div>
    <div class="contact-links">${itemsHTML}</div>
  `;
}

function renderFooter(config) {
  document.getElementById('footer').innerHTML = `
    <div class="container"><p>${config.footer}</p></div>
  `;
}

// ========== 作品详情弹窗 ==========
function initModal(projects) {
  const overlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalClose');

  function openModal(project) {
    const imagesHTML = project.images && project.images.length > 0
      ? project.images.map(img =>
          `<img src="projects/${project.dir}/images/${img}" alt="${project.name}" class="modal-image" loading="lazy">`
        ).join('')
      : `<div class="modal-placeholder">
           <span style="font-size:64px">${project.icon}</span>
           <p>暂无图片，请将图片放入 projects/${project.dir}/images/ 目录</p>
         </div>`;

    modalBody.innerHTML = `
      <div class="modal-header">
        <span class="modal-category">${project.category}</span>
        <h2>${project.name}</h2>
      </div>
      <p class="modal-desc">${project.description}</p>
      <div class="modal-gallery">${imagesHTML}</div>
    `;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 点击卡片打开弹窗
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const dir = card.dataset.project;
      const project = projects.find(p => p.dir === dir);
      if (project) openModal(project);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ========== 导航栏交互 ==========
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // 滚动阴影
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 移动端菜单
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('active');
    }
  });

  // 滚动时高亮当前导航
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

// ========== 滚动渐显动画 ==========
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // 需要在渲染完成后观察，使用 MutationObserver 或延迟
  setTimeout(() => {
    document.querySelectorAll('.section, .project-card, .stat-card, .list-group, .timeline-item, .skill-tag, .contact-card').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }, 100);
}

// ========== Hero 粒子背景 ==========
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      background: `hsl(${Math.random() * 60 + 330}, 80%, ${Math.random() * 30 + 60}%)`,
      borderRadius: '50%',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      animation: `particleFloat ${Math.random() * 4 + 6}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 5}s`,
    });
    container.appendChild(particle);
  }

  // 注入粒子动画关键帧
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
        50% { transform: translateY(-10px) translateX(-15px); opacity: 0.4; }
        75% { transform: translateY(-40px) translateX(10px); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== 视差滚动 ==========
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrollY < window.innerHeight) {
      heroVisual.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
    }
  });
}

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', init);
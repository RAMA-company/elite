// ===== STATE MANAGEMENT =====
const state = {
  // Project data
  project: {
    title: "My Landing Page",
    description: "A professional landing page created with RAMA STUDIO",
    theme: {
      primary: "#6366f1",
      secondary: "#10b981",
      accent: "#8b5cf6",
      background: "#0f172a",
      text: "#f8fafc",
      borderRadius: "16px",
      fontFamily: "'Inter', sans-serif",
      animation: "fade"
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      slug: ""
    },
    components: [],
    lastSaved: new Date()
  },
  
  // UI state
  ui: {
    activeComponent: null,
    paymentStatus: "unpaid", // unpaid, pending, completed
    loading: false,
    darkMode: true,
    notifications: []
  },
  
  // Constants
  ZIP_PASSWORD: "R@m@S3cur3P@$$2023!",
  COMPONENT_TYPES: [
    "hero", "features", "testimonials", "gallery", "chart", 
    "cta", "text", "contact", "team", "social", "about", 
    "faq", "pricing", "timeline", "counter", "video", "map"
  ],
  
  // Templates for components
  COMPONENT_TEMPLATES: {
    hero: {
      title: "Welcome to My Landing Page",
      subtitle: "A short description of what you offer",
      buttonText: "Get Started",
      buttonLink: "#"
    },
    features: {
      title: "Key Features",
      items: [
        { icon: "fa-star", title: "Feature 1", description: "Description of feature 1" },
        { icon: "fa-bolt", title: "Feature 2", description: "Description of feature 2" },
        { icon: "fa-lock", title: "Feature 3", description: "Description of feature 3" }
      ]
    },
    testimonials: {
      title: "What Our Clients Say",
      items: [
        { 
          name: "John Doe", 
          role: "CEO, Company", 
          content: "This product changed our business!",
          avatar: null
        },
        { 
          name: "Jane Smith", 
          role: "Marketing Director", 
          content: "Incredible results in just one week.",
          avatar: null
        }
      ]
    },
    team: {
      title: "Our Team",
      members: [
        { 
          name: "Alex Johnson", 
          role: "CEO", 
          bio: "10+ years of industry experience",
          avatar: null
        },
        { 
          name: "Sarah Williams", 
          role: "Design Lead", 
          bio: "Creative director with 8 years experience",
          avatar: null
        }
      ]
    },
    social: {
      title: "Connect With Us",
      platforms: [
        { icon: "fa-facebook", link: "#" },
        { icon: "fa-twitter", link: "#" },
        { icon: "fa-instagram", link: "#" },
        { icon: "fa-linkedin", link: "#" },
        { icon: "fa-github", link: "#" }
      ]
    },
    about: {
      title: "About Our Company",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: null
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { question: "How does this work?", answer: "It works great!" },
        { question: "Is there a free trial?", answer: "Yes, 14 days free trial" },
        { question: "Can I cancel anytime?", answer: "Yes, no questions asked" }
      ]
    },
    pricing: {
      title: "Pricing Plans",
      plans: [
        { 
          name: "Basic", 
          price: "$19", 
          period: "per month",
          features: ["Feature 1", "Feature 2", "Feature 3"],
          buttonText: "Get Started"
        },
        { 
          name: "Pro", 
          price: "$49", 
          period: "per month",
          features: ["All Basic features", "Feature 4", "Feature 5", "Feature 6"],
          buttonText: "Get Started",
          highlighted: true
        },
        { 
          name: "Enterprise", 
          price: "$99", 
          period: "per month",
          features: ["All Pro features", "Feature 7", "Feature 8", "Priority Support"],
          buttonText: "Contact Sales"
        }
      ]
    }
  }
};

// ===== DOM ELEMENTS =====
const dom = {
  // Canvas elements
  canvas: document.getElementById('canvas'),
  dropZone: document.querySelector('.drop-zone'),
  
  // Header elements
  lastSaved: document.getElementById('last-saved'),
  themeToggle: document.getElementById('theme-toggle'),
  
  // Component panel
  componentsGrid: document.getElementById('components-grid'),
  componentSearch: document.getElementById('component-search'),
  
  // Canvas actions
  clearBtn: document.getElementById('clear-btn'),
  resetBtn: document.getElementById('reset-btn'),
  addSectionBtn: document.getElementById('add-section-btn'),
  previewBtn: document.getElementById('preview-btn'),
  exportBtn: document.getElementById('export-btn'),
  
  // Customization
  primaryColor: document.getElementById('primary-color'),
  secondaryColor: document.getElementById('secondary-color'),
  backgroundColor: document.getElementById('background-color'),
  fontFamily: document.getElementById('font-family'),
  animationStyle: document.getElementById('animation-style'),
  borderRadius: document.getElementById('border-radius'),
  
  // SEO elements
  metaTitle: document.getElementById('meta-title'),
  metaDescription: document.getElementById('meta-description'),
  keywords: document.getElementById('keywords'),
  slug: document.getElementById('slug'),
  seoScoreValue: document.getElementById('score-value'),
  titleCount: document.getElementById('title-count'),
  descriptionCount: document.getElementById('description-count'),
  keywordsCount: document.getElementById('keywords-count'),
  
  // Export elements
  pageTitle: document.getElementById('page-title'),
  exportFormat: document.getElementById('export-format'),
  
  // Payment elements
  paymentSection: document.getElementById('payment-section'),
  passwordSection: document.getElementById('password-section'),
  zipPassword: document.getElementById('zip-password'),
  copyPasswordBtn: document.getElementById('copy-password-btn'),
  
  // Modals
  componentsModal: document.getElementById('components-modal'),
  closeComponentsModal: document.getElementById('close-components-modal'),
  modalComponentsGrid: document.getElementById('modal-components-grid'),
  previewModal: document.getElementById('preview-modal'),
  closePreviewModal: document.getElementById('close-preview-modal'),
  previewContent: document.getElementById('preview-content'),
  
  // Notification
  notification: document.getElementById('notification'),
  
  // Loading overlay
  loadingOverlay: document.getElementById('loading-overlay')
};

// ===== INITIALIZATION =====
function initBuilder() {
  // Load saved project from localStorage
  loadProject();
  
  // Set up event listeners
  setupEventListeners();
  
  // Render initial components
  renderComponents();
  
  // Render the canvas
  renderCanvas();
  
  // Update UI state
  updateUI();
}

// ===== PROJECT MANAGEMENT =====
function loadProject() {
  const savedProject = localStorage.getItem('landingProject');
  if (savedProject) {
    try {
      state.project = JSON.parse(savedProject);
      showNotification("Project loaded successfully");
    } catch (e) {
      console.error("Error loading project:", e);
      showNotification("Error loading project. Starting fresh.", "error");
    }
  }
}

function saveProject() {
  state.project.lastSaved = new Date();
  localStorage.setItem('landingProject', JSON.stringify(state.project));
  updateLastSaved();
}

function resetProject() {
  if (confirm("Are you sure you want to reset the project? All unsaved changes will be lost.")) {
    state.project = {
      title: "My Landing Page",
      description: "A professional landing page created with RAMA STUDIO",
      theme: {
        primary: "#6366f1",
        secondary: "#10b981",
        accent: "#8b5cf6",
        background: "#0f172a",
        text: "#f8fafc",
        borderRadius: "16px",
        fontFamily: "'Inter', sans-serif",
        animation: "fade"
      },
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        slug: ""
      },
      components: [],
      lastSaved: new Date()
    };
    
    state.ui.paymentStatus = "unpaid";
    saveProject();
    renderCanvas();
    showNotification("Project reset successfully");
  }
}

// ===== COMPONENT MANAGEMENT =====
function addComponent(type, position = -1) {
  const component = {
    id: Date.now().toString(),
    type,
    data: JSON.parse(JSON.stringify(state.COMPONENT_TEMPLATES[type] || {}))
  };
  
  if (position === -1 || position >= state.project.components.length) {
    state.project.components.push(component);
  } else {
    state.project.components.splice(position, 0, component);
  }
  
  saveProject();
  renderCanvas();
  showNotification(`Added ${type} component`);
}

function removeComponent(id) {
  const index = state.project.components.findIndex(c => c.id === id);
  if (index !== -1) {
    state.project.components.splice(index, 1);
    saveProject();
    renderCanvas();
    showNotification("Component removed");
  }
}

function moveComponent(id, direction) {
  const index = state.project.components.findIndex(c => c.id === id);
  if (index === -1) return;
  
  const newIndex = direction === "up" ? index - 1 : index + 1;
  
  if (newIndex >= 0 && newIndex < state.project.components.length) {
    [state.project.components[index], state.project.components[newIndex]] = 
      [state.project.components[newIndex], state.project.components[index]];
    saveProject();
    renderCanvas();
  }
}

function updateComponentData(id, data) {
  const component = state.project.components.find(c => c.id === id);
  if (component) {
    component.data = { ...component.data, ...data };
    saveProject();
  }
}

// ===== RENDERING FUNCTIONS =====
function renderComponents() {
  // Clear existing components
  dom.componentsGrid.innerHTML = "";
  
  // Render component cards
  state.COMPONENT_TYPES.forEach(type => {
    const card = document.createElement('div');
    card.className = 'component-card';
    card.draggable = true;
    card.dataset.type = type;
    
    card.innerHTML = `
      <div class="component-icon">
        <i class="fas ${getComponentIcon(type)}"></i>
      </div>
      <div class="component-name">${getComponentName(type)}</div>
    `;
    
    dom.componentsGrid.appendChild(card);
  });
}

function renderCanvas() {
  // Clear canvas
  dom.canvas.innerHTML = "";
  
  // Show drop zone if no components
  if (state.project.components.length === 0) {
    dom.canvas.innerHTML = `
      <div class="drop-zone">
        <i class="fas fa-arrow-down"></i>
        <h3>Drag components here</h3>
        <p>Start building your landing page by dragging components from the left panel</p>
      </div>
    `;
    return;
  }
  
  // Render components
  state.project.components.forEach((component, index) => {
    const compElement = document.createElement('div');
    compElement.className = 'component';
    compElement.dataset.id = component.id;
    
    // Add component header
    compElement.innerHTML = `
      <div class="component-header">
        <div class="component-title">
          <i class="fas ${getComponentIcon(component.type)}"></i>
          ${getComponentName(component.type)}
        </div>
        <div class="component-actions">
          <div class="action-btn" data-action="move-up" title="Move up">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="action-btn" data-action="move-down" title="Move down">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div class="action-btn" data-action="remove" title="Remove">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    `;
    
    // Add component body based on type
    const body = document.createElement('div');
    body.className = 'component-body';
    body.innerHTML = renderComponentForm(component);
    compElement.appendChild(body);
    
    dom.canvas.appendChild(compElement);
  });
}

function renderComponentForm(component) {
  switch (component.type) {
    case 'hero':
      return `
        <div class="form-group">
          <label>Title</label>
          <input type="text" value="${component.data.title}" 
                 onchange="updateComponentData('${component.id}', {title: this.value})">
        </div>
        <div class="form-group">
          <label>Subtitle</label>
          <textarea onchange="updateComponentData('${component.id}', {subtitle: this.value})">${component.data.subtitle}</textarea>
        </div>
        <div class="form-group">
          <label>Button Text</label>
          <input type="text" value="${component.data.buttonText}" 
                 onchange="updateComponentData('${component.id}', {buttonText: this.value})">
        </div>
        <div class="form-group">
          <label>Button Link</label>
          <input type="text" value="${component.data.buttonLink}" 
                 onchange="updateComponentData('${component.id}', {buttonLink: this.value})">
        </div>
      `;
      
    case 'team':
      return `
        <div class="form-group">
          <label>Section Title</label>
          <input type="text" value="${component.data.title}" 
                 onchange="updateComponentData('${component.id}', {title: this.value})">
        </div>
        <div class="form-group">
          <label>Team Members</label>
          <div class="members-list">
            ${component.data.members.map((member, idx) => `
              <div class="member-item">
                <h4>Member ${idx + 1}</h4>
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" value="${member.name}" 
                         onchange="updateTeamMember('${component.id}', ${idx}, 'name', this.value)">
                </div>
                <div class="form-group">
                  <label>Role</label>
                  <input type="text" value="${member.role}" 
                         onchange="updateTeamMember('${component.id}', ${idx}, 'role', this.value)">
                </div>
                <div class="form-group">
                  <label>Bio</label>
                  <textarea onchange="updateTeamMember('${component.id}', ${idx}, 'bio', this.value)">${member.bio}</textarea>
                </div>
                <div class="form-group">
                  <label>Avatar</label>
                  <input type="file" accept="image/*" 
                         onchange="handleTeamAvatarUpload('${component.id}', ${idx}, this)">
                </div>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-outline" onclick="addTeamMember('${component.id}')">
            <i class="fas fa-plus"></i> Add Member
          </button>
        </div>
      `;
      
    case 'social':
      return `
        <div class="form-group">
          <label>Section Title</label>
          <input type="text" value="${component.data.title}" 
                 onchange="updateComponentData('${component.id}', {title: this.value})">
        </div>
        <div class="form-group">
          <label>Social Platforms</label>
          <div class="platforms-list">
            ${component.data.platforms.map((platform, idx) => `
              <div class="platform-item">
                <div class="form-group">
                  <label>Platform</label>
                  <select onchange="updateSocialPlatform('${component.id}', ${idx}, 'icon', this.value)">
                    <option value="fa-facebook" ${platform.icon === 'fa-facebook' ? 'selected' : ''}>Facebook</option>
                    <option value="fa-twitter" ${platform.icon === 'fa-twitter' ? 'selected' : ''}>Twitter</option>
                    <option value="fa-instagram" ${platform.icon === 'fa-instagram' ? 'selected' : ''}>Instagram</option>
                    <option value="fa-linkedin" ${platform.icon === 'fa-linkedin' ? 'selected' : ''}>LinkedIn</option>
                    <option value="fa-github" ${platform.icon === 'fa-github' ? 'selected' : ''}>GitHub</option>
                    <option value="fa-youtube" ${platform.icon === 'fa-youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="fa-pinterest" ${platform.icon === 'fa-pinterest' ? 'selected' : ''}>Pinterest</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Link</label>
                  <input type="text" value="${platform.link}" 
                         onchange="updateSocialPlatform('${component.id}', ${idx}, 'link', this.value)">
                </div>
                <button class="action-btn" onclick="removeSocialPlatform('${component.id}', ${idx})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-outline" onclick="addSocialPlatform('${component.id}')">
            <i class="fas fa-plus"></i> Add Platform
          </button>
        </div>
      `;
      
    case 'about':
      return `
        <div class="form-group">
          <label>Section Title</label>
          <input type="text" value="${component.data.title}" 
                 onchange="updateComponentData('${component.id}', {title: this.value})">
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea onchange="updateComponentData('${component.id}', {content: this.value})">${component.data.content}</textarea>
        </div>
        <div class="form-group">
          <label>Image</label>
          <input type="file" accept="image/*" onchange="handleAboutImageUpload('${component.id}', this)">
          ${component.data.image ? `<img src="${component.data.image}" class="image-preview">` : ''}
        </div>
      `;
      
    // Add cases for other component types here...
      
    default:
      return `<p>Edit form for ${component.type} component</p>`;
  }
}

function renderPreview() {
  dom.previewContent.innerHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Preview - ${state.project.title}</title>
      <style>
        body {
          font-family: ${state.project.theme.fontFamily};
          background: ${state.project.theme.background};
          color: ${state.project.theme.text};
          padding: 20px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section {
          margin: 40px 0;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: ${state.project.theme.borderRadius};
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background: ${state.project.theme.primary};
          color: white;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${state.project.components.map(component => renderPreviewComponent(component)).join('')}
      </div>
    </body>
    </html>
  `;
}

function renderPreviewComponent(component) {
  switch (component.type) {
    case 'hero':
      return `
        <div class="section" style="text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #0f172a, #1e293b);">
          <h1>${component.data.title}</h1>
          <p>${component.data.subtitle}</p>
          <a href="${component.data.buttonLink}" class="btn">${component.data.buttonText}</a>
        </div>
      `;
      
    case 'team':
      return `
        <div class="section">
          <h2>${component.data.title}</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
            ${component.data.members.map(member => `
              <div style="text-align: center;">
                ${member.avatar ? `<img src="${member.avatar}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;">` : 
                  `<div style="width: 100px; height: 100px; background: #4f46e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px; margin: 0 auto 15px;">
                    <i class="fas fa-user"></i>
                  </div>`}
                <h3>${member.name}</h3>
                <p style="color: #94a3b8;">${member.role}</p>
                <p>${member.bio}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'social':
      return `
        <div class="section" style="text-align: center;">
          <h2>${component.data.title}</h2>
          <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
            ${component.data.platforms.map(platform => `
              <a href="${platform.link}" style="display: inline-block; width: 50px; height: 50px; background: #334155; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">
                <i class="fab ${platform.icon}"></i>
              </a>
            `).join('')}
          </div>
        </div>
      `;
      
    case 'about':
      return `
        <div class="section">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
            <div>
              <h2>${component.data.title}</h2>
              <p>${component.data.content}</p>
            </div>
            ${component.data.image ? `<img src="${component.data.image}" style="border-radius: 16px;">` : 
              `<div style="background: #1e293b; height: 300px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                <i class="fas fa-image" style="font-size: 60px;"></i>
              </div>`}
          </div>
        </div>
      `;
      
    // Add cases for other component types here...
      
    default:
      return `<div class="section"><h2>${component.type} Component</h2><p>Preview for this component type</p></div>`;
  }
}

// ===== DRAG AND DROP =====
function setupDragAndDrop() {
  // Setup draggable components
  document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.dataset.type);
    });
  });
  
  // Canvas drop events
  dom.canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
    dom.canvas.classList.add('dragover');
  });
  
  dom.canvas.addEventListener('dragleave', () => {
    dom.canvas.classList.remove('dragover');
  });
  
  dom.canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    dom.canvas.classList.remove('dragover');
    
    const type = e.dataTransfer.getData('text/plain');
    if (type) {
      addComponent(type);
    }
  });
}

// ===== EVENT HANDLERS =====
function setupEventListeners() {
  // Theme toggle
  dom.themeToggle.addEventListener('click', toggleTheme);
  
  // Component search
  dom.componentSearch.addEventListener('input', filterComponents);
  
  // Canvas actions
  dom.clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all components?")) {
      state.project.components = [];
      saveProject();
      renderCanvas();
      showNotification("All components cleared");
    }
  });
  
  dom.resetBtn.addEventListener('click', resetProject);
  
  dom.addSectionBtn.addEventListener('click', () => {
    dom.componentsModal.style.display = 'block';
  });
  
  dom.previewBtn.addEventListener('click', () => {
    renderPreview();
    dom.previewModal.style.display = 'block';
  });
  
  dom.exportBtn.addEventListener('click', exportProject);
  
  // Component actions
  dom.canvas.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('.action-btn');
    if (!actionBtn) return;
    
    const component = actionBtn.closest('.component');
    if (!component) return;
    
    const componentId = component.dataset.id;
    const action = actionBtn.dataset.action;
    
    if (action === 'remove') {
      removeComponent(componentId);
    } else if (action === 'move-up') {
      moveComponent(componentId, 'up');
    } else if (action === 'move-down') {
      moveComponent(componentId, 'down');
    }
  });
  
  // Customization
  dom.primaryColor.addEventListener('change', (e) => {
    state.project.theme.primary = e.target.value;
    saveProject();
    updateTheme();
  });
  
  dom.secondaryColor.addEventListener('change', (e) => {
    state.project.theme.secondary = e.target.value;
    saveProject();
    updateTheme();
  });
  
  dom.backgroundColor.addEventListener('change', (e) => {
    state.project.theme.background = e.target.value;
    saveProject();
    updateTheme();
  });
  
  dom.fontFamily.addEventListener('change', (e) => {
    state.project.theme.fontFamily = e.target.value;
    saveProject();
    updateTheme();
  });
  
  dom.animationStyle.addEventListener('change', (e) => {
    state.project.theme.animation = e.target.value;
    saveProject();
  });
  
  dom.borderRadius.addEventListener('input', (e) => {
    state.project.theme.borderRadius = `${e.target.value}px`;
    saveProject();
    updateTheme();
  });
  
  // SEO
  dom.metaTitle.addEventListener('input', (e) => {
    state.project.seo.metaTitle = e.target.value;
    saveProject();
    updateSeoScore();
  });
  
  dom.metaDescription.addEventListener('input', (e) => {
    state.project.seo.metaDescription = e.target.value;
    saveProject();
    updateSeoScore();
  });
  
  dom.keywords.addEventListener('input', (e) => {
    state.project.seo.keywords = e.target.value;
    saveProject();
    updateSeoScore();
  });
  
  dom.slug.addEventListener('input', (e) => {
    state.project.seo.slug = e.target.value;
    saveProject();
    updateSeoScore();
  });
  
  // Export
  dom.pageTitle.addEventListener('input', (e) => {
    state.project.title = e.target.value;
    saveProject();
  });
  
  dom.exportFormat.addEventListener('change', (e) => {
    if (e.target.value === 'zip' && state.ui.paymentStatus !== 'completed') {
      dom.paymentSection.style.display = 'block';
    } else {
      dom.paymentSection.style.display = 'none';
    }
  });
  
  // Payment
  dom.copyPasswordBtn.addEventListener('click', copyPassword);
  
  // Modals
  dom.closeComponentsModal.addEventListener('click', () => {
    dom.componentsModal.style.display = 'none';
  });
  
  dom.closePreviewModal.addEventListener('click', () => {
    dom.previewModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === dom.componentsModal) {
      dom.componentsModal.style.display = 'none';
    }
    if (e.target === dom.previewModal) {
      dom.previewModal.style.display = 'none';
    }
  });
  
  // Listen for payment messages
  window.addEventListener('message', (event) => {
    if (event.origin !== "https://nowpayments.io") return;
    
    if (event.data.event === "payment_completed") {
      handlePaymentSuccess();
    }
  });
  
  // Setup drag and drop
  setupDragAndDrop();
}

// ===== HELPER FUNCTIONS =====
function getComponentIcon(type) {
  const icons = {
    'hero': 'fa-heading',
    'features': 'fa-star',
    'testimonials': 'fa-quote-left',
    'gallery': 'fa-images',
    'chart': 'fa-chart-bar',
    'cta': 'fa-bullhorn',
    'text': 'fa-text-height',
    'contact': 'fa-envelope',
    'team': 'fa-users',
    'social': 'fa-hashtag',
    'about': 'fa-info-circle',
    'faq': 'fa-question-circle',
    'pricing': 'fa-tags',
    'timeline': 'fa-history',
    'counter': 'fa-chart-line',
    'video': 'fa-video',
    'map': 'fa-map-marked-alt'
  };
  return icons[type] || 'fa-cube';
}

function getComponentName(type) {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function updateUI() {
  // Update last saved
  updateLastSaved();
  
  // Update theme
  updateTheme();
  
  // Update SEO score
  updateSeoScore();
  
  // Update payment status
  if (state.ui.paymentStatus === 'completed') {
    dom.passwordSection.style.display = 'block';
    dom.paymentSection.style.display = 'none';
    dom.zipPassword.textContent = state.ZIP_PASSWORD;
  } else {
    dom.passwordSection.style.display = 'none';
  }
}

function updateLastSaved() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  dom.lastSaved.textContent = `Changes saved: ${timeString}`;
}

function updateTheme() {
  // Update CSS variables
  document.documentElement.style.setProperty('--primary', state.project.theme.primary);
  document.documentElement.style.setProperty('--secondary', state.project.theme.secondary);
  document.documentElement.style.setProperty('--background', state.project.theme.background);
  document.documentElement.style.setProperty('--border-radius', state.project.theme.borderRadius);
  document.documentElement.style.setProperty('--font-main', state.project.theme.fontFamily);
}

function updateSeoScore() {
  let score = 82;
  
  // Calculate score based on SEO fields
  const title = state.project.seo.metaTitle || '';
  const description = state.project.seo.metaDescription || '';
  const keywords = state.project.seo.keywords || '';
  
  // Title length score (optimal 50-60 chars)
  const titleLength = title.length;
  if (titleLength >= 50 && titleLength <= 60) {
    score += 5;
  } else {
    score -= 10;
  }
  
  // Description length score (optimal 120-150 chars)
  const descLength = description.length;
  if (descLength >= 120 && descLength <= 150) {
    score += 5;
  } else {
    score -= 5;
  }
  
  // Keywords count
  const keywordCount = keywords.split(',').filter(k => k.trim()).length;
  if (keywordCount >= 3 && keywordCount <= 5) {
    score += 3;
  } else if (keywordCount > 5) {
    score -= 2;
  }
  
  // Slug (clean and descriptive)
  const slug = state.project.seo.slug || '';
  if (slug && slug.match(/^[a-z0-9\-]+$/)) {
    score += 5;
  } else if (slug) {
    score -= 3;
  }
  
  // Ensure score is within 0-100 range
  score = Math.max(0, Math.min(100, score));
  
  // Update UI
  state.project.seo.score = score;
  dom.seoScoreValue.textContent = score;
  
  // Update character counts
  dom.titleCount.textContent = title.length;
  dom.descriptionCount.textContent = description.length;
  dom.keywordsCount.textContent = keywordCount;
}

function filterComponents() {
  const searchTerm = dom.componentSearch.value.toLowerCase();
  
  document.querySelectorAll('.component-card').forEach(card => {
    const type = card.dataset.type;
    const name = getComponentName(type).toLowerCase();
    
    if (name.includes(searchTerm) || type.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function toggleTheme() {
  state.ui.darkMode = !state.ui.darkMode;
  document.body.classList.toggle('light-mode', !state.ui.darkMode);
  dom.themeToggle.innerHTML = state.ui.darkMode ? 
    '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  showNotification(`Switched to ${state.ui.darkMode ? 'dark' : 'light'} mode`);
}

function showNotification(message, type = "success") {
  const notification = dom.notification.cloneNode(true);
  notification.id = "";
  notification.classList.add('show');
  notification.querySelector('div').textContent = message;
  
  // Set icon based on type
  const icon = notification.querySelector('i');
  if (type === "error") {
    icon.className = "fas fa-exclamation-circle";
    notification.style.backgroundColor = "#7f1d1d";
  } else if (type === "warning") {
    icon.className = "fas fa-exclamation-triangle";
    notification.style.backgroundColor = "#854d0e";
  } else {
    icon.className = "fas fa-check-circle";
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function showLoading(show) {
  dom.loadingOverlay.style.display = show ? 'flex' : 'none';
}

// ===== PAYMENT FUNCTIONS =====
function handlePaymentSuccess() {
  state.ui.paymentStatus = 'completed';
  updateUI();
  showNotification("Payment completed! Your ZIP password is now available.");
}

function copyPassword() {
  navigator.clipboard.writeText(state.ZIP_PASSWORD)
    .then(() => {
      showNotification("Password copied to clipboard!");
    })
    .catch(err => {
      console.error('Failed to copy password:', err);
      showNotification("Failed to copy password", "error");
    });
}

// ===== EXPORT FUNCTIONS =====
function exportProject() {
  showLoading(true);
  
  // Determine export format
  const format = dom.exportFormat.value;
  
  if (format === 'zip' && state.ui.paymentStatus !== 'completed') {
    showNotification("Please complete payment to export as ZIP", "warning");
    showLoading(false);
    return;
  }
  
  // Generate HTML content
  const htmlContent = generateHTMLExport();
  
  if (format === 'html') {
    // Export as HTML file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.project.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification("HTML file downloaded successfully");
  } else if (format === 'zip') {
    // Export as ZIP file
    const zip = new JSZip();
    zip.file("index.html", htmlContent);
    zip.file("README.txt", `This ZIP file is password protected.\nUse password: ${state.ZIP_PASSWORD}\n\nExtract files using your preferred archive software.`);
    
    zip.generateAsync({
      type: "blob",
      encryption: "AES-256",
      password: state.ZIP_PASSWORD
    })
    .then(blob => {
      saveAs(blob, `${state.project.title.replace(/\s+/g, '-').toLowerCase()}.zip`);
      showNotification("ZIP file downloaded successfully");
    })
    .catch(error => {
      console.error("Error creating ZIP file:", error);
      showNotification("Error creating ZIP file", "error");
    });
  } else if (format === 'github') {
    // Export to GitHub (simulated)
    setTimeout(() => {
      showNotification("GitHub export would be initiated here. This is a simulation.", "info");
    }, 1500);
  }
  
  setTimeout(() => showLoading(false), 1000);
}

function generateHTMLExport() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${state.project.title}</title>
      <meta name="description" content="${state.project.seo.metaDescription}">
      <meta name="keywords" content="${state.project.seo.keywords}">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=${state.project.theme.fontFamily.replace(/['"]/g, '').replace(/\s+/g, '+')}&display=swap" rel="stylesheet">
      <style>
        :root {
          --primary: ${state.project.theme.primary};
          --secondary: ${state.project.theme.secondary};
          --accent: #8b5cf6;
          --dark: #1e293b;
          --darker: #0f172a;
          --light: #f8fafc;
          --lighter: #f1f5f9;
          --gray: #64748b;
          --light-gray: #e2e8f0;
          --white: #ffffff;
          --border-radius: ${state.project.theme.borderRadius};
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: ${state.project.theme.fontFamily}, sans-serif;
          background: ${state.project.theme.background};
          color: var(--light);
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .section {
          margin: 50px 0;
          padding: 40px;
          border-radius: var(--border-radius);
          background: rgba(255, 255, 255, 0.05);
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
          margin-bottom: 20px;
        }
        
        .btn {
          display: inline-block;
          padding: 12px 25px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        /* Add more styles based on your components */
      </style>
    </head>
    <body>
      <div class="container">
        ${state.project.components.map(component => renderExportComponent(component)).join('')}
      </div>
    </body>
    </html>
  `;
}

function renderExportComponent(component) {
  // This would be similar to renderPreviewComponent but with full implementation
  // For brevity, we'll just use the preview version
  return renderPreviewComponent(component);
}

// ===== COMPONENT-SPECIFIC FUNCTIONS =====
function updateTeamMember(componentId, index, field, value) {
  const component = state.project.components.find(c => c.id === componentId);
  if (component && component.data.members && component.data.members[index]) {
    component.data.members[index][field] = value;
    saveProject();
  }
}

function addTeamMember(componentId) {
  const component = state.project.components.find(c => c.id === componentId);
  if (component) {
    component.data.members.push({
      name: "New Member",
      role: "Team Role",
      bio: "Team member bio",
      avatar: null
    });
    saveProject();
    renderCanvas();
  }
}

function handleTeamAvatarUpload(componentId, index, input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    updateTeamMember(componentId, index, 'avatar', e.target.result);
    renderCanvas();
  };
  reader.readAsDataURL(file);
}

function updateSocialPlatform(componentId, index, field, value) {
  const component = state.project.components.find(c => c.id === componentId);
  if (component && component.data.platforms && component.data.platforms[index]) {
    component.data.platforms[index][field] = value;
    saveProject();
  }
}

function addSocialPlatform(componentId) {
  const component = state.project.components.find(c => c.id === componentId);
  if (component) {
    component.data.platforms.push({
      icon: "fa-link",
      link: "#"
    });
    saveProject();
    renderCanvas();
  }
}

function removeSocialPlatform(componentId, index) {
  const component = state.project.components.find(c => c.id === componentId);
  if (component && component.data.platforms && component.data.platforms[index]) {
    component.data.platforms.splice(index, 1);
    saveProject();
    renderCanvas();
  }
}

function handleAboutImageUpload(componentId, input) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const component = state.project.components.find(c => c.id === componentId);
    if (component) {
      component.data.image = e.target.result;
      saveProject();
      renderCanvas();
    }
  };
  reader.readAsDataURL(file);
}

// ===== INITIALIZE THE BUILDER =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the builder
  initBuilder();
  
  // Expose functions to global scope for inline event handlers
  window.updateComponentData = updateComponentData;
  window.updateTeamMember = updateTeamMember;
  window.addTeamMember = addTeamMember;
  window.handleTeamAvatarUpload = handleTeamAvatarUpload;
  window.updateSocialPlatform = updateSocialPlatform;
  window.addSocialPlatform = addSocialPlatform;
  window.removeSocialPlatform = removeSocialPlatform;
  window.handleAboutImageUpload = handleAboutImageUpload;
});

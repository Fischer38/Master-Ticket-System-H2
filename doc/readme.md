# Single Page Application (SPA) med Server-Side Rendering

## Indholdsfortegnelse
- [Projektbeskrivelse](#projektbeskrivelse)
- [Teknologier](#teknologier)
- [Installation](#installation)
- [Projektstruktur](#projektstruktur)
- [Implementering](#implementering)
- [SEO & Performance](#seo--performance)
- [Vedligeholdelse](#vedligeholdelse)



## Kodeeksempler

### 1. Server Implementation (app.js)
```
javascript const express = require('express'); const path = require('path'); const app = express();
// Middleware setup app.set('view engine', 'ejs'); app.use(express.static('public')); app.use(express.json());
// Bot detection middleware const isBot = (req) => { const botPatterns = [ 'bot', 'crawler', 'spider', 'google', 'bing', 'facebookexternalhit', 'twitterbot' ]; const userAgent = req.get('user-agent').toLowerCase(); return botPatterns.some(pattern => userAgent.includes(pattern)); };
// Main route handler app.get('/*', (req, res) => { const path = req.path.substring(1) || 'dashboard';
if (isBot(req)) {
// Server-side rendering for bots
res.render('server-side', {
currentPage: path,
pageData: getPageData(path),
meta: getMetaData(path)
});
} else {
// SPA version for users
res.render('index', {
meta: getMetaData(path)
});
}
});
app.listen(process.env.PORT || 3000);
latex_unknown_tag
``` 

### 2. Frontend Templates

#### Index Template (views/index.ejs)
```
html
<%= meta.title %>
<!-- SEO Meta Tags -->
<meta name="description" content="<%= meta.description %>">
<meta property="og:title" content="<%= meta.title %>">
<meta property="og:description" content="<%= meta.description %>">
<meta property="og:url" content="<%= meta.url %>">

<link rel="stylesheet" href="/css/style.css">
<%- include('partials/nav') %>
<main id="content">
    <div id="page-container" class="page-container">
        <!-- Dynamisk indhold loades her -->
    </div>
</main>

<script src="/js/main.js"></script>
title
title
``` 

#### Navigation Partial (views/partials/nav.ejs)
```
html
- [Dashboard](#)
- [Rooms](#)
- [Profil](#)
  nav
  nav
``` 

#### Dashboard Partial (views/partials/dashboard.ejs)
```
html
# Dashboard
### Aktive Rum
<%= pageData.stats.activeRooms %>
### Online Brugere
<%= pageData.stats.onlineUsers %>
<div class="recent-activity">
    <h2>Seneste Aktivitet</h2>
    <ul>
        <% pageData.recentActivity.forEach(activity => { %>
            <li><%= activity.description %></li>
        <% }); %>
    </ul>
</div>
``` 

### 3. Frontend JavaScript (public/js/main.js)
```
javascript class SpaRouter { constructor() { this.routes = new Map(); this.pageContainer = document.getElementById('page-container'); this.setupEventListeners(); }
setupEventListeners() {
    // Navigation click handler
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            this.navigateToPage(pageId);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        const pageId = e.state?.pageId || 'dashboard';
        this.loadContent(pageId);
    });
}

async navigateToPage(pageId) {
    try {
        // Show loading state
        this.showLoader();

        // Update URL
        window.history.pushState(
            { pageId }, 
            '', 
            `/${pageId}`
        );

        // Load new content
        await this.loadContent(pageId);
        
        // Update meta tags
        await this.updateMetaTags(pageId);
        
    } catch (error) {
        this.showError('Kunne ikke indlæse siden');
    }
}

showLoader() {
    this.pageContainer.innerHTML = `
        <div class="loader">
            <div class="spinner"></div>
            <p>Indlæser...</p>
        </div>
    `;
}

async loadContent(pageId) {
    try {
        const response = await fetch(`/api/partial/${pageId}`);
        if (!response.ok) throw new Error('Fejl ved indlæsning');

        const html = await response.text();
        
        // Fade out current content
        this.pageContainer.style.opacity = 0;
        
        // Update content and fade in
        setTimeout(() => {
            this.pageContainer.innerHTML = html;
            this.pageContainer.style.opacity = 1;
        }, 200);

    } catch (error) {
        this.showError(error.message);
    }
}

showError(message) {
    this.pageContainer.innerHTML = `
        <div class="error-message">
            <h2>Ups! Noget gik galt</h2>
            <p>${message}</p>
            <button onclick="location.reload()">Prøv igen</button>
        </div>
    `;
}

async updateMetaTags(pageId) {
    const response = await fetch(`/api/meta/${pageId}`);
    const meta = await response.json();
    
    document.title = meta.title;
    document.querySelector('meta[name="description"]')
        .setAttribute('content', meta.description);
    // Update other meta tags...
}
}
// Initialize router document.addEventListener('DOMContentLoaded', () => { const router = new SpaRouter(); // Load initial page based on URL const initialPage = window.location.pathname.substring(1) || 'dashboard'; router.loadContent(initialPage); });
``` 

### 4. Styling (public/css/style.css)
```
css /* Base styles */ :root { --primary-color: #3498db; --secondary-color: #2ecc71; --background-color: #f5f6fa; --text-color: #2c3e50; --transition-speed: 0.2s; }
body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: var(--background-color); color: var(--text-color); }
/* Navigation styles */ .main-nav { background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 1rem; }
.main-nav ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
.nav-link { color: var(--text-color); text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background-color var(--transition-speed); }
.nav-link:hover { background-color: rgba(52, 152, 219, 0.1); }
/* Content container */ .page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; transition: opacity var(--transition-speed); }
/* Loading animation */ .loader { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; }
.spinner { width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
/* Dashboard styles */ .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0; }
.stat-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.stat-number { font-size: 2rem; color: var(--primary-color); margin: 0.5rem 0; }
/* Error message */ .error-message { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.error-message button { background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-top: 1rem; }
``` 

### 5. API Routes (routes/api.js)
```
javascript const express = require('express'); const router = express.Router();
// Page data handler const getPageData = (pageId) => { const data = { dashboard: { stats: { activeRooms: 5, onlineUsers: 12 }, recentActivity: [ { description: 'Nyt rum oprettet: Meeting Room' }, { description: 'Peter tilsluttede sig Chat Room' } ] }, rooms: { rooms: [ { id: 1, name: 'Meeting Room', capacity: 10 }, { id: 2, name: 'Chat Room', capacity: 20 } ] }, profile: { user: { name: 'John Doe', email: 'john@example.com', settings: { notifications: true, theme: 'light' } } } }; return data[pageId] || {}; };
// API endpoints router.get('/api/partial/:pageId', (req, res) => { const { pageId } = req.params; const pageData = getPageData(pageId);
res.render(`partials/${pageId}`, { pageData });
});
router.get('/api/meta/:pageId', (req, res) => { const { pageId } = req.params; const meta = { dashboard: { title: 'Dashboard - Min App', description: 'Se dine statistikker og aktiviteter' }, rooms: { title: 'Rum - Min App', description: 'Udforsk og deltag i forskellige rum' }, profile: { title: 'Profil - Min App', description: 'Administrer din profil og indstillinger' } };
res.json(meta[pageId] || meta.dashboard);
});
module.exports = router;
latex_unknown_tag
latex_unknown_tag
``` 

### 6. Database Model Eksempel (models/User.js)
```
javascript const { Model, DataTypes } = require('sequelize'); const sequelize = require('../config/database');
class User extends Model {}
User.init({ id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, username: { type: DataTypes.STRING, allowNull: false, unique: true }, email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }, password: { type: DataTypes.STRING, allowNull: false }, settings: { type: DataTypes.JSON, defaultValue: { notifications: true, theme: 'light' } } }, { sequelize, modelName: 'User', timestamps: true });
module.exports = User;
``` 

[Resten af README.md forbliver den samme...]
```
Denne udvidede version inkluderer:
1. Komplet server implementation
2. Frontend template struktur
3. SPA router implementation
4. Styling med CSS
5. API route handlers
6. Database model eksempel

Vil du have mig til at uddybe nogle af disse implementeringer eller tilføje flere eksempler?
``` markdown
# Single Page Application (SPA) med Server-Side Rendering

[Tidligere introduktion forbliver den samme...]

## Kodeeksempler

### 1. Server Implementation (app.js)
```
javascript const express = require('express'); const path = require('path'); const app = express();
// Middleware setup app.set('view engine', 'ejs'); app.use(express.static('public')); app.use(express.json());
// Bot detection middleware const isBot = (req) => { const botPatterns = [ 'bot', 'crawler', 'spider', 'google', 'bing', 'facebookexternalhit', 'twitterbot' ]; const userAgent = req.get('user-agent').toLowerCase(); return botPatterns.some(pattern => userAgent.includes(pattern)); };
// Main route handler app.get('/*', (req, res) => { const path = req.path.substring(1) || 'dashboard';
if (isBot(req)) {
// Server-side rendering for bots
res.render('server-side', {
currentPage: path,
pageData: getPageData(path),
meta: getMetaData(path)
});
} else {
// SPA version for users
res.render('index', {
meta: getMetaData(path)
});
}
});
app.listen(process.env.PORT || 3000);
latex_unknown_tag
``` 

### 2. Frontend Templates

#### Index Template (views/index.ejs)
```
html
<%= meta.title %>
<!-- SEO Meta Tags -->
<meta name="description" content="<%= meta.description %>">
<meta property="og:title" content="<%= meta.title %>">
<meta property="og:description" content="<%= meta.description %>">
<meta property="og:url" content="<%= meta.url %>">

<link rel="stylesheet" href="/css/style.css">
<%- include('partials/nav') %>
<main id="content">
    <div id="page-container" class="page-container">
        <!-- Dynamisk indhold loades her -->
    </div>
</main>

<script src="/js/main.js"></script>
title
title
``` 

#### Navigation Partial (views/partials/nav.ejs)
```
html
- [Dashboard](#)
- [Rooms](#)
- [Profil](#)
  nav
  nav
``` 

#### Dashboard Partial (views/partials/dashboard.ejs)
```
html
# Dashboard
### Aktive Rum
<%= pageData.stats.activeRooms %>
### Online Brugere
<%= pageData.stats.onlineUsers %>
<div class="recent-activity">
    <h2>Seneste Aktivitet</h2>
    <ul>
        <% pageData.recentActivity.forEach(activity => { %>
            <li><%= activity.description %></li>
        <% }); %>
    </ul>
</div>
``` 

### 3. Frontend JavaScript (public/js/main.js)
```
javascript class SpaRouter { constructor() { this.routes = new Map(); this.pageContainer = document.getElementById('page-container'); this.setupEventListeners(); }
setupEventListeners() {
    // Navigation click handler
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            this.navigateToPage(pageId);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        const pageId = e.state?.pageId || 'dashboard';
        this.loadContent(pageId);
    });
}

async navigateToPage(pageId) {
    try {
        // Show loading state
        this.showLoader();

        // Update URL
        window.history.pushState(
            { pageId }, 
            '', 
            `/${pageId}`
        );

        // Load new content
        await this.loadContent(pageId);
        
        // Update meta tags
        await this.updateMetaTags(pageId);
        
    } catch (error) {
        this.showError('Kunne ikke indlæse siden');
    }
}

showLoader() {
    this.pageContainer.innerHTML = `
        <div class="loader">
            <div class="spinner"></div>
            <p>Indlæser...</p>
        </div>
    `;
}

async loadContent(pageId) {
    try {
        const response = await fetch(`/api/partial/${pageId}`);
        if (!response.ok) throw new Error('Fejl ved indlæsning');

        const html = await response.text();
        
        // Fade out current content
        this.pageContainer.style.opacity = 0;
        
        // Update content and fade in
        setTimeout(() => {
            this.pageContainer.innerHTML = html;
            this.pageContainer.style.opacity = 1;
        }, 200);

    } catch (error) {
        this.showError(error.message);
    }
}

showError(message) {
    this.pageContainer.innerHTML = `
        <div class="error-message">
            <h2>Ups! Noget gik galt</h2>
            <p>${message}</p>
            <button onclick="location.reload()">Prøv igen</button>
        </div>
    `;
}

async updateMetaTags(pageId) {
    const response = await fetch(`/api/meta/${pageId}`);
    const meta = await response.json();
    
    document.title = meta.title;
    document.querySelector('meta[name="description"]')
        .setAttribute('content', meta.description);
    // Update other meta tags...
}
}
// Initialize router document.addEventListener('DOMContentLoaded', () => { const router = new SpaRouter(); // Load initial page based on URL const initialPage = window.location.pathname.substring(1) || 'dashboard'; router.loadContent(initialPage); });
``` 

### 4. Styling (public/css/style.css)
```
css /* Base styles */ :root { --primary-color: #3498db; --secondary-color: #2ecc71; --background-color: #f5f6fa; --text-color: #2c3e50; --transition-speed: 0.2s; }
body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: var(--background-color); color: var(--text-color); }
/* Navigation styles */ .main-nav { background-color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 1rem; }
.main-nav ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
.nav-link { color: var(--text-color); text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background-color var(--transition-speed); }
.nav-link:hover { background-color: rgba(52, 152, 219, 0.1); }
/* Content container */ .page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; transition: opacity var(--transition-speed); }
/* Loading animation */ .loader { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; }
.spinner { width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
/* Dashboard styles */ .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0; }
.stat-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.stat-number { font-size: 2rem; color: var(--primary-color); margin: 0.5rem 0; }
/* Error message */ .error-message { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.error-message button { background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-top: 1rem; }
``` 

### 5. API Routes (routes/api.js)
```
javascript const express = require('express'); const router = express.Router();
// Page data handler const getPageData = (pageId) => { const data = { dashboard: { stats: { activeRooms: 5, onlineUsers: 12 }, recentActivity: [ { description: 'Nyt rum oprettet: Meeting Room' }, { description: 'Peter tilsluttede sig Chat Room' } ] }, rooms: { rooms: [ { id: 1, name: 'Meeting Room', capacity: 10 }, { id: 2, name: 'Chat Room', capacity: 20 } ] }, profile: { user: { name: 'John Doe', email: 'john@example.com', settings: { notifications: true, theme: 'light' } } } }; return data[pageId] || {}; };
// API endpoints router.get('/api/partial/:pageId', (req, res) => { const { pageId } = req.params; const pageData = getPageData(pageId);
res.render(`partials/${pageId}`, { pageData });
});
router.get('/api/meta/:pageId', (req, res) => { const { pageId } = req.params; const meta = { dashboard: { title: 'Dashboard - Min App', description: 'Se dine statistikker og aktiviteter' }, rooms: { title: 'Rum - Min App', description: 'Udforsk og deltag i forskellige rum' }, profile: { title: 'Profil - Min App', description: 'Administrer din profil og indstillinger' } };
res.json(meta[pageId] || meta.dashboard);
});
module.exports = router;
latex_unknown_tag
latex_unknown_tag
``` 

### 6. Database Model Eksempel (models/User.js)
```
javascript const { Model, DataTypes } = require('sequelize'); const sequelize = require('../config/database');
class User extends Model {}
User.init({ id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, username: { type: DataTypes.STRING, allowNull: false, unique: true }, email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }, password: { type: DataTypes.STRING, allowNull: false }, settings: { type: DataTypes.JSON, defaultValue: { notifications: true, theme: 'light' } } }, { sequelize, modelName: 'User', timestamps: true });
module.exports = User;
``` 

[Resten af README.md forbliver den samme...]
```
Denne udvidede version inkluderer:
1. Komplet server implementation
2. Frontend template struktur
3. SPA router implementation
4. Styling med CSS
5. API route handlers
6. Database model eksempel

Vil du have mig til at uddybe nogle af disse implementeringer eller tilføje flere eksempler?

let currentLang = 'zh';

// 加载数据
async function loadData() {
    try {
        const companyData = await fetch('data/company.json').then(res => res.json());
        const projectsData = await fetch('data/projects.json').then(res => res.json());
        const artworksData = await fetch('data/artworks.json').then(res => res.json());
        
        updateContent(companyData, projectsData, artworksData);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// 更新页面内容
function updateContent(companyData, projectsData, artworksData) {
    // 更新公司信息
    document.getElementById('company-name').textContent = companyData[currentLang].name;
    document.getElementById('company-description').textContent = companyData[currentLang].description;
    document.getElementById('company-history').textContent = companyData[currentLang].history;
    document.getElementById('company-mission').textContent = companyData[currentLang].mission;
    document.getElementById('company-vision').textContent = companyData[currentLang].vision;
    
    // 更新服务列表
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = '';
    companyData[currentLang].services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <i class="fas fa-cogs"></i>
            <h3>${service}</h3>
        `;
        servicesContainer.appendChild(serviceItem);
    });
    
    // 更新项目案例
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
    projectsData[currentLang].forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-meta">
                    <span>${project.category}</span>
                    <span>${project.year}</span>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectItem);
    });
    
    // 更新工艺品
    const artworksContainer = document.getElementById('artworks-container');
    artworksContainer.innerHTML = '';
    artworksData[currentLang].forEach(artwork => {
        const artworkItem = document.createElement('div');
        artworkItem.className = 'artwork-item';
        artworkItem.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.title}">
            <div class="artwork-content">
                <h3>${artwork.title}</h3>
                <p>${artwork.description}</p>
                <div class="artwork-price">${artwork.price}</div>
                <div class="artwork-details">
                    <p>材质: ${artwork.material}</p>
                    <p>尺寸: ${artwork.size}</p>
                </div>
            </div>
        `;
        artworksContainer.appendChild(artworkItem);
    });
    
    // 更新导航栏
    document.querySelectorAll('.nav-links a')[0].textContent = currentLang === 'zh' ? '首页' : 'Home';
    document.querySelectorAll('.nav-links a')[1].textContent = currentLang === 'zh' ? '关于我们' : 'About';
    document.querySelectorAll('.nav-links a')[2].textContent = currentLang === 'zh' ? '项目案例' : 'Projects';
    document.querySelectorAll('.nav-links a')[3].textContent = currentLang === 'zh' ? '工艺品' : 'Artworks';
    document.querySelectorAll('.nav-links a')[4].textContent = currentLang === 'zh' ? '联系我们' : 'Contact';
    
    // 更新页面标题
    document.querySelector('.section-title').textContent = currentLang === 'zh' ? '关于我们' : 'About Us';
    document.querySelectorAll('.section-title')[1].textContent = currentLang === 'zh' ? '项目案例' : 'Projects';
    document.querySelectorAll('.section-title')[2].textContent = currentLang === 'zh' ? '工艺品' : 'Artworks';
    document.querySelectorAll('.section-title')[3].textContent = currentLang === 'zh' ? '联系我们' : 'Contact Us';
    
    // 更新联系表单
    document.querySelector('label[for="name"]').textContent = currentLang === 'zh' ? '姓名' : 'Name';
    document.querySelector('label[for="email"]').textContent = currentLang === 'zh' ? '邮箱' : 'Email';
    document.querySelector('label[for="message"]').textContent = currentLang === 'zh' ? '留言' : 'Message';
    document.querySelector('button[type="submit"]').textContent = currentLang === 'zh' ? '提交' : 'Submit';
    
    // 更新页脚
    document.querySelectorAll('.footer-section h3')[0].textContent = currentLang === 'zh' ? '关于我们' : 'About Us';
    document.querySelectorAll('.footer-section h3')[1].textContent = currentLang === 'zh' ? '快速链接' : 'Quick Links';
    document.querySelectorAll('.footer-section h3')[2].textContent = currentLang === 'zh' ? '联系我们' : 'Contact Us';
    document.querySelectorAll('.footer-section ul li a')[0].textContent = currentLang === 'zh' ? '首页' : 'Home';
    document.querySelectorAll('.footer-section ul li a')[1].textContent = currentLang === 'zh' ? '关于我们' : 'About';
    document.querySelectorAll('.footer-section ul li a')[2].textContent = currentLang === 'zh' ? '项目案例' : 'Projects';
    document.querySelectorAll('.footer-section ul li a')[3].textContent = currentLang === 'zh' ? '工艺品' : 'Artworks';
    document.querySelectorAll('.footer-section ul li a')[4].textContent = currentLang === 'zh' ? '联系我们' : 'Contact';
    document.querySelector('.footer-bottom').textContent = currentLang === 'zh' ? '© 2026 万艺雕塑 版权所有' : '© 2026 Wanyi Sculpture All Rights Reserved';
}

// 语言切换
function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
    loadData();
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // 语言切换按钮点击事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLang(this.dataset.lang);
        });
    });
});
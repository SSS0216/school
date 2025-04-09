// 滚动效果
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // 添加动画效果到元素
    const animatedElements = document.querySelectorAll('.feature-card, .program-card, .news-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'fadeInUp');
                // 一旦添加了动画，就不再观察这个元素
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 计数器动画
    const counterElements = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.innerText.replace(/,|\+/g, ''));
                let count = 0;
                const speed = 2000; // 动画持续时间（毫秒）
                const increment = countTo / (speed / 30); // 每30毫秒增加的值
                
                const updateCount = () => {
                    count += increment;
                    if (count < countTo) {
                        // 如果值包含 + 号，保留加号
                        if (target.innerText.includes('+')) {
                            target.innerText = Math.ceil(count).toLocaleString() + '+';
                        } else {
                            target.innerText = Math.ceil(count).toLocaleString();
                        }
                        setTimeout(updateCount, 30);
                    } else {
                        target.innerText = target.innerText;
                    }
                };
                
                updateCount();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
    
    // 移动设备菜单收起
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarToggler) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) { // 仅在移动设备上
                    navbarToggler.click(); // 点击汉堡按钮收起菜单
                }
            });
        });
    }
}); 
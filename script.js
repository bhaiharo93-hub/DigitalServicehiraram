// Mobile Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close Mobile Nav when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Modal Popups Controller
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}
function openAdminModal() {
    renderUserTable();
    document.getElementById('adminModal').classList.add('active');
}
function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
}

// User Login & LocalStorage Handling
document.getElementById('customLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('usr_name').value;
    const phone = document.getElementById('usr_phone').value;
    const email = document.getElementById('usr_email').value;
    const timestamp = new Date().toLocaleString('hi-IN');

    const userData = { name, phone, email, timestamp };

    // Fetch existing users or initialize array
    let users = JSON.parse(localStorage.getItem('hs_website_users') || '[]');
    users.push(userData);
    localStorage.setItem('hs_website_users', JSON.stringify(users));

    alert(`स्वागत है ${name}! आपका लॉगिन सफल रहा।`);
    closeLoginModal();
    this.reset();
});

// Google Login OAuth Handler Callback
function handleCredentialResponse(response) {
    // Decoding JWT Payload
    const responsePayload = parseJwt(response.credential);
    
    const userData = {
        name: responsePayload.name,
        phone: 'Google Auth',
        email: responsePayload.email,
        timestamp: new Date().toLocaleString('hi-IN')
    };

    let users = JSON.parse(localStorage.getItem('hs_website_users') || '[]');
    users.push(userData);
    localStorage.setItem('hs_website_users', JSON.stringify(users));

    alert(`गूगल लॉगिन सफल! आपका स्वागत है ${responsePayload.name}`);
    closeLoginModal();
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Contact Form Handler
document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हीरालाल जी जल्द संपर्क करेंगे।');
    this.reset();
});

// Render User Database inside Admin Modal Table
function renderUserTable() {
    const tableBody = document.getElementById('userTableBody');
    let users = JSON.parse(localStorage.getItem('hs_website_users') || '[]');
    
    tableBody.innerHTML = '';
    if(users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">कोई डेटा उपलब्ध नहीं है।</td></tr>';
        return;
    }

    users.forEach((user, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.timestamp}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Export Logged Users to CSV Excel File
function downloadCSV() {
    let users = JSON.parse(localStorage.getItem('hs_website_users') || '[]');
    if(users.length === 0) { alert('डाउनलोड करने के लिए कोई डेटा नहीं है!'); return; }

    let csvContent = "data:text/csv;charset=utf-8,Index,Name,Email,Phone,DateTime\n";
    users.forEach((u, i) => {
        csvContent += `${i+1},"${u.name}","${u.email}","${u.phone}","${u.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Registered_Users_Database.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hira Ram Suthar | Digital Services & Creative Solutions</title>
    <link rel="stylesheet" href="style1.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
</head>
<body>

    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <header>
        <nav class="navbar">
            <div class="logo">
                <div class="logo-box">HS</div>
                <div class="logo-text"><span class="grad-pink">Hira Ram</span> <span class="grad-gold">Suthar</span></div>
            </div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="https://wa.me/916238567406" target="_blank" class="btn-hire"><i class="fa-solid fa-bolt"></i> Hire Me</a>
        </nav>
    </header>

    <section id="home" class="hero">
        <div class="hero-text">
            <div class="badge"><i class="fa-solid fa-sparkles"></i> Welcome To My World</div>
            <h1 class="hero-title"><span class="grad-text-1">Hira Ram</span> <span class="grad-text-2">Suthar</span></h1>
            <h2 class="hero-subtitle">Digital Services & <span class="grad-cyan">Creative Solutions</span></h2>
            <p class="hero-desc">मैं बिज़नेस और क्रिएटर्स के लिए हाई-लेवल वीडियो एडिटिंग, वेब डेवलपमेंट, ग्राफ़िक्स और डिजिटल स्किल ट्रेनिंग का काम करता हूँ।</p>
            
            <div class="hero-btns">
                <a href="#services" class="btn btn-primary">Explore Services <i class="fa-solid fa-arrow-trend-up"></i></a>
                <a href="#contact" class="btn btn-glass">Contact Me <i class="fa-solid fa-paper-plane"></i></a>
            </div>

            <div class="quick-bar">
                <a href="tel:6238567406" class="q-item"><i class="fa-solid fa-phone color-gold"></i> 6238567406</a>
                <a href="https://wa.me/916238567406" target="_blank" class="q-item"><i class="fa-brands fa-whatsapp color-green"></i> WhatsApp Us</a>
                <a href="mailto:hirasarkar898@gmail.com" class="q-item"><i class="fa-solid fa-envelope color-pink"></i> hirasarkar898@gmail.com</a>
            </div>
        </div>
    </section>

    <section id="services" class="services-section">
        <div class="section-header">
            <span class="sub-tag">WHAT I DO</span>
            <h2>My Premium <span class="grad-gold">Services</span></h2>
        </div>
        
        <div class="services-grid">
            <div class="service-card border-pink">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop" alt="Video Editing">
                </div>
                <h3><i class="fa-solid fa-film color-pink"></i> Video Editing</h3>
                <p>YouTube Reels, Shorts, Movie Trims, Commercial Ads & Cinematic 4K Color Grading।</p>
            </div>

            <div class="service-card border-purple">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1542744094-3a31b272c490?w=500&auto=format&fit=crop" alt="Photo Editing">
                </div>
                <h3><i class="fa-solid fa-wand-magic-sparkles color-purple"></i> Photo Editing</h3>
                <p>High-End Portrait Retouching, Poster Designing & Photoshop Manipulations।</p>
            </div>

            <div class="service-card border-cyan">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop" alt="Web Development">
                </div>
                <h3><i class="fa-solid fa-code color-cyan"></i> Web Development</h3>
                <p>HTML5, CSS3, JS का इस्तेमाल करके अल्ट्रा-फास्ट और 3D रिस्पॉन्सिव वेबसाइट्स।</p>
            </div>

            <div class="service-card border-gold">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop" alt="Data Entry">
                </div>
                <h3><i class="fa-solid fa-file-excel color-gold"></i> Data Entry & Excel</h3>
                <p>100% सटीक Data Management, Advanced Excel Formulas & Automation Work।</p>
            </div>

            <div class="service-card border-green">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop" alt="Cybersecurity">
                </div>
                <h3><i class="fa-solid fa-shield-cat color-green"></i> Cybersecurity</h3>
                <p>वेबसाइट सिक्योरिटी ऑडिट्स, डिजिटल सेफ्टी गाइडेंस & सोशल मीडिया सिक्योरिटी।</p>
            </div>

            <div class="service-card border-orange">
                <div class="card-img-box">
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop" alt="Skill Training">
                </div>
                <h3><i class="fa-solid fa-graduation-cap color-orange"></i> Online Skill Training</h3>
                <p>डिजिटल स्किल्स सीखें: वीडियो एडिटिंग, कोडिंग प्रोजेक्ट्स और मास्टरक्लासेस।</p>
            </div>
        </div>
    </section>

    <section id="portfolio" class="portfolio-section">
        <div class="section-header">
            <span class="sub-tag">MY WORK</span>
            <h2>Featured <span class="grad-pink">Portfolio</span></h2>
        </div>

        <div class="portfolio-grid">
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop" alt="Project 1">
                <div class="p-overlay">
                    <h4>YouTube 4K Video Editing</h4>
                    <p>Cinematic FX & Transitions</p>
                </div>
            </div>
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop" alt="Project 2">
                <div class="p-overlay">
                    <h4>Responsive Web Design</h4>
                    <p>HTML5 / CSS3 / JS</p>
                </div>
            </div>
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop" alt="Project 3">
                <div class="p-overlay">
                    <h4>Data Analytics & Dashboards</h4>
                    <p>Excel & Automation</p>
                </div>
            </div>
            <div class="p-card">
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop" alt="Project 4">
                <div class="p-overlay">
                    <h4>Graphic & Poster Design</h4>
                    <p>Photoshop Manipulation</p>
                </div>
            </div>
        </div>
    </section>

    <section id="skills" class="skills-section">
        <div class="section-header">
            <span class="sub-tag">MY EXPERTISE</span>
            <h2>Technical <span class="grad-cyan">Skills</span></h2>
        </div>

        <div class="skills-box">
            <div class="skill-item">
                <div class="s-info"><span>Video Editing & Motion FX</span><span>95%</span></div>
                <div class="bar"><div class="fill fill-pink" style="width: 95%;"></div></div>
            </div>
            <div class="skill-item">
                <div class="s-info"><span>Web Development (HTML/CSS/JS)</span><span>92%</span></div>
                <div class="bar"><div class="fill fill-cyan" style="width: 92%;"></div></div>
            </div>
            <div class="skill-item">
                <div class="s-info"><span>Photo Editing & Design</span><span>90%</span></div>
                <div class="bar"><div class="fill fill-purple" style="width: 90%;"></div></div>
            </div>
            <div class="skill-item">
                <div class="s-info"><span>Data Entry & Advanced Excel</span><span>98%</span></div>
                <div class="bar"><div class="fill fill-gold" style="width: 98%;"></div></div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact-section">
        <div class="contact-card">
            <h2>Let's Work <span class="grad-gold">Together!</span></h2>
            <form id="mainForm">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea rows="4" placeholder="Your Message or Project Details..." required></textarea>
                <button type="submit" class="btn btn-primary">Send Message <i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    </section>

    <footer>
        <p>&copy; 2026 <span class="grad-gold">Hira Ram Suthar</span> | All Rights Reserved.</p>
    </footer>

    <a href="https://wa.me/916238567406" class="whatsapp-float" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>

    <script src="script1.js"></script>
</body>
</html>// Quick Form Alert
document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('धन्यवाद हीरा राम जी! मैसेज प्राप्त हो गया है। जल्द ही आपसे संपर्क किया जाएगा।');
    this.reset();
});

// Smooth Scroll for Navbar Links
document.querySelectorAll('.nav-links a, .hero-action-btns a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});<!-- ==================== NEW COMPLETE DIGITAL PORTAL SECTIONS ==================== -->

<!-- Trust Badges & Live Stats -->
<section class="trust-stats-section">
    <div class="stats-grid">
        <div class="stat-box">
            <i class="fa-solid fa-circle-check color-gold"></i>
            <h3 class="counter">100%</h3>
            <p>Quality Guarantee</p>
        </div>
        <div class="stat-box">
            <i class="fa-solid fa-users color-pink"></i>
            <h3 class="counter">250+</h3>
            <p>Happy Clients</p>
        </div>
        <div class="stat-box">
            <i class="fa-solid fa-award color-cyan"></i>
            <h3 class="counter">500+</h3>
            <p>Projects Delivered</p>
        </div>
        <div class="stat-box">
            <i class="fa-solid fa-headset color-green"></i>
            <h3 class="counter">24/7</h3>
            <p>Digital Support</p>
        </div>
    </div>
</section>

<!-- Latest Articles & Blog Section -->
<section class="blog-section" id="blog">
    <div class="section-header">
        <span class="sub-tag">LATEST INSIGHTS</span>
        <h2>Digital & Tech <span class="grad-gold">Articles</span></h2>
    </div>

    <div class="blog-grid">
        <article class="blog-card">
            <div class="b-img-box">
                <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop" alt="Video Editing Trends">
                <span class="b-category">Video FX</span>
            </div>
            <div class="b-content">
                <span class="b-date"><i class="fa-solid fa-calendar"></i> 2026 Edition</span>
                <h3>4K Video Editing Mein High Engagement Kaise Layen?</h3>
                <p>यूट्यूब रील्स और शॉर्ट्स में साउंड इफेक्ट्स, कलर ग्रेडिंग और सही कट्स का इस्तेमाल करके ऑडियंस रिटेंशन बढ़ाएं।</p>
                <a href="#contact" class="read-more">Read Article <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>

        <article class="blog-card">
            <div class="b-img-box">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop" alt="Responsive Web Design">
                <span class="b-category">Web Tech</span>
            </div>
            <div class="b-content">
                <span class="b-date"><i class="fa-solid fa-calendar"></i> Tech Guide</span>
                <h3>Fluid Responsive Website Kya Hoti Hai?</h3>
                <p>जानें कैसे एक मॉडर्न वेबसाइट iPhone, iPad और Mac स्क्रीन के हिसाब से अपने लेआउट को 100% ऑटो-एडैप्ट करती है।</p>
                <a href="#contact" class="read-more">Read Article <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>

        <article class="blog-card">
            <div class="b-img-box">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop" alt="Excel Automation">
                <span class="b-category">Data Skills</span>
            </div>
            <div class="b-content">
                <span class="b-date"><i class="fa-solid fa-calendar"></i> Pro Tips</span>
                <h3>Advanced Excel Formulas & Data Entry Automation</h3>
                <p>बिज़नेस डेटा को सुरक्षित रखने और 10x फ़ास्ट काम करने के लिए ऑटोमेशन टूल्स का सही उपयोग।</p>
                <a href="#contact" class="read-more">Read Article <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </article>
    </div>
</section>

<!-- Client Reviews & Testimonials -->
<section class="reviews-section" id="reviews">
    <div class="section-header">
        <span class="sub-tag">CLIENT FEEDBACK</span>
        <h2>What People Say <span class="grad-pink">About Us</span></h2>
    </div>

    <div class="reviews-grid">
        <div class="review-card">
            <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="review-text">"Hira Ram Suthar ji ka 4K Video Editing work cinematic hai. YouTube channel ke views 2x ho gaye!"</p>
            <div class="client-info">
                <div class="client-avatar">RV</div>
                <div>
                    <h4>Rahul Verma</h4>
                    <span>Content Creator • Verified Client</span>
                </div>
            </div>
        </div>

        <div class="review-card">
            <div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p class="review-text">"Website speed aur mobile design bahut shandar hai. Mac aur iPhone dono par ekdam fast chalti hai."</p>
            <div class="client-info">
                <div class="client-avatar">AS</div>
                <div>
                    <h4>Amit Sharma</h4>
                    <span>Business Owner • Verified Client</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SuTex007 Gaming YouTube Channel Showcase -->
<section class="youtube-section" id="youtube">
    <div class="yt-card-box">
        <div class="yt-header">
            <div class="yt-profile">
                <i class="fa-brands fa-youtube yt-logo"></i>
                <div>
                    <h3>SuTex007 Gaming</h3>
                    <p>Official Gaming & Editing Showcase Channel</p>
                </div>
            </div>
            <a href="https://www.youtube.com/@SuTex007Gaming" target="_blank" class="btn-yt-sub">
                <i class="fa-brands fa-youtube"></i> Subscribe Now
            </a>
        </div>
    </div>
</section>
<!-- ==================== END NEW SECTIONS ==================== -->
// Dynamic Mobile Menu Toggle for Responsive Devices
const navbar = document.querySelector('.navbar');
if (navbar && !document.querySelector('.menu-toggle')) {
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'menu-toggle';
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars" style="font-size:24px; color:#fff; cursor:pointer;"></i>';
    navbar.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('mobile-active');
        }
    });
}

console.log("Hira Ram Suthar Website - All Devices & Blog Modules Loaded!");
// ==================== LIVE TELEGRAM & ADMIN DATA TRACKER ====================

// 1. Telegram Bot Integration (ताकि आपके मोबाइल पर मैसेज आ जाए)
// (नोट: आप चाहें तो अपना Bot Token और Chat ID यहाँ बदल सकते हैं)
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; 
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

document.getElementById('liveTrackingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('u_name').value;
    const email = document.getElementById('u_email').value;
    const phone = document.getElementById('u_phone').value;
    const msg = document.getElementById('u_msg').value;
    const time = new Date().toLocaleString('en-IN');

    // Object to store locally
    const userData = { time, name, email, phone, msg };

    // Save Data to Local Storage (Admin Panel ke liye)
    let allUsers = JSON.parse(localStorage.getItem('hira_users_db')) || [];
    allUsers.push(userData);
    localStorage.setItem('hira_users_db', JSON.stringify(allUsers));

    // Send Live Telegram Alert to your Mobile (Optional Setup)
    if(TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN') {
        const textMsg = `🚨 *New User Login Alert!*%0A%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A📞 *Phone:* ${phone}%0A💬 *Message:* ${msg}%0A⏰ *Time:* ${time}`;
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${textMsg}&parse_mode=Markdown`);
    }

    alert(`धन्यवाद ${name} जी! आपकी डिटेल्स दर्ज हो गई हैं। हीरा राम जी आपसे जल्द संपर्क करेंगे।`);
    this.reset();
    renderAdminTable();
});

// 2. Open / Close Admin Panel Modal
function toggleAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        renderAdminTable();
        modal.style.display = 'flex';
    }
}

// 3. Render Table Data in Admin Panel
function renderAdminTable() {
    const tbody = document.getElementById('userTableBody');
    let allUsers = JSON.parse(localStorage.getItem('hira_users_db')) || [];
    tbody.innerHTML = '';

    if (allUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">अभी तक कोई नया लॉगिन या डेटा दर्ज नहीं हुआ है।</td></tr>';
        return;
    }

    allUsers.reverse().forEach(u => {
        const row = `<tr>
            <td>${u.time}</td>
            <td><b>${u.name}</b></td>
            <td>${u.email}</td>
            <td><a href="tel:${u.phone}" style="color:#25d366;">${u.phone}</a></td>
            <td>${u.msg}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// 4. Export Registered Data to Excel/CSV File
function downloadExcelData() {
    let allUsers = JSON.parse(localStorage.getItem('hira_users_db')) || [];
    if(allUsers.length === 0) { alert('डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।'); return; }

    let csvContent = "data:text/csv;charset=utf-8,Date,Name,Email,Phone,Message\n";
    allUsers.forEach(u => {
        csvContent += `"${u.time}","${u.name}","${u.email}","${u.phone}","${u.msg}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Hira_Ram_Website_Users_${new Date().toDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 5. Clear All Data Function
function clearAllData() {
    if(confirm('क्या आप सचमुच सारा लॉगिन डेटा मिटाना चाहते हैं?')) {
        localStorage.removeItem('hira_users_db');
        renderAdminTable();
    }
}
// ==================== END SCRIPT ====================
// ==================== FAQ, SCROLL TOP & THEME TOGGLE SCRIPT ====================

// 1. FAQ Accordion Toggle
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// 2. Scroll to Top Button Functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if(scrollTopBtn) scrollTopBtn.style.display = "block";
    } else {
        if(scrollTopBtn) scrollTopBtn.style.display = "none";
    }
};

if(scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 3. Dark/Light Mode Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.getElementById('themeIcon');
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-sun';
        icon.style.color = '#ffb703';
    } else {
        icon.className = 'fa-solid fa-moon';
        icon.style.color = '#ffb703';
    }
}
// ==================== END SCRIPT ====================

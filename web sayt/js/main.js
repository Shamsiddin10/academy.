/**
 * Zamon Academy - Dinamik boshqaruv skripti
 */

const data = {
    uz: {
        hTitle: "Zamon Academy",
        hSub: "Professional bilimlar markazi",
        search: "Fan qidirish...",
        enroll: "Yozilish",
        loginAlert: "Iltimos, ism va parolni kiriting",
        enrollSuccess: "kursiga muvaffaqiyatli yozildingiz!",
        welcome: "Xush kelibsiz",
        authSub: "Davom etish uchun login qiling",
        courses: [
            { id: 'it', name: 'Dasturlash', desc: 'Frontend va Backend.', teacher: 'Anvar Toshmatov', exp: '7 yillik Senior Developer' },
            { id: 'eng', name: 'Ingliz tili', desc: 'IELTS 7.5+ tayyorlov.', teacher: 'Madina Ahrorova', exp: 'IELTS 8.5 sohibasi' },
            { id: 'math', name: 'Matematika', desc: 'DTM va olimpiada.', teacher: 'Jasur Islomov', exp: '10 yillik tajriba' },
            { id: 'nat', name: 'Ona tili', desc: 'Milliy sertifikat.', teacher: 'Gulnoza Karimova', exp: 'Oliy toifali ustoz' },
            { id: 'rus', name: 'Rus tili', desc: 'Noldan so\'zlashuv.', teacher: 'Elena Petrova', exp: 'Native Speaker' },
            { id: 'kor', name: 'Koreys tili', desc: 'TOPIK darslari.', teacher: 'Kim Young Su', exp: 'EPS-TOPIK mutaxassisi' }
        ]
    },
    en: {
        hTitle: "Zamon Academy",
        hSub: "Professional Learning Center",
        search: "Search courses...",
        enroll: "Enroll",
        loginAlert: "Please enter name and password",
        enrollSuccess: "successfully enrolled in the course!",
        welcome: "Welcome",
        authSub: "Login to continue",
        courses: [
            { id: 'it', name: 'Programming', desc: 'Frontend and Backend.', teacher: 'Anvar Toshmatov', exp: '7 years Senior Developer' },
            { id: 'eng', name: 'English', desc: 'IELTS 7.5+ preparation.', teacher: 'Madina Ahrorova', exp: 'IELTS 8.5 certified' },
            { id: 'math', name: 'Mathematics', desc: 'Exams and Olympiads.', teacher: 'Jasur Islomov', exp: '10 years experience' },
            { id: 'nat', name: 'Native Lang', desc: 'National certificate.', teacher: 'Gulnoza Karimova', exp: 'Top category teacher' },
            { id: 'rus', name: 'Russian', desc: 'Speaking from scratch.', teacher: 'Elena Petrova', exp: 'Native Speaker' },
            { id: 'kor', name: 'Korean', desc: 'TOPIK classes.', teacher: 'Kim Young Su', exp: 'EPS-TOPIK specialist' }
        ]
    }
};

// --- TILLARNI YANGILASH ---
function updateTexts() {
    const lang = document.getElementById('langSelect').value;
    const t = data[lang];
    
    // Matnlarni almashtirish
    document.getElementById('h-title').innerText = t.hTitle;
    document.getElementById('h-sub').innerText = t.hSub;
    document.getElementById('searchBar').placeholder = t.search;
    document.getElementById('m-auth-title').innerText = t.welcome;
    document.getElementById('m-auth-sub').innerText = t.authSub;

    // Kurslar ro'yxatini qayta shakllantirish
    const list = document.getElementById('courseList');
    list.innerHTML = '';
    
    t.courses.forEach(c => {
        const cardClass = getCardClass(c.id);
        list.innerHTML += `
            <div class="card ${cardClass}">
                <h2>${c.name}</h2>
                <p>${c.desc}</p>
                <div class="btn-stack">
                    <button class="btn-enroll" onclick="enroll('${c.name}')">${t.enroll}</button>
                    <button class="btn-info" onclick="openInfo('${c.name}', '${c.teacher}', '${c.exp}')">ℹ️</button>
                </div>
            </div>
        `;
    });
}

// ID bo'yicha CSS klassni aniqlash
function getCardClass(id) {
    const classes = { it: 'it', eng: 'english', math: 'math', nat: 'native', rus: 'russian', kor: 'korean' };
    return classes[id] || '';
}

// --- AUTH (KIRISH) TIZIMI ---
function login() {
    const name = document.getElementById('loginName').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const lang = document.getElementById('langSelect').value;

    if(!name || !pass) {
        return alert(data[lang].loginAlert);
    }
    
    sessionStorage.setItem('user', name);
    document.getElementById('authModal').style.display = 'none';
    showUser(name);
}

function showUser(name) {
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    userInfo.style.display = 'block';
    userName.innerText = "👤 " + name;
}

function logout() {
    sessionStorage.removeItem('user');
    location.reload();
}

// --- MODAL VA QIDIRUV ---
function openInfo(course, teacher, exp) {
    document.getElementById('inf-course').innerText = course;
    document.getElementById('inf-teacher').innerText = "👨‍🏫 " + teacher;
    document.getElementById('inf-exp').innerText = exp;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfo() {
    document.getElementById('infoModal').style.display = 'none';
}

function enroll(courseName) {
    const user = sessionStorage.getItem('user');
    const lang = document.getElementById('langSelect').value;
    alert(`${user}, ${courseName} ${data[lang].enrollSuccess}`);
}

function search() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    
    Array.from(cards).forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "flex" : "none";
    });
}

// --- INITIALIZE (ISHGA TUSHIRISH) ---
window.onload = () => {
    updateTexts();
    const savedUser = sessionStorage.getItem('user');
    if(savedUser) {
        document.getElementById('authModal').style.display = 'none';
        showUser(savedUser);
    }
};
/* =========================================================
   SAKSHAMSETU - MAIN JAVASCRIPT
   Smart Learning Platform
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loader = document.getElementById("loader");
    const loginScreen = document.getElementById("loginScreen");
    const app = document.getElementById("app");

    const loginForm = document.getElementById("loginForm");
    const demoLogin = document.getElementById("demoLogin");
    const togglePassword = document.getElementById("togglePassword");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const roleButtons = document.querySelectorAll(".role-btn");
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    const logoutBtn = document.getElementById("logoutBtn");
    const menuToggle = document.getElementById("menuToggle");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    const toastIcon = document.getElementById("toastIcon");

    const modal = document.getElementById("courseModal");
    const modalBody = document.getElementById("modalBody");
    const closeModal = document.getElementById("closeModal");

    let selectedRole = "learner";


    /* =====================================================
       APPLICATION DATA
    ===================================================== */

    const appData = {

        courses: [

            {
                id: 1,
                title: "Data Analysis Fundamentals",
                category: "Data",
                instructor: "Sarah Johnson",
                progress: 65,
                duration: "8 Weeks",
                lessons: 24,
                status: "in-progress",
                icon: "📊",
                color: "blue"
            },

            {
                id: 2,
                title: "Leadership Essentials",
                category: "Leadership",
                instructor: "Michael Brown",
                progress: 40,
                duration: "6 Weeks",
                lessons: 18,
                status: "in-progress",
                icon: "🚀",
                color: "purple"
            },

            {
                id: 3,
                title: "Digital Marketing Strategy",
                category: "Business",
                instructor: "Emma Wilson",
                progress: 25,
                duration: "5 Weeks",
                lessons: 20,
                status: "in-progress",
                icon: "📱",
                color: "orange"
            },

            {
                id: 4,
                title: "Project Management Basics",
                category: "Business",
                instructor: "David Miller",
                progress: 100,
                duration: "4 Weeks",
                lessons: 16,
                status: "completed",
                icon: "📋",
                color: "green"
            },

            {
                id: 5,
                title: "Introduction to Python",
                category: "Technology",
                instructor: "Alex Carter",
                progress: 0,
                duration: "10 Weeks",
                lessons: 30,
                status: "available",
                icon: "💻",
                color: "blue"
            },

            {
                id: 6,
                title: "Communication Skills",
                category: "Leadership",
                instructor: "Sophia Lee",
                progress: 0,
                duration: "3 Weeks",
                lessons: 12,
                status: "available",
                icon: "💬",
                color: "purple"
            }

        ],


        skills: [

            {
                name: "Data Analysis",
                score: 68,
                target: 85,
                level: "Intermediate"
            },

            {
                name: "Communication",
                score: 82,
                target: 85,
                level: "Advanced"
            },

            {
                name: "Leadership",
                score: 55,
                target: 80,
                level: "Developing"
            },

            {
                name: "Project Management",
                score: 72,
                target: 85,
                level: "Intermediate"
            },

            {
                name: "Problem Solving",
                score: 78,
                target: 90,
                level: "Advanced"
            },

            {
                name: "Technical Skills",
                score: 64,
                target: 85,
                level: "Intermediate"
            }

        ],


        resources: [

            {
                title: "Introduction to Artificial Intelligence",
                category: "Technology",
                type: "Article",
                icon: "🤖",
                description: "Understand the fundamentals of AI and modern technologies."
            },

            {
                title: "Data Visualization Best Practices",
                category: "Data",
                type: "Guide",
                icon: "📊",
                description: "Learn how to turn complex data into meaningful insights."
            },

            {
                title: "Effective Team Leadership",
                category: "Leadership",
                type: "Video",
                icon: "👥",
                description: "Develop skills to lead and motivate successful teams."
            },

            {
                title: "Business Strategy Fundamentals",
                category: "Business",
                type: "Article",
                icon: "📈",
                description: "Learn strategic thinking for business growth."
            },

            {
                title: "SQL for Data Analytics",
                category: "Data",
                type: "Course",
                icon: "🗄️",
                description: "Master SQL fundamentals for data-driven decision making."
            },

            {
                title: "Cloud Computing Basics",
                category: "Technology",
                type: "Guide",
                icon: "☁️",
                description: "Explore the foundations of modern cloud infrastructure."
            }

        ],


        certificates: [

            {
                title: "Project Management Fundamentals",
                date: "August 2026",
                credential: "SS-PM-2026-8842",
                icon: "🏆"
            },

            {
                title: "Professional Communication",
                date: "July 2026",
                credential: "SS-COM-2026-2291",
                icon: "🎓"
            }

        ]

    };


    /* =====================================================
       USER DATA
    ===================================================== */

    let user = JSON.parse(
        localStorage.getItem("sakshamSetuUser")
    ) || {
        name: "",
        email: "",
        role: "Learner"
    };


    /* =====================================================
       LOADER
    ===================================================== */

    setTimeout(() => {

        if (loader) {

            loader.classList.add("hide");

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);

        }


        /* AUTO LOGIN IF USER EXISTS */

        if (user.name) {

            showApp();

        }

    }, 1800);


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message, type = "success") {

        if (!toast) return;

        toastMessage.textContent = message;

        if (type === "success") {
            toastIcon.textContent = "✓";
        }

        if (type === "error") {
            toastIcon.textContent = "!";
        }

        if (type === "info") {
            toastIcon.textContent = "i";
        }

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);

    }


    /* =====================================================
       ROLE SELECTION
    ===================================================== */

    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            roleButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedRole = button.dataset.role;

        });

    });


    /* =====================================================
       PASSWORD TOGGLE
    ===================================================== */

    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                togglePassword.textContent = "🙈";

            } else {

                passwordInput.type = "password";
                togglePassword.textContent = "👁";

            }

        });

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {

                showToast(
                    "Please enter email and password",
                    "error"
                );

                return;

            }


            const nameFromEmail =
                email
                    .split("@")[0]
                    .replace(/[._-]/g, " ")
                    .replace(/\b\w/g, char =>
                        char.toUpperCase()
                    );


            user = {

                name: nameFromEmail || "Aditya",
                email: email,
                role:
                    selectedRole.charAt(0).toUpperCase() +
                    selectedRole.slice(1)

            };


            localStorage.setItem(
                "sakshamSetuUser",
                JSON.stringify(user)
            );


            showToast(
                `Welcome back, ${user.name}! 🚀`
            );


            setTimeout(() => {

                showApp();

            }, 700);

        });

    }


    /* =====================================================
       DEMO LOGIN
    ===================================================== */

    if (demoLogin) {

        demoLogin.addEventListener("click", () => {

            user = {

                name: "Aditya",
                email: "aditya@example.com",
                role: "Learner"

            };


            localStorage.setItem(
                "sakshamSetuUser",
                JSON.stringify(user)
            );


            showToast(
                "Demo mode activated! 🚀"
            );


            setTimeout(() => {

                showApp();

            }, 600);

        });

    }


    /* =====================================================
       SHOW APPLICATION
    ===================================================== */

    function showApp() {

        if (loginScreen) {

            loginScreen.classList.add("login-hide");

            setTimeout(() => {
                loginScreen.style.display = "none";
            }, 500);

        }


        if (app) {

            app.classList.remove("hidden");

            setTimeout(() => {
                app.classList.add("app-visible");
            }, 50);

        }


        updateUserInterface();

        renderDashboard();

        renderLearningCourses();

        renderCompetency();

        renderResources();

        renderCertificates();

    }


    /* =====================================================
       USER INTERFACE
    ===================================================== */

    function updateUserInterface() {

        const firstLetter =
            user.name ?
            user.name.charAt(0).toUpperCase() :
            "A";


        const elements = {

            sidebarName:
                document.getElementById("sidebarName"),

            sidebarRole:
                document.getElementById("sidebarRole"),

            sidebarAvatar:
                document.getElementById("sidebarAvatar"),

            topName:
                document.getElementById("topName"),

            topAvatar:
                document.getElementById("topAvatar"),

            welcomeName:
                document.getElementById("welcomeName"),

            settingsName:
                document.getElementById("settingsName"),

            settingsEmail:
                document.getElementById("settingsEmail"),

            settingsAvatar:
                document.getElementById("settingsAvatar")

        };


        if (elements.sidebarName)
            elements.sidebarName.textContent =
                user.name || "Aditya";

        if (elements.sidebarRole)
            elements.sidebarRole.textContent =
                user.role || "Learner";

        if (elements.sidebarAvatar)
            elements.sidebarAvatar.textContent =
                firstLetter;

        if (elements.topName)
            elements.topName.textContent =
                user.name || "Aditya";

        if (elements.topAvatar)
            elements.topAvatar.textContent =
                firstLetter;

        if (elements.welcomeName)
            elements.welcomeName.textContent =
                user.name || "Aditya";

        if (elements.settingsName)
            elements.settingsName.value =
                user.name || "Aditya";

        if (elements.settingsEmail)
            elements.settingsEmail.value =
                user.email || "";

        if (elements.settingsAvatar)
            elements.settingsAvatar.textContent =
                firstLetter;

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageName = item.dataset.page;

            navigateTo(pageName);

        });

    });


    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", () => {

            navigateTo(
                button.dataset.go
            );

        });

    });


    function navigateTo(pageName) {

        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === pageName
            );

        });


        pages.forEach(page => {

            page.classList.toggle(
                "active-page",
                page.id === pageName
            );

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (window.innerWidth < 900) {

            document
                .querySelector(".sidebar")
                ?.classList.remove("mobile-open");

        }

    }


    /* =====================================================
       DASHBOARD RENDER
    ===================================================== */

    function renderDashboard() {

        renderDashboardCourses();

        renderCompetencyPreview();

        renderSkillGaps();

        renderRecommendedCourses();

    }


    function renderDashboardCourses() {

        const container =
            document.getElementById("dashboardCourses");

        if (!container) return;


        const activeCourses =
            appData.courses
                .filter(course =>
                    course.status === "in-progress"
                )
                .slice(0, 3);


        container.innerHTML =
            activeCourses.map(course => `

            <div class="course-progress-item">

                <div class="course-mini-icon">
                    ${course.icon}
                </div>

                <div class="course-progress-info">

                    <div class="course-progress-title">

                        <strong>${course.title}</strong>

                        <span>${course.progress}%</span>

                    </div>

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="
                                width:${course.progress}%
                            "
                        ></div>

                    </div>

                </div>

                <button
                    class="mini-continue"
                    data-course="${course.id}"
                >
                    Continue
                </button>

            </div>

            `).join("");

    }


    function renderCompetencyPreview() {

        const container =
            document.getElementById("competencyPreview");

        if (!container) return;


        container.innerHTML =
            appData.skills
                .slice(0, 4)
                .map(skill => `

                <div class="competency-item">

                    <div>

                        <strong>${skill.name}</strong>

                        <span>${skill.score}%</span>

                    </div>

                    <div class="progress-track">

                        <div
                            class="progress-fill skill-progress"
                            style="
                                width:${skill.score}%
                            "
                        ></div>

                    </div>

                </div>

                `).join("");

    }


    function renderSkillGaps() {

        const container =
            document.getElementById("skillGapList");

        if (!container) return;


        const gaps =
            appData.skills
                .map(skill => ({
                    ...skill,
                    gap: skill.target - skill.score
                }))
                .sort((a, b) => b.gap - a.gap)
                .slice(0, 3);


        container.innerHTML =
            gaps.map(skill => `

            <div class="skill-gap-card">

                <div class="gap-icon">
                    🎯
                </div>

                <div>

                    <h4>${skill.name}</h4>

                    <p>
                        Current: ${skill.score}%
                        • Target: ${skill.target}%
                    </p>

                </div>

                <div class="gap-score">

                    ${skill.gap}%
                    <span>Gap</span>

                </div>

            </div>

            `).join("");

    }


    function renderRecommendedCourses() {

        const container =
            document.getElementById("recommendedCourses");

        if (!container) return;


        const recommended =
            appData.courses
                .filter(course =>
                    course.status === "available"
                );


        container.innerHTML =
            recommended.map(course => `

            <div class="recommended-card">

                <div class="course-card-top">

                    <div class="course-big-icon">
                        ${course.icon}
                    </div>

                    <span class="course-category">
                        ${course.category}
                    </span>

                </div>

                <h3>${course.title}</h3>

                <p>
                    ${course.instructor}
                </p>

                <div class="course-meta">

                    <span>⏱ ${course.duration}</span>

                    <span>📚 ${course.lessons} lessons</span>

                </div>

                <button
                    class="primary-btn enroll-course"
                    data-course="${course.id}"
                >
                    Start Learning →
                </button>

            </div>

            `).join("");

    }


    /* =====================================================
       LEARNING PAGE
    ===================================================== */

    function renderLearningCourses(filter = "all") {

        const container =
            document.getElementById("learningCourses");

        if (!container) return;


        let courses = [...appData.courses];


        if (filter === "in-progress") {

            courses =
                courses.filter(course =>
                    course.status === "in-progress"
                );

        }


        if (filter === "completed") {

            courses =
                courses.filter(course =>
                    course.status === "completed"
                );

        }


        container.innerHTML =
            courses.map(course => `

            <div class="learning-card">

                <div class="learning-card-icon">

                    ${course.icon}

                </div>

                <div class="learning-card-content">

                    <span class="course-category">
                        ${course.category}
                    </span>

                    <h3>
                        ${course.title}
                    </h3>

                    <p>
                        ${course.instructor}
                    </p>

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="
                                width:${course.progress}%
                            "
                        ></div>

                    </div>

                    <div class="learning-card-footer">

                        <span>
                            ${course.progress}% Complete
                        </span>

                        <button
                            class="outline-btn open-course"
                            data-course="${course.id}"
                        >

                            ${
                                course.status === "completed"
                                ? "View Certificate"
                                : "Continue →"
                            }

                        </button>

                    </div>

                </div>

            </div>

            `).join("");

    }


    /* =====================================================
       LEARNING FILTERS
    ===================================================== */

    document
        .querySelectorAll(".learning-tab")
        .forEach(tab => {

            tab.addEventListener("click", () => {

                document
                    .querySelectorAll(".learning-tab")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                tab.classList.add("active");


                renderLearningCourses(
                    tab.dataset.filter
                );

            });

        });


    /* =====================================================
       COMPETENCY PAGE
    ===================================================== */

    function renderCompetency() {

        const container =
            document.getElementById("skillsGrid");

        if (!container) return;


        container.innerHTML =
            appData.skills.map(skill => `

            <div class="skill-card">

                <div class="skill-card-header">

                    <div>

                        <h3>${skill.name}</h3>

                        <span>${skill.level}</span>

                    </div>

                    <strong>
                        ${skill.score}%
                    </strong>

                </div>

                <div class="progress-track">

                    <div
                        class="progress-fill"
                        style="
                            width:${skill.score}%
                        "
                    ></div>

                </div>

                <div class="skill-target">

                    Target:
                    ${skill.target}%

                </div>

            </div>

            `).join("");

    }


    /* =====================================================
       SKILL ANALYSIS
    ===================================================== */

    function runSkillAnalysis() {

        const button =
            document.getElementById("runAnalysis");

        if (button) {

            button.textContent =
                "Analyzing...";

            button.disabled = true;

        }


        setTimeout(() => {

            appData.skills.forEach(skill => {

                const improvement =
                    Math.floor(
                        Math.random() * 5
                    ) + 1;

                skill.score =
                    Math.min(
                        skill.score + improvement,
                        100
                    );

            });


            renderCompetency();

            renderCompetencyPreview();

            renderSkillGaps();


            const average =
                Math.round(

                    appData.skills.reduce(
                        (total, skill) =>
                            total + skill.score,
                        0
                    )

                    / appData.skills.length

                );


            document
                .getElementById("overallScore")
                .textContent =
                `${average}%`;


            document
                .getElementById("ringScore")
                .textContent =
                average;


            document
                .getElementById("competencyScore")
                .textContent =
                `${average}%`;


            if (button) {

                button.textContent =
                    "✦ Run Skill Analysis";

                button.disabled = false;

            }


            showToast(
                "Skill analysis completed successfully! 🎯"
            );

        }, 1500);

    }


    const runAnalysis =
        document.getElementById("runAnalysis");

    const analyzeSkills =
        document.getElementById("analyzeSkills");


    if (runAnalysis) {

        runAnalysis.addEventListener(
            "click",
            runSkillAnalysis
        );

    }


    if (analyzeSkills) {

        analyzeSkills.addEventListener(
            "click",
            () => {

                navigateTo("competency");

                setTimeout(
                    runSkillAnalysis,
                    400
                );

            }
        );

    }


    /* =====================================================
       KNOWLEDGE HUB
    ===================================================== */

    function renderResources(
        search = "",
        category = "all"
    ) {

        const container =
            document.getElementById("resourceGrid");

        if (!container) return;


        let resources =
            [...appData.resources];


        if (search) {

            resources =
                resources.filter(resource =>

                    resource.title
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                    ||

                    resource.description
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                );

        }


        if (category !== "all") {

            resources =
                resources.filter(resource =>
                    resource.category === category
                );

        }


        if (!resources.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <div>🔍</div>

                    <h3>No resources found</h3>

                    <p>
                        Try another search.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            resources.map(resource => `

            <div class="resource-card">

                <div class="resource-icon">

                    ${resource.icon}

                </div>

                <span class="resource-type">

                    ${resource.type}

                </span>

                <h3>
                    ${resource.title}
                </h3>

                <p>
                    ${resource.description}
                </p>

                <div class="resource-footer">

                    <span>
                        ${resource.category}
                    </span>

                    <button
                        class="text-btn resource-open"
                    >
                        Explore →
                    </button>

                </div>

            </div>

            `).join("");

    }


    const resourceSearch =
        document.getElementById("resourceSearch");

    const resourceCategory =
        document.getElementById("resourceCategory");


    function updateResourceFilters() {

        renderResources(

            resourceSearch ?
            resourceSearch.value :
            "",

            resourceCategory ?
            resourceCategory.value :
            "all"

        );

    }


    if (resourceSearch) {

        resourceSearch.addEventListener(
            "input",
            updateResourceFilters
        );

    }


    if (resourceCategory) {

        resourceCategory.addEventListener(
            "change",
            updateResourceFilters
        );

    }


    /* =====================================================
       CERTIFICATES
    ===================================================== */

    function renderCertificates() {

        const container =
            document.getElementById("certificateGrid");

        if (!container) return;


        container.innerHTML =
            appData.certificates.map(certificate => `

            <div class="certificate-card">

                <div class="certificate-icon">

                    ${certificate.icon}

                </div>

                <div>

                    <h3>
                        ${certificate.title}
                    </h3>

                    <p>
                        Completed:
                        ${certificate.date}
                    </p>

                    <small>
                        Credential ID:
                        ${certificate.credential}
                    </small>

                </div>

                <button
                    class="outline-btn view-certificate"
                >
                    View
                </button>

            </div>

            `).join("");

    }


    /* =====================================================
       COURSE MODAL
    ===================================================== */

    function openCourse(courseId) {

        const course =
            appData.courses.find(course =>
                course.id === Number(courseId)
            );

        if (!course) return;


        modalBody.innerHTML = `

            <div class="course-modal-header">

                <div class="course-modal-icon">
                    ${course.icon}
                </div>

                <div>

                    <span class="course-category">
                        ${course.category}
                    </span>

                    <h2>
                        ${course.title}
                    </h2>

                    <p>
                        Instructor:
                        ${course.instructor}
                    </p>

                </div>

            </div>


            <div class="modal-progress-section">

                <div class="modal-progress-title">

                    <span>Your Progress</span>

                    <strong>
                        ${course.progress}%
                    </strong>

                </div>

                <div class="progress-track">

                    <div
                        class="progress-fill"
                        style="
                            width:${course.progress}%
                        "
                    ></div>

                </div>

            </div>


            <div class="course-details-grid">

                <div>

                    ⏱

                    <strong>
                        ${course.duration}
                    </strong>

                    <span>Duration</span>

                </div>

                <div>

                    📚

                    <strong>
                        ${course.lessons}
                    </strong>

                    <span>Lessons</span>

                </div>

            </div>


            <button
                class="primary-btn modal-start-course"
                data-course="${course.id}"
            >

                ${
                    course.progress > 0
                    ? "Continue Learning →"
                    : "Start Course →"
                }

            </button>

        `;


        modal.classList.add("show");

    }


    /* =====================================================
       GLOBAL CLICK EVENTS
    ===================================================== */

    document.addEventListener("click", event => {

        const courseButton =
            event.target.closest(
                ".open-course, .mini-continue, .enroll-course"
            );


        if (courseButton) {

            openCourse(
                courseButton.dataset.course
            );

        }


        if (
            event.target.closest(".resource-open")
        ) {

            showToast(
                "Resource opened successfully 📚",
                "success"
            );

        }


        if (
            event.target.closest(".view-certificate")
        ) {

            showToast(
                "Certificate preview opened 🏆",
                "success"
            );

        }


        if (
            event.target.closest(".modal-start-course")
        ) {

            const courseId =
                event.target.dataset.course;


            const course =
                appData.courses.find(item =>
                    item.id === Number(courseId)
                );


            if (course) {

                course.progress =
                    Math.min(
                        course.progress + 10,
                        100
                    );


                if (
                    course.progress >= 100
                ) {

                    course.status =
                        "completed";

                } else {

                    course.status =
                        "in-progress";

                }


                renderDashboard();

                renderLearningCourses();

                modal.classList.remove("show");


                showToast(
                    `${course.title} progress updated! 🎉`
                );

            }

        }

    });


    /* =====================================================
       MODAL CLOSE
    ===================================================== */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            () => {

                modal.classList.remove("show");

            }
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target.classList.contains(
                        "modal-overlay"
                    )
                ) {

                    modal.classList.remove("show");

                }

            }
        );

    }


    /* =====================================================
       CONTINUE LEARNING
    ===================================================== */

    const continueLearning =
        document.getElementById("continueLearning");


    if (continueLearning) {

        continueLearning.addEventListener(
            "click",
            () => {

                navigateTo("learning");

                showToast(
                    "Pick up where you left off! 📚"
                );

            }
        );

    }


    /* =====================================================
       BROWSE COURSES
    ===================================================== */

    const browseCoursesBtn =
        document.getElementById(
            "browseCoursesBtn"
        );


    if (browseCoursesBtn) {

        browseCoursesBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "New courses coming soon! 🚀",
                    "info"
                );

            }
        );

    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    const saveProfile =
        document.getElementById("saveProfile");


    if (saveProfile) {

        saveProfile.addEventListener(
            "click",
            () => {

                const name =
                    document
                        .getElementById("settingsName")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("settingsEmail")
                        .value
                        .trim();


                if (!name || !email) {

                    showToast(
                        "Please fill all fields",
                        "error"
                    );

                    return;

                }


                user.name = name;

                user.email = email;


                localStorage.setItem(
                    "sakshamSetuUser",
                    JSON.stringify(user)
                );


                updateUserInterface();


                showToast(
                    "Profile updated successfully! ✓"
                );

            }
        );

    }


    /* =====================================================
       CHANGE AVATAR
    ===================================================== */

    const changeAvatar =
        document.getElementById("changeAvatar");


    if (changeAvatar) {

        changeAvatar.addEventListener(
            "click",
            () => {

                const avatars = [
                    "A",
                    "🔥",
                    "🚀",
                    "🎓",
                    "💡",
                    "⭐"
                ];


                const randomAvatar =
                    avatars[
                        Math.floor(
                            Math.random() *
                            avatars.length
                        )
                    ];


                document
                    .getElementById("settingsAvatar")
                    .textContent =
                    randomAvatar;


                document
                    .getElementById("sidebarAvatar")
                    .textContent =
                    randomAvatar;


                document
                    .getElementById("topAvatar")
                    .textContent =
                    randomAvatar;


                showToast(
                    "Avatar changed! 😎"
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "sakshamSetuUser"
                );


                user = {

                    name: "",
                    email: "",
                    role: "Learner"

                };


                app.classList.add("hidden");

                app.classList.remove(
                    "app-visible"
                );


                loginScreen.style.display =
                    "flex";


                setTimeout(() => {

                    loginScreen.classList.remove(
                        "login-hide"
                    );

                }, 50);


                showToast(
                    "Logged out successfully!"
                );

            }
        );

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                document
                    .querySelector(".sidebar")
                    ?.classList.toggle(
                        "mobile-open"
                    );

            }
        );

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "🔔 You have 3 learning updates!",
                    "info"
                );

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (modal) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }

        }
    );


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c SakshamSetu 🚀 ",
        `
        background: linear-gradient(90deg,#2563eb,#7c3aed);
        color:white;
        padding:10px 20px;
        font-size:16px;
        font-weight:bold;
        border-radius:8px;
        `
    );

    console.log(
        "Smart Learning Platform Initialized Successfully!"
    );

});

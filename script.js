/* =========================================
   SAKSHAMSETU - MAIN JAVASCRIPT
   Interactive Frontend Functionality
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll("a[href^='#']");

    /* =========================================
       USER DATA
    ========================================= */

    let userData = JSON.parse(localStorage.getItem("sakshamsetuUser")) || {
        name: "",
        role: "",
        enrolledCourses: [],
        progress: 0
    };


    /* =========================================
       TOAST NOTIFICATION
    ========================================= */

    function showToast(message, type = "success") {

        const existingToast = document.querySelector(".toast");

        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = `toast ${type}`;

        toast.innerHTML = `
            <span>${type === "success" ? "✓" : "!"}</span>
            <p>${message}</p>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 100);

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 400);

        }, 3000);
    }


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = this.getAttribute("href");

            if (target && target !== "#") {

                const section = document.querySelector(target);

                if (section) {

                    e.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            }

        });

    });


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =========================================
       CREATE MODAL
    ========================================= */

    function createModal(title, content) {

        const oldModal = document.querySelector(".custom-modal");

        if (oldModal) {
            oldModal.remove();
        }

        const modal = document.createElement("div");

        modal.className = "custom-modal";

        modal.innerHTML = `

            <div class="modal-overlay"></div>

            <div class="modal-box">

                <button class="close-modal">×</button>

                <h2>${title}</h2>

                <div class="modal-content">
                    ${content}
                </div>

            </div>

        `;

        document.body.appendChild(modal);


        setTimeout(() => {
            modal.classList.add("active");
        }, 50);


        const close = () => {

            modal.classList.remove("active");

            setTimeout(() => {
                modal.remove();
            }, 300);

        };


        modal.querySelector(".close-modal")
            .addEventListener("click", close);


        modal.querySelector(".modal-overlay")
            .addEventListener("click", close);

    }


    /* =========================================
       ROLE SELECTION
    ========================================= */

    window.selectRole = function (role) {

        userData.role = role;

        localStorage.setItem(
            "sakshamsetuUser",
            JSON.stringify(userData)
        );

        createModal(
            `Welcome ${role}! 👋`,
            `

            <p class="modal-description">
                Join SakshamSetu and unlock your learning journey.
            </p>

            <form id="registerForm">

                <input
                    type="text"
                    id="userName"
                    placeholder="Enter your name"
                    required
                >

                <input
                    type="email"
                    id="userEmail"
                    placeholder="Enter your email"
                    required
                >

                <button type="submit" class="modal-btn">
                    Continue
                </button>

            </form>

            `
        );


        const form = document.querySelector("#registerForm");

        if (form) {

            form.addEventListener("submit", (e) => {

                e.preventDefault();

                const name =
                    document.querySelector("#userName").value;

                userData.name = name;

                localStorage.setItem(
                    "sakshamsetuUser",
                    JSON.stringify(userData)
                );

                document
                    .querySelector(".custom-modal")
                    .remove();

                showToast(
                    `Welcome to SakshamSetu, ${name}! 🚀`
                );

                updateUserInterface();

            });

        }

    };


    /* =========================================
       UPDATE USER INTERFACE
    ========================================= */

    function updateUserInterface() {

        if (!userData.name) return;

        const loginButtons =
            document.querySelectorAll(
                ".login-btn, .btn-login"
            );

        loginButtons.forEach(button => {

            button.textContent =
                userData.name.split(" ")[0];

        });

    }


    updateUserInterface();


    /* =========================================
       LOGIN BUTTON
    ========================================= */

    document.addEventListener("click", (e) => {

        if (
            e.target.classList.contains("login-btn") ||
            e.target.classList.contains("btn-login")
        ) {

            createModal(
                "Login to SakshamSetu",
                `

                <form id="loginForm">

                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                    >

                    <input
                        type="password"
                        placeholder="Password"
                        required
                    >

                    <button
                        type="submit"
                        class="modal-btn"
                    >
                        Login
                    </button>

                </form>

                `
            );


            const loginForm =
                document.querySelector("#loginForm");

            if (loginForm) {

                loginForm.addEventListener(
                    "submit",
                    (event) => {

                        event.preventDefault();

                        showToast(
                            "Login successful! 🎉"
                        );

                        setTimeout(() => {

                            const modal =
                                document.querySelector(
                                    ".custom-modal"
                                );

                            if (modal) modal.remove();

                        }, 500);

                    }
                );

            }

        }

    });


    /* =========================================
       COURSE ENROLLMENT
    ========================================= */

    document.addEventListener("click", (e) => {

        if (
            e.target.classList.contains("enroll-btn")
        ) {

            const course =
                e.target
                    .closest(".course-card")
                    ?.querySelector("h3")
                    ?.innerText
                    || "Course";


            if (
                !userData.enrolledCourses.includes(course)
            ) {

                userData.enrolledCourses.push(course);

                localStorage.setItem(
                    "sakshamsetuUser",
                    JSON.stringify(userData)
                );

                e.target.innerText = "Enrolled ✓";

                e.target.disabled = true;

                showToast(
                    `Successfully enrolled in ${course}`
                );

            } else {

                showToast(
                    "You are already enrolled!",
                    "info"
                );

            }

        }

    });


    /* =========================================
       LEARNING PROGRESS
    ========================================= */

    window.updateProgress = function (value) {

        userData.progress = value;

        localStorage.setItem(
            "sakshamsetuUser",
            JSON.stringify(userData)
        );

        const progressBar =
            document.querySelector(".progress-fill");

        if (progressBar) {

            progressBar.style.width = `${value}%`;

        }

        const progressText =
            document.querySelector(".progress-text");

        if (progressText) {

            progressText.innerText =
                `${value}% Completed`;

        }

    };


    /* =========================================
       QUIZ SYSTEM
    ========================================= */

    window.startQuiz = function () {

        createModal(
            "Skill Assessment 🧠",
            `

            <div class="quiz-box">

                <div class="quiz-progress">
                    Question 1 of 3
                </div>

                <h3>
                    Which technology is primarily used
                    for web page structure?
                </h3>

                <div class="quiz-options">

                    <button class="quiz-option" data-answer="false">
                        CSS
                    </button>

                    <button class="quiz-option" data-answer="true">
                        HTML
                    </button>

                    <button class="quiz-option" data-answer="false">
                        Python
                    </button>

                    <button class="quiz-option" data-answer="false">
                        SQL
                    </button>

                </div>

            </div>

            `
        );


        const options =
            document.querySelectorAll(".quiz-option");


        options.forEach(option => {

            option.addEventListener("click", () => {

                const correct =
                    option.dataset.answer === "true";


                if (correct) {

                    option.classList.add("correct");

                    showToast(
                        "Correct Answer! 🎉"
                    );

                    setTimeout(() => {

                        const modal =
                            document.querySelector(
                                ".custom-modal"
                            );

                        if (modal) modal.remove();

                        updateProgress(
                            Math.min(
                                userData.progress + 10,
                                100
                            )
                        );

                    }, 1200);

                } else {

                    option.classList.add("wrong");

                    showToast(
                        "Try again!",
                        "error"
                    );

                }

            });

        });

    };


    /* =========================================
       SEARCH FUNCTION
    ========================================= */

    const searchInputs =
        document.querySelectorAll(
            "input[type='search'], .search-input"
        );


    searchInputs.forEach(input => {

        input.addEventListener("input", () => {

            const query =
                input.value.toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".course-card"
                );

            cards.forEach(card => {

                const text =
                    card.innerText.toLowerCase();

                if (text.includes(query)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       FEEDBACK SYSTEM
    ========================================= */

    document.addEventListener("submit", (e) => {

        if (
            e.target.classList.contains(
                "feedback-form"
            )
        ) {

            e.preventDefault();

            const textarea =
                e.target.querySelector("textarea");

            if (
                textarea &&
                textarea.value.trim() !== ""
            ) {

                showToast(
                    "Thank you for your feedback! 💙"
                );

                textarea.value = "";

            }

        }

    });


    /* =========================================
       DASHBOARD BUTTONS
    ========================================= */

    document.addEventListener("click", (e) => {

        if (
            e.target.classList.contains(
                "dashboard-btn"
            )
        ) {

            if (!userData.name) {

                showToast(
                    "Please login first!",
                    "error"
                );

                return;

            }


            createModal(
                "My Learning Dashboard",
                `

                <div class="dashboard-modal">

                    <div class="dash-profile">

                        <div class="avatar">
                            ${userData.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <h3>${userData.name}</h3>

                            <p>
                                ${userData.role || "Learner"}
                            </p>

                        </div>

                    </div>


                    <div class="dash-stats">

                        <div>
                            <strong>
                                ${userData.enrolledCourses.length}
                            </strong>

                            <span>
                                Courses
                            </span>
                        </div>


                        <div>
                            <strong>
                                ${userData.progress}%
                            </strong>

                            <span>
                                Progress
                            </span>
                        </div>

                    </div>


                    <div class="dash-progress">

                        <p>Overall Progress</p>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="
                                    width:${userData.progress}%
                                "
                            ></div>

                        </div>

                    </div>

                </div>

                `
            );

        }

    });


    /* =========================================
       ANIMATE ELEMENTS ON SCROLL
    ========================================= */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    document
        .querySelectorAll(
            ".feature-card, .course-card, .role-card"
        )
        .forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });


    /* =========================================
       KEYBOARD SHORTCUTS
    ========================================= */

    document.addEventListener("keydown", (e) => {

        /* ESC CLOSE MODAL */

        if (e.key === "Escape") {

            const modal =
                document.querySelector(".custom-modal");

            if (modal) {

                modal.remove();

            }

        }


        /* CTRL + K SEARCH */

        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "k"
        ) {

            e.preventDefault();

            const search =
                document.querySelector(
                    "input[type='search'], .search-input"
                );

            if (search) {

                search.focus();

            }

        }

    });


    /* =========================================
       CONSOLE BRANDING 😎
    ========================================= */

    console.log(
        "%c SakshamSetu 🚀 ",
        `
        background: #2563eb;
        color: white;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        `
    );

    console.log(
        "Empowering Skills. Connecting Futures."
    );

});

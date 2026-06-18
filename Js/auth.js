const message =
    document.getElementById("message");

/* =====================
   ELEMENTOS DOS MODAIS
===================== */

const registerModal =
    document.getElementById("registerModal");

const recoveryModal =
    document.getElementById("recoveryModal");

const openRegister =
    document.getElementById("openRegister");

const closeRegister =
    document.getElementById("closeRegister");

const openRecovery =
    document.getElementById("openRecovery");

const closeRecovery =
    document.getElementById("closeRecovery");

/* =====================
   ABRIR / FECHAR MODAIS
===================== */

openRegister.addEventListener(
    "click",
    () => {
        registerModal.style.display = "flex";
    }
);

closeRegister.addEventListener(
    "click",
    () => {
        registerModal.style.display = "none";
    }
);

openRecovery.addEventListener(
    "click",
    () => {
        recoveryModal.style.display = "flex";
    }
);

closeRecovery.addEventListener(
    "click",
    () => {
        recoveryModal.style.display = "none";
    }
);

window.addEventListener(
    "click",
    (e) => {

        if (e.target === registerModal) {
            registerModal.style.display = "none";
        }

        if (e.target === recoveryModal) {
            recoveryModal.style.display = "none";
        }

    }
);

/* =====================
   MOSTRAR SENHA
===================== */

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");

togglePassword.addEventListener(
    "click",
    () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

        } else {

            passwordInput.type = "password";

        }

    }
);

/* =====================
   LOGIN
===================== */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const user =
                users.find(user =>

                    user.email === email &&
                    user.password === password

                );

            if (user) {

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(user)
                );

                window.location.href =
                    "profiles.html";

            } else {

                message.innerHTML =
                    "E-mail ou senha inválidos.";

            }

        }
    );

/* =====================
   CADASTRO
===================== */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document.getElementById("registerName").value;

            const email =
                document.getElementById("registerEmail").value;

            const password =
                document.getElementById("registerPassword").value;

            const confirm =
                document.getElementById("registerConfirmPassword").value;

            if (password !== confirm) {

                alert(
                    "As senhas não coincidem."
                );

                return;

            }

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const exists =
                users.find(
                    user =>
                        user.email === email
                );

            if (exists) {

                alert(
                    "Usuário já cadastrado."
                );

                return;

            }

            users.push({

                name,
                email,
                password

            });

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            alert(
                "Conta criada com sucesso!"
            );

            registerModal.style.display =
                "none";

            document
                .getElementById("registerForm")
                .reset();

        }
    );

/* =====================
   RECUPERAÇÃO
===================== */

document
    .getElementById("recoveryForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            alert(
                "Funcionalidade simulada para portfólio."
            );

            recoveryModal.style.display =
                "none";

        }
    );
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-login");
    const msgError = document.getElementById("msg-error");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêche la soumission par défaut du formulaire

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Enregistrer le token dans le localStorage
                localStorage.setItem("token", data.token);
                // Rediriger vers la page d'accueil
                window.location.href = "index.html";
            } else {
                // Afficher le message d'erreur
                msgError.style.display = "flex";
                setTimeout(()=>{
                    msgError.style.display = "none";
                },5000)
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            // Afficher le message d'erreur
            msgError.style.display = "flex";
            setTimeout(()=>{
                msgError.style.display = "none";
            },5000)
        }
    });
});
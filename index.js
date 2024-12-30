// Validation du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const email = registerForm.querySelector('input[type="email"]').value;
            const phone = registerForm.querySelector('input[type="tel"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            
            // Validation de l'email
            if (!validateEmail(email)) {
                showError('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Validation du téléphone
            if (!validatePhone(phone)) {
                showError('Veuillez entrer un numéro de téléphone valide');
                return;
            }
            
            // Validation du mot de passe
            if (!validatePassword(password)) {
                showError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre');
                return;
            }
            
            // Si tout est valide, envoi du formulaire
            submitForm({ email, phone, password });
        });
    }
});

// Fonctions de validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(?:(?:\+|00)0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

// Affichage des erreurs
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Animation de l'erreur
    errorDiv.style.opacity = '0';
    document.querySelector('.quick-register').appendChild(errorDiv);
    
    // Fade in
    setTimeout(() => {
        errorDiv.style.opacity = '1';
    }, 10);
    
    // Suppression après 3 secondes
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 3000);
}

// Soumission du formulaire
async function submitForm(data) {
    try {
        // Simulation d'un appel API
        // À remplacer par votre véritable endpoint d'API
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Redirection vers la page de confirmation
            window.location.href = '/confirmation';
        } else {
            showError('Une erreur est survenue. Veuillez réessayer.');
        }
    } catch (error) {
        showError('Erreur de connexion. Veuillez vérifier votre connexion internet.');
    }
}

// Animation smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gestion de la recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            handleSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(searchInput.value);
            }
        });
    }
});

function handleSearch(query) {
    if (query.trim() === '') {
        showError('Veuillez entrer un terme de recherche');
        return;
    }
    
    // Ici, vous pouvez implémenter votre logique de recherche
    console.log('Recherche pour:', query);
    // Redirection vers la page de résultats de recherche
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// Gestion du badge de messages
function updateMessageBadge(count) {
    const badge = document.querySelector('.message-badge');
    if (badge) {
        if (count > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = count;
        } else {
            badge.style.display = 'none';
        }
    }
}

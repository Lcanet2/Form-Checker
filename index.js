const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
let pseudo, email, password, confirmPass;
const progressBar = document.getElementById('progress-bar');
const clearBar = () => {
        progressBar.classList.remove('progressBlue')
        progressBar.classList.remove('progressGreen')
        progressBar.classList.remove('progressRed')
}

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector('.' + tag + '-container');
    const span = document.querySelector('.' + tag + '-container > span');
    
    if (!valid) {
        container.classList.add('error');
        span.textContent = message;
    }   else {
        container.classList.remove('error');
        span.textContent = message
    }
}

const pseudoChecker = (value) => {

    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay('pseudo', 'Le pseudo doit contenir entre 3 et 20 caractères');
        pseudo = null;

    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('pseudo', 'Le pseudo ne peut contenir des caractères spéciaux (#!?...');
        pseudo = null;

    } else {
        errorDisplay('pseudo', "", true);
        pseudo = value;
    }
}

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay('email', `L'adresse email n'est pas valide`);
    email = null;
    } else {
        errorDisplay('email','',true);
        email = value
        }
};

const passwordhecker = (value) => {
    clearBar();
    if (!value.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)) {
        if (value.length ===0 ) return;
        errorDisplay('password','Il faut une minimum de 8 caractères, 1 majuscule, 1 chiffre, et 1 caractère spécial')
        progressBar.classList.add('progressRed')
        password = null;
    } else if (value.length < 12) {
        errorDisplay('password', "", true);
        progressBar.classList.add('progressBlue');
        password = value;
    } else {
        errorDisplay('password','', true);
        progressBar.classList.add('progressGreen')
        password = value;
    } 
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay('confirm', "Les mots de passe ne correspondent pas")
        confirmPass = false;
    } else {
        errorDisplay('confirm', "", true)
        confirmPass = true;
    }
};


inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        switch (e.target.id) {
            case "pseudo" :
                pseudoChecker(e.target.value);
                break;
            case "email" :
                emailChecker(e.target.value);
                break;
            case "password" :
                passwordhecker(e.target.value);
                break;
            case "confirm" :
                confirmChecker(e.target.value);
                break;
            default : null;
                
        }
    });
});

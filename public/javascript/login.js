const mainContainerEl = document.getElementById('main');
const signupFormEl = document.getElementById('signup-form');
const loginFormEl = document.getElementById('login-form');
const signupPasswordEl = document.querySelector('input[name="password-signup"]');
const checkmarkSpanEl = document.getElementById('check-length');

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username-signup"]').value.trim();
    const email = document.querySelector('input[name="email-signup"]').value.trim();
    const password = document.querySelector('input[name="password-signup"]').value.trim();

    console.log(username, email, password);

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('Account Created');

            const response = await fetch('api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        } else {
            alert(response.statusText);
        }
    }
};

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email-login"]').value.trim();
    const password = document.querySelector('input[name="password-login"]').value.trim();

    if (email && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

function correctLength() {
    const checkmarkEl = document.createElement('img');
    
    checkmarkEl.setAttribute("src", "../assets/checkmark.svg");

    checkmarkSpanEl.append(checkmarkEl);
};

loginFormEl.addEventListener('submit', loginFormHandler);
signupFormEl.addEventListener('submit', signupFormHandler);
signupPasswordEl.addEventListener('input', function() {
    if (signupPasswordEl.value.length >= 6) {
        correctLength();
    }
});
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
            const alertEl = document.createElement('div')
            .classList.add('bg-emerald-300', 'py-2', 'px-3', 'text-mono', 'text-bold', 'text-slate-700', 'text-center', 'my-2')
            .textContent = 'Account Created Successfully!';

            mainContainerEl.prepend(alertEl);
        } else {
            const alertEl = document.createElement('div')
            .classList.add('bg-red-300', 'py-2', 'px-3', 'text-mono', 'text-bold', 'text-slate-700', 'text-center', 'my-2')
            .textContent = response.statusText;

            mainContainerEl.prepend(alertEl);
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
            const alertEl = document.createElement('div')
            .classList.add('bg-red-300', 'py-2', 'px-3', 'text-mono', 'text-bold', 'text-slate-700', 'text-center', 'my-2')
            .textContent = response.statusText;

            mainContainerEl.prepend(alertEl);
        }
    }
};

function correctLength(event) {
    // event.preventDefault();

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
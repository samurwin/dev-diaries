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
    event.preventDefault();

    const checkmark = `<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="rgb(110 231 183 / var(--tw-ring-opacity))">
    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723
    3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066
    0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812
    3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1
    1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>`
    
    checkmarkSpanEl.innerHTML = checkmark;
};

loginFormEl.addEventListener('submit', loginFormHandler);
signupFormEl.addEventListener('submit', signupFormHandler);
signupPasswordEl.addEventListener('input', function() {
    if (signupPasswordEl.length >= 6) {
        correctLength();
    }
});
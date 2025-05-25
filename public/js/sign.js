document.addEventListener('DOMContentLoaded', () => {
    const signInPage = document.getElementById('signInPage');
    const signUpPage = document.getElementById('signUpPage');
    const links = document.querySelectorAll('a');
    const signInForm = signInPage.querySelector('form');
    const signUpForm = signUpPage.querySelector('form');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            signInPage.hidden = !signInPage.hidden;
            signUpPage.hidden = !signUpPage.hidden;
        });
    });

    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData);

        try {
            const response = await fetch('sign/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObj)
            });
            const data = await response.json();
            console.log('Sign in respons:', data.message);
            window.location.reload();
        } catch (error) {
            innerHTML = '';
            console.error('Sign in fejl:', error);
        }
    });

    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData);
        try {
            const response = await fetch('sign/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObj)
            });
            const data = await response.json();
            console.log('Sign up respons:', data.message);
        } catch (error) {
            console.error('Sign up fejl:', error);
        }
    });
});
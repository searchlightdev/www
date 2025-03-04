document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Show loading state
    const submitButton = document.getElementById('submit');
    const formStatus = document.getElementById('form-status');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    const url = 'https://prod-18.eastus.logic.azure.com:443/workflows/6a0185d1993245d19db9e349da93dafd/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=LB2npx2BOGRbLqEwW2MnUqJixAcJFIVRDhP24gzFrBQ'; // The URL to send the data to

    // Create a JSON object with the specific form fields
    const formData = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        name: document.getElementById('name').value,
        comments: document.getElementById('comments').value,
        date: new Date().toJSON().slice(0, 10)
    };

    // Form validation
    if (!formData.email && !formData.phone) {
        formStatus.innerHTML = 'Please provide either an email or phone number so we can contact you.';
        formStatus.className = 'error';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        return;
    }

    if (!formData.name) {
        formStatus.innerHTML = 'Please provide your name.';
        formStatus.className = 'error';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        return;
    }

    if (!formData.comments) {
        formStatus.innerHTML = 'Please tell us a bit about what you\'re looking for.';
        formStatus.className = 'error';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        return;
    }

    // Send the JSON object as a JSON string
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to application/json
        },
        body: JSON.stringify(formData) // Convert the object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    })
    .then(() => {
        // Success handling
        document.getElementById('contactForm').reset(); // Reset the form fields
        formStatus.innerHTML = 'Your message has been sent successfully! We\'ll be in touch soon.';
        formStatus.className = 'success';
        submitButton.innerHTML = 'Message Sent';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            formStatus.className = 'hidden';
        }, 3000);
    })
    .catch((error) => {
        // Error handling
        console.error('Error:', error);
        formStatus.innerHTML = 'Something went wrong. Please try again or contact us directly.';
        formStatus.className = 'error';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Try Again';
    });
});
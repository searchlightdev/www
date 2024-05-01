document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const url = 'https://prod-18.eastus.logic.azure.com:443/workflows/6a0185d1993245d19db9e349da93dafd/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=LB2npx2BOGRbLqEwW2MnUqJixAcJFIVRDhP24gzFrBQ'; // The URL to send the data to

    // Create a JSON object with the specific form fields
    const formData = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        name: document.getElementById('name').value,
        comments: document.getElementById('comments').value,
        date: new Date().toJSON().slice(0, 10)
    };

    if (formData.email || formData.phone || formData.name || formData.comments) { // don't submit an empty form

        // Send the JSON object as a JSON string
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to application/json
            },
            body: JSON.stringify(formData) // Convert the object to a JSON string
        })
            .then(data => {
                document.getElementById('contactForm').reset(); // Reset the form fields
                document.getElementById('submit').style.background = '#76B4AB'; // Show the thank you message
                document.getElementById('submit').innerHTML = 'Message received, thank you!'; // Show the thank you message
                
            })
            .catch((error) => {
                console.error('Error:', error); // Log an error if there is one
            });
    }
});
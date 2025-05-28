document.getElementById('newTicketForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    console.log(formDataObj);
})

console.log('newTicket.js');
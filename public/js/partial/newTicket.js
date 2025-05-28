let ticket = document.getElementById('newTicketForm');

ticket.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitTicket();
})
async function submitTicket() {
    const formData = new FormData(ticket);
    const formDataObj = Object.fromEntries(formData);
    console.log(formDataObj);
}

console.log('newTicket.js');
const sideBar = document.getElementById('homeNav');
const main = document.getElementById('homeMain');

async function loadNav() {
    sideBar.innerHTML = ""
    const res = await fetch('/home/loadNav');

    let data = await res.json();
    data.forEach(item => {
        sideBar.innerHTML += `<button onclick="loadMain('${item.id}')">${item.text}</button>`;
    });
}

async function loadMain(type) {
    const res = await fetch(`/home/loadMain/${type}`);
    main.innerHTML = await res.text();
}

loadNav().finally();


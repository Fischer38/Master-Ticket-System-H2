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

    const script = main.querySelectorAll('script');
    script.forEach((script) => {
        const src = script.src;
        const content = script.innerText;

        if(src) {
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if(existingScript) {
                existingScript.remove();
            }
        }else{
            const existingInlineScript = Array.from(document.querySelectorAll('script')).some(existing => existing.innerText === content);
            if(!existingInlineScript) {
                const newScript = document.createElement('script');
                newScript.src = src || null;
                newScript.textContent = content;
                document.body.appendChild(newScript);
            }
        }
        const newScript = document.createElement('script');
        newScript.src = src || null;
        newScript.textContent = content;
        document.body.appendChild(newScript);
    });
}

loadNav().finally();


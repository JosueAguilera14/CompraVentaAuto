const d = document,
    $main = d.querySelector('main'); //<main>

//Función AJAX
const getHTML = options => {
    let { url, success, error } = options; //destructuración
    const xhr = new XMLHttpRequest(); //AJAX

    //Evento donde se ejecuta AJAX
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let html = xhr.responseText; //Guardando HTML consumido
            success(html);

        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open("GET", url); //Petición GET
    xhr.setRequestHeader("Content-type", "text/html; charset=utf8"); //Cabecera de la petición
    xhr.send(); //Enviando petición
}


d.addEventListener("DOMContentLoaded", () => {
    getHTML({
        url: "assets/components/carrusel-slider.html", //endpoint de HTML consumido
        success: (html) => $main.innerHTML = html, //Agregando HTML consumido al <main>
        error: (err) => $main.innerHTML = `<h1>${err}</h1>` //Agregando error al <main>
    });
});

d.addEventListener("click", e => {
    if (e.target.matches(".menu enlace")) { //Si se clickea cualquier enlace del menú..
        e.preventDefault(); //Quitando evento por defecto
        getHTML({
            url: e.target.href, //endpoint de HTML consumido según el enlace que se clickee
            success: (html) => $main.innerHTML = html, //Agregando HTML consumido al <main>
            error: (err) => $main.innerText = `<h1>${err}</h1>`
        });
    }
});
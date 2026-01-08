function switch_page(page) {

    if (page == 0) {
        let home = document.getElementById("sketchbook-home");
        home.style.display = "block";

        let img = document.getElementById("sketchbook-img");
        img.style.display = "none";
    }

    else {
        let home = document.getElementById("sketchbook-home");
        home.style.display = "none";

        $('#sketchbook-img').attr('src', '/images/arts/sketchbooks/yellow_square/' + page + 'sketchbook_yellow_square.webp');

        let img = document.getElementById("sketchbook-img");
        img.style.display = "block";

        let button = document.getElementById("button-home");
        button.classList.remove('active');
    }

}

function switch_page_blue(page) {

    if (page == 0) {
        let home = document.getElementById("sketchbook-home");
        home.style.display = "block";

        let img = document.getElementById("sketchbook-img");
        img.style.display = "none";
    }

    else {
        let home = document.getElementById("sketchbook-home");
        home.style.display = "none";

        $('#sketchbook-img').attr('src', '/images/arts/sketchbooks/dark_blue/' + page + 'sketchbook_dark_blue.webp');

        let img = document.getElementById("sketchbook-img");
        img.style.display = "block";

        let button = document.getElementById("button-home");
        button.classList.remove('active');
    }
}
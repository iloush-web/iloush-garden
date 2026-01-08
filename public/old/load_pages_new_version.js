var cur_page = "home";
$(document).ready(function() {

});

function homeLoad() {

    let home = document.getElementById("home");
    let current = document.getElementById(cur_page);

    current.style.display = "none";
    home.style.display = "block";


    cur_page = "home"

}

function aboutLoad() {

    let about_me = document.getElementById("about-me");
    let current = document.getElementById(cur_page);

    current.style.display = "none";
    about_me.style.display = "block";

    $("#about-me").load("pages/about.html");
    cur_page = "about-me";

}

function camerasLoad() {

    let my_cameras = document.getElementById("my-cameras");
    let current = document.getElementById(cur_page);

    current.style.display = "none";
    my_cameras.style.display = "block";

    $("#my-cameras").load("pages/my_cameras.html");
    cur_page = "my-cameras";

}

function packettracerLoad() {

    let packet_tracer = document.getElementById("packet-tracer");
    let current = document.getElementById(cur_page);

    current.style.display = "none";
    packet_tracer.style.display = "block"

    $("#packet-tracer").load("pages/packet_tracer.html");
    cur_page = "packet-tracer";

}

function resoursesLoad() {

    let resourses = document.getElementById("resourses");
    let current = document.getElementById(cur_page);

    current.style.display = "none";
    resourses.style.display = "block";

    $("#resourses").load("pages/resourses.html");
    cur_page = "resourses";

}
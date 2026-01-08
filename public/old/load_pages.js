function homeLoad() {

  let home = document.getElementById("home");
  let about_me = document.getElementById("about-me");
  let my_cameras = document.getElementById("my-cameras");
  let packet_tracer = document.getElementById("packet-tracer");
  let resourses = document.getElementById("resourses");

  home.style.display = "block";
  about_me.style.display = "none";
  my_cameras.style.display = "none";
  packet_tracer.style.display = "none";
  resourses.style.display = "none";

}

function aboutLoad() {

  let home = document.getElementById("home");
  let about_me = document.getElementById("about-me");
  let my_cameras = document.getElementById("my-cameras");
  let packet_tracer = document.getElementById("packet-tracer");
  let resourses = document.getElementById("resourses");

  home.style.display = "none";
  about_me.style.display = "block";
  my_cameras.style.display = "none";
  packet_tracer.style.display = "none";
  resourses.style.display = "none";

  $("#about-me").load("pages/about.html");

}

function camerasLoad() {

  let home = document.getElementById("home");
  let about_me = document.getElementById("about-me");
  let my_cameras = document.getElementById("my-cameras");
  let packet_tracer = document.getElementById("packet-tracer");
  let resourses = document.getElementById("resourses");

  home.style.display = "none";
  about_me.style.display = "none";
  my_cameras.style.display = "block";
  packet_tracer.style.display = "none";
  resourses.style.display = "none";

  $("#my-cameras").load("pages/my_cameras.html");

}

function packettracerLoad() {

  let home = document.getElementById("home");
  let about_me = document.getElementById("about-me");
  let my_cameras = document.getElementById("my-cameras");
  let packet_tracer = document.getElementById("packet-tracer");
  let resourses = document.getElementById("resourses");

  home.style.display = "none";
  about_me.style.display = "none";
  my_cameras.style.display = "none";
  packet_tracer.style.display = "block";
  resourses.style.display = "none";

  $("#packet-tracer").load("pages/packet_tracer.html");

}

function resoursesLoad() {

  let home = document.getElementById("home");
  let about_me = document.getElementById("about-me");
  let my_cameras = document.getElementById("my-cameras");
  let packet_tracer = document.getElementById("packet-tracer");
  let resourses = document.getElementById("resourses");

  home.style.display = "none";
  about_me.style.display = "none";
  my_cameras.style.display = "none";
  packet_tracer.style.display = "none";
  resourses.style.display = "block";

  $("#resourses").load("pages/resourses.html");

}
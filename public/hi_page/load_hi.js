$(document).ready(function() {

    if (!isRealWebKit()) {
    $("#preload").load("/hi_page/preload.html");
    $("#preload").show();
    }

    // alert(isRealWebKit());

});

function isRealWebKit() {
  const ua = navigator.userAgent;
  return (
    /AppleWebKit/i.test(ua) &&
    !/CriOS|FxiOS|Edge|Edg|OPR|Chrome|Vivaldi|SamsungBrowser/i.test(ua) &&
    /Safari/i.test(ua)
  );
}

function load_game() {
    $("#console-bg").load("/hi_page/loading.html");
    $("#console-bg").show()
}

function load_scene() {
    $("#console-bg").load("/hi_page/1_scene.html");
    $("#console-bg").show()
}

function load_scene_2() {
    $("#console-bg").load("/hi_page/2_scene.html");
}

function load_scene_3() {
    $("#console-bg").load("/hi_page/3_scene.html");
}

function load_scene_4() {
    $("#console-bg").load("/hi_page/4_scene.html");
}

function load_scene_5() {
    $("#console-bg").load("/hi_page/5_scene.html");
}

// function load_scene() {
//     $("#console-bg").load("/hi_page/1_scene.html");
//     $("#console-bg").show()
// }
$(document).ready(function() {

});

// function load_and_open_camera(page) {
//     current_p = "home";
//     alert(current_p);
//     window.open("pages/cameras_info.html")
//     let camera = document.getElementById("camera");
    
//     $("#camera").slideUp('normal', function() {
//         $("#camera").load("/pages/cameras/" + page +".html", function() {
//             $("#camera").slideDown('normal');
//         });
//     });
// }

function load_camera_w_animation(page) {
    let camera = document.getElementById("camera");
    
    $("#camera").slideUp('normal', function() {
        $("#camera").load("/pages/cameras/" + page +".html", function() {
            $("#camera").slideDown('normal');
        });
    });
}


// function load_camera_w_animation(page) {
//     let camera = document.getElementById("camera");
    
//     $("#camera").hide('normal', function() {
//         $("#camera").load("/pages/cameras/" + page +".html");
//         $("#camera").show('normal');
//     });
// }


// function fed5Load() {

//     $("#camera").hide('normal', function() {
//         $("#camera").load("/pages/cameras/fed5.html");
//         $("#camera").show("/pages/cameras/fed5.html");
//     });

// }

// function canona630Load() {

//     $("#camera").load("/pages/cameras/canona630.html");

// }

// function prakticam50bfLoad() {

//     $("#camera").load("/pages/cameras/prakticam50bf.html");

// }

// function smenasymbolLoad() {

//     $("#camera").load("/pages/cameras/smenasymbol.html");

// }

// function sonydsct200Load() {

//     $("#camera").load("/pages/cameras/sonydsct200.html");

// }

// function sonyrx100m2Load() {

//     $("#camera").load("/pages/cameras/sonyrx100m2.html");

// }
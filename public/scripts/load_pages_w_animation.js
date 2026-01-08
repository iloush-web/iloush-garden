// $(document).ready(function() {
	
// 	$("#nav li a").removeClass('disable-link')

// 	var hash = window.location.hash.substr(1);
// 	var href = $('#nav li a').each(function(){
// 		var href = $(this).attr('href');
// 		if(hash==href.substr(0,href.length-5)){
// 			var toLoad = hash+'.html #content';
// 			$('#content').load(toLoad)
// 		}											
// 	});

// 	$('#nav li a').click(function(){
						  
// 		var toLoad = $(this).attr('href')+' #content';
// 		$('#content').hide('fast',loadContent);
// 		$('#load').remove();
// 		$('#wrapper').append('<span id="load">LOADING...</span>');
// 		$('#load').fadeIn('normal');
// 		window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
// 		function loadContent() {
// 			$('#content').load(toLoad,'',showNewContent())
// 		}
// 		function showNewContent() {
// 			$('#content').show('normal',hideLoader());
// 		}
// 		function hideLoader() {
// 			$('#load').fadeOut('normal');
// 		}
// 		return false;
		
// 	});

// });

var cur_page = "home";

// $(document).ready(function() {

//     let about_me = document.getElementById("about-me");
//     let my_cameras = document.getElementById("my-cameras");
//     let packet_tracer = document.getElementById("packet-tracer");
       
//     let plants = document.getElementById("plants");
//     let guestbook = document.getElementById("guestbook");

//     let resourses = document.getElementById("resourses");

//     about_me.style.display = "block";
//     my_cameras.style.display = "block";
//     packet_tracer.style.display = "block";

//     plants.style.display = "block";
//     guestbook.style.display = "block";

//     resourses.style.display = "block";

//     $("#about-me").load("pages/about.html");
//     $("#my-cameras").load("pages/my_cameras.html");
//     $("#packet-tracer").load("pages/packet_tracer.html");

//     $("#plants").load("pages/plants.html");
//     $("#guestbook").load("pages/guestbook.html");

//     $("#resourses").load("pages/resourses.html", function() {

//         about_me.style.display = "none";
//         my_cameras.style.display = "none";
//         packet_tracer.style.display = "none";

//         plants.style.display = "none";
//         guestbook.style.display = "none";

//         resourses.style.display = "none";

//     });

// });

function homeLoad() {

    let home = document.getElementById("home");
    let current = document.getElementById(cur_page);

    if (cur_page != "home") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);

                $("#home").slideDown('normal');
                cur_page = "home";

                current.style.display = "none";
                home.style.display = "block";

            });
   
    }

}

function aboutLoad() {

    let about_me = document.getElementById("about-me");
    let current = document.getElementById(cur_page);

    if (cur_page != "about-me") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);

            $("#about-me").load("pages/about.html", function() {
                $("#about-me").slideDown('normal');
                cur_page = "about-me";

                current.style.display = "none";
                about_me.style.display = "block";

            });

        });
        
    }

}

function camerasLoad() {

    let my_cameras = document.getElementById("my-cameras");
    let current = document.getElementById(cur_page);

    if (cur_page != "my-cameras") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);

            $("#my-cameras").load("pages/my_cameras.html", function() {
                $("#my-cameras").slideDown('normal');
                cur_page = "my-cameras";

                current.style.display = "none";
                my_cameras.style.display = "block";

            });

        });
        
    }

}

function packettracerLoad() {


    let packet_tracer = document.getElementById("packet-tracer");
    let current = document.getElementById(cur_page);

    if (cur_page != "packet-tracer") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);

            $("#packet-tracer").load("pages/packet_tracer.html", function() {
                $("#packet-tracer").slideDown('normal');
                cur_page = "packet-tracer";

                current.style.display = "none";
                packet_tracer.style.display = "block";

            });
            
        });
        
    }

}

function resoursesLoad() {

    $("#resourses").load("pages/resourses.html");
    let resourses = document.getElementById("resourses");
    let current = document.getElementById(cur_page);

    if (cur_page != "resourses") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);
            $("#resourses").slideDown('normal');
            cur_page = "resourses";

            current.style.display = "none";
            resourses.style.display = "block";

        });
        
    }

}

// NFIJSNFOSENMFCOSKENMFDCPSEDC

function plantsLoad() {

    $("#plants").load("pages/plants.html");
    let plants = document.getElementById("plants");
    let current = document.getElementById(cur_page);

    if (cur_page != "plants") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);
            $("#plants").slideDown('normal');
            cur_page = "plants";

            current.style.display = "none";
            plants.style.display = "block";

        });
        
    }

}

function guestbookLoad() {

    $("#guestbook").load("pages/guestbook.html");
    let guestbook = document.getElementById("guestbook");
    let current = document.getElementById(cur_page);

    if (cur_page != "guestbook") {

        $('#' + cur_page).slideUp("normal", function() {

            let current = document.getElementById(cur_page);
            $("#guestbook").slideDown('normal');
            cur_page = "guestbook";

            current.style.display = "none";
            guestbook.style.display = "block";

        });
        
    }

}



//   $('#mycamerashref').hide("pages/my_cameras.html");

// function cameraHide() {
//     let cameras = document.getElementById("mycamerashref");

//     $('#mycamerashref').hide();
// }
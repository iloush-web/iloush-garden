// function load_content() {

//     // let window = document.getElementById("item-content");
//     $("#item-content").load("<p>HAHAHAHAHHAHAHAA</p>");

// }

const treasures = [

    {
        name: 'gaspacho',
        img: '',
        text: 'LSLDASLDCALSL',

    },

    {
        name: 'mushroom_soup',
        img: '',
        text: '',
    },
];


function load_content(item) {

    const treasure = treasures.find(i => i.name === item);

    // const img = new Image();
    // img.src = "/images/treasures/geode.png";

    const paste = `
    <img style="width: 300px" src="/images/treasures/geode.png"> <br>
    ${treasure.text}
    
    `

    $("#item-content").slideUp('normal', function () {
        $("#item-content").html(paste);
        $("#item-content").slideDown('normal');
    });

}


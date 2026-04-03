// function load_content() {

//     // let window = document.getElementById("item-content");
//     $("#item-content").load("<p>HAHAHAHAHHAHAHAA</p>");

// }

const treasures = [

    {
        name: 'rings_plate',
        img: '/accessories/rings_on_plate.webp',
        text_h1: 'Plaster incense plate',
        text: '',

    },

    {
        name: 'ring_1',
        img: '/accessories/ring_1.webp',
        text_h1: '',
        text: '',

    },

    {
        name: 'ring_2',
        img: '/accessories/ring_2.webp',
        text_h1: 'Feather ring',
        text: '',

    },

    {
        name: 'ring_3',
        img: '/accessories/ring_3.webp',
        text_h1: 'Hello Kitty ring',
        text: '',

    },

    {
        name: 'ring_4',
        img: '/accessories/ring_4.webp',
        text_h1: 'Mushroom ring',
        text: '',

    },

    {
        name: 'ring_5',
        img: '/accessories/ring_5.webp',
        text_h1: '',
        text: '',
    },

    {
        name: 'two_bracelets',
        img: '/accessories/two_bracelets.webp',
        text_h1: 'Bracelets',
        text: '',
    },

    {
        name: 'mushroom_neck',
        img: '/accessories/mushroom_neck.webp',
        text_h1: 'Mushroom neck',
        text: '',
    },

    {
        name: 'candle_1',
        img: '/candle_1.webp',
        text_h1: 'Candle',
        text: '',
    },

    {
        name: 'dan_heng_keycap',
        img: '/toy/dan_heng_keycap.webp',
        text_h1: 'Dan Heng keycap',
        text: '',
    },

    {
        name: 'silver_wolf_keycap',
        img: '/toy/silver_wolf_keycap.webp',
        text_h1: 'Silver Wolf keycap',
        text: '',
    },

    {
        name: 'scoob',
        img: '/toy/scoob.webp',
        text_h1: 'Scoob',
        text: '',
    },

    {
        name: 'jean_genshin',
        img: '/toy/jean_genshin.webp',
        text_h1: 'Jean genshin',
        text: '',
    },

    {
        name: 'lego_bee',
        img: '/toy/lego_bee.webp',
        text_h1: 'Lego bee',
        text: '',
    },

    {
        name: 'hello_kitty_ninja',
        img: '/toy/hello_kitty_ninja.webp',
        text_h1: 'Hello Kitty ninja',
        text: '',
    },
 
    {
        name: 'animal_crossing_game',
        img: '/toy/animal_crossing_game.webp',
        text_h1: 'Animal crossing',
        text: '',
    },

    {
        name: 'zelda_game',
        img: '/toy/zelda_game.webp',
        text_h1: 'Zelda',
        text: '',
    },


];


function load_content(item) {

    const treasure = treasures.find(i => i.name === item);

    // const img = new Image();
    // img.src = "/images/treasures/geode.webp";

    const paste = `
    <img class="right-img" src="/images/treasures/${treasure.img}"> <br>
    <hr>
    <div style="max-width: 100%">
    <h1>${treasure.text_h1}</h1>
    </div>
    ${treasure.text}
    
    `

    $("#item-content").slideUp('normal', function () {
        $("#item-content").html(paste);
        $("#item-content").slideDown('normal');
    });

}


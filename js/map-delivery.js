// Все метки в Санкт-Петербурге. 
var mapLocation = [59.932427, 30.352354];
var marks = [
    {
        name: 'Большая Конюшенная улица, 19/8',
        location: [59.938570, 30.322856],
        text: '<b>Описание метки 1</b>. Точная стоимость доставки рассчитывается менеджером.'
    },{
        name: 'Шпалерная улица, 50А',
        location: [59.949068, 30.369634],
        text: '<b>Описание метки 2</b>. Платежом взимается комиссия.'
    },{
        name: 'Московский проспект, 94',
        location: [59.901733, 30.319445],
        text: '<b>Описание метки 3</b>. Обращаем ваше внимание, что указанная стоимость примерная и рассчитана для посылки габаритами 30х30х30 весом до 3 кг. Точная стоимость доставки рассчитывается менеджером. При оплате заказа наложенным платежом взимается комиссия.'
    },{
        name: 'Бассейная улица, 6',
        location: [59.865127, 30.309260],
        text: '<b>Описание метки 4</b>. Обращаем ваше внимание, что указанная стоимость примерная и рассчитана для посылки габаритами 30х30х30 весом до 3 кг.'
    }
];




var myMap,
    myMark = new Array(),
    iconMark = 'islands#darkBlueIcon',
    iconMark_Active = 'islands#darkOrangeIcon';

ymaps.ready(init);



function init() {
    
    mapList.init();

    myMap = new ymaps.Map('map-delivery', {
            center: mapLocation, // Координаты города. 
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl']
        },{
            searchControlProvider: 'yandex#search'
    });
    
    for (var i=0, l=marks.length; i<l; i++) {
        
        addMarks(marks[i], i);
    }
    
    function addMarks(mark, ind) {
        
        myMark[ind] = new ymaps.Placemark(mark.location, {
            
            balloonContentHeader: '<span class="mark-header">' + mark.name + '</span>',
            balloonContentBody: '<span class="mark-body">' + mark.text + '</span>',
            hintContent: '<span class="mark-title">' + mark.name + '</span>'
        },{
            // iconLayout: 'default#image',
            // iconImageHref: 'images/float.png',
            // iconImageSize: [50, 96],
            // iconImageOffset: [-50, -96]
            
            preset: iconMark,
            zIndex: 1
        });
        
        myMark[ind].index = ind;
        myMap.geoObjects.add(myMark[ind]);
        
        myMark[ind].events.add('click', function (e) {

            cleaningMark();
            e.get('target').options.set('preset', iconMark_Active);
            myMap.panTo(mark.location);
           
            mapList.mark(e.get('target').index); 
        });
    
    }
    
    myMap.events.add('balloonopen', function (e) {

        var balloon = e.get('balloon');

        myMap.events.add('click', function (e) {

            // Если клик был на карте, а не на геообъекте
            if(e.get('target') === myMap) { 

                myMap.balloon.close();
            }
        });
    });
    
}

function cleaningMark() {
        
    for (var i=0; i<myMark.length; i++) {

        myMark[i].options.set('preset', iconMark);
        myMark[i].options.set('zIndex', 0);
    }
}




/* mapList --------------------------*/
var mapList = {
    active: 'active',
    cont: '.mapDelivery .filterCont',
    button: '.mapDelivery .filterCont__title',
    title: '.filterCont__title',
    ind: null,
    number: 0
};

mapList.init = function() {
    
    this.events();
};

mapList.events = function() {
     
    $('body').on('click', this.button, function(event){

        myMap.balloon.close();
        
        if($(this).hasClass(mapList.active)){
            
           // mapList.ind = $(this).parent().index() - mapList.number;
            mapList.ind = $(this).parent().index();
             
            cleaningMark();
            myMark[mapList.ind].options.set('preset', iconMark_Active);
            myMark[mapList.ind].options.set('zIndex', 1);
            myMap.panTo(marks[mapList.ind].location);
           
        }else{
            cleaningMark();
        } 
    });
};

mapList.mark = function(ind) {
    
    var th = $(this.cont).eq(ind).find(this.title),
        y = ($(this.cont).eq(ind).offset().top + $(this.cont).eq(ind).height()) - $(window).scrollTop(),
        h = adaptation.height,
        top = $(this.cont).eq(ind).offset().top;
    
    
    if(!th.hasClass(filter.active)) {
        filter.openBox(th);
    }
    
    if(y >= 0 && y <= h){
        
        //console.log( y );
    }else{
        
        $('body,html').animate({scrollTop: top}, 800, function(){
  
        });
    }

};



						   
				   
						   
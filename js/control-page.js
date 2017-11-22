$(document).ready(function(){ /* ... */ });
$(window).load(function(){
    
    menu.events();
    counter.events();
    bandSlider.events();
    presentSlider.events();
    delivery.events();
    cabinet.events();
    comparison.events();
    order.events();
    text.events();
    filter.events();
    filterButt.init();
    interval.events();
    popUp.events();
    adaptation.events();
    search.events(); 
    payment.events();
    
    catalog.events();
    mapBox.init();
    
     
    try {
        $('.fancybox').fancybox();
    }catch(error){
        //console.log(error);
    }
     
});





/* mapBox ---------------------------*/
var mapBox = {
    addMapFix: 'fix',
    addFix: 'delivery-mapBox--fix',
    // addAbs: 'delivery-mapBox--absolute',
    box: '.delivery-mapBox',
    cont: '.delivery-mapCont',
    map: '#map-delivery',
    contMap: '.mapDelivery__cont--map',
    h: null,
    x: null
};

mapBox.init = function() {
    this.events();
};

mapBox.events = function() {
        
    this.res();
    this.fix();
    
    $(window).resize(function(){
        mapBox.res();
        mapBox.fix();
    });
    
    $(window).bind('scroll',function(){
        mapBox.fix();
    });
};

mapBox.res = function() {
    $(this.cont).prepend($(this.map));
    this.h = $(this.cont).height();
    this.x = $(this.contMap).width();
};

mapBox.fix = function() {
    
    if(($(this.contMap).height() - 3) < this.h) return;
        
    var y = $(this.contMap).offset().top,
        h = $(this.contMap).height();  
    
    if($(window).scrollTop() > y) {
        
        if($(window).scrollTop() < (h + y) - this.h) {
            
            $(this.box).addClass(this.addFix);
            $(this.contMap).removeClass(this.addMapFix);
        }else{
            
            $(this.box).removeClass(this.addFix);
            $(this.contMap).addClass(this.addMapFix);
        }
    }else{
        
        $(this.box).removeClass(this.addFix);
    }  
};





/* catalog --------------------------*/
var catalog = {
    cont: '.content.content--catalog',
    contFilter: '.filter__cont',
    contCatalog: '.catalog-global.active',
    hFilter: null
};

catalog.events = function(){
    
    if(!$(catalog.cont).length) return;
    
    this.height();
};

catalog.height = function(){
    
    catalog.hFilter = $(catalog.contFilter).height();   
    $(catalog.contCatalog).css('min-height', this.hFilter);
};





/* popUp ----------------------------*/
var popUp = {
    active: 'active',
    cont: '.popUp',
    box: '.popUp-window',
    buttClose: '.popUp-continue-butt',
    requestCall: '.butt-requestCall',
    addCart: '.product-butt-cart',
    tim: 300
};

popUp.events = function(){

    popUp.count();
    popUp.resize();
    

    $('body').on('click', function(event){
    
        if($(event.target).closest(popUp.box).length){
            return;
        }
        
        if($(event.target).closest(popUp.requestCall).length){
            return;
        }
        
        popUp.close($(popUp.cont), popUp.tim);
    });
    
    
    
    $('body').on('click', popUp.buttClose, function(event){
        
        popUp.close($(this).parents(popUp.cont), popUp.tim);
    });
    

    
    $('body').on('click', popUp.requestCall, function(event){

        popUp.open($('.popUp--backCall'), popUp.tim);
    });
     
     
    $('body').on('click', popUp.addCart, function(event){

        popUp.open($('.item__add__popup'), popUp.tim);
    });
     
};

popUp.count = function(){
    
    if($(this.cont).length){
        
        for(var i=0; i<$(this.cont).length; i++){
             
            if($(this.cont).eq(i).hasClass(this.active)){
                
                popUp.open($(this.cont).eq(i), 0);
            } 
        } 
    }
};

popUp.resize = function(th){
    
    if($(this.cont).length){
        
        for(var i=0; i<$(this.cont).length; i++){
             
            var h = $(this.cont).eq(i).find(this.box).outerHeight(); 
            $(this.cont).eq(i).find(this.box).css('marginTop', -(h / 2));
        } 
    }  
};

popUp.open = function(th, t){
    th.fadeIn(t);
    popUp.resize();
};

popUp.close = function(th, t){
    th.fadeOut(t);
};





/* interval -------------------------*/
var interval = {
    box: '.flSlider-box',
    from: '.flSlider-from',
    before: '.flSlider-before',
     
    load: {
        cont: '.flSlider-load'
    },
    
    weight: {
        cont: '.flSlider-weight'
    },
    
    price: {
        cont: '.flSlider-price'
    }
};

interval.events = function(){
     
    if(!$(interval.box).length) return;

    
    
    /* load -----------------------------------------------------------------*/
    $(interval.load.cont + ' ' + interval.box).slider({
        animate:true,
        range: true,
        min: 0,
        max: 200,
        values: [ 50, 150 ],
        slide: function( event, ui ) {
            $(interval.load.cont + ' ' + interval.from).val( ui.values[ 0 ] / 10 );
            $(interval.load.cont + ' ' + interval.before).val( ui.values[ 1 ] / 10 ); 
        },
        change: function( event, ui ) {
            filter.move($(this));   
            // event .flSlider
        }
    });
    //$(interval.load.cont + ' ' + interval.from).val( $(interval.load.cont + ' ' + interval.box).slider( "values", 0 ) / 10 );
    //$(interval.load.cont + ' ' + interval.before).val( $(interval.load.cont + ' ' + interval.box).slider( "values", 1 ) / 10 );

    
    $('body').on('keyup', interval.load.cont + ' ' + interval.from, function(event){
        var a = $(this).val() * 10;
        var b = $(interval.load.cont + ' ' + interval.before).val() * 10;
        
        if(a < b){
            $(interval.load.cont + ' ' + interval.box).slider({values: [a, b]});
        }
    });

    $('body').on('keyup', interval.load.cont + ' ' + interval.before, function(event){
        var a = $(this).val() * 10;
        var b = $(interval.load.cont + ' ' + interval.from).val() * 10;

        if(a > b){
            $(interval.load.cont + ' ' + interval.box).slider({values: [b, a]});
        }
    });
    
    
    
    /* weight ---------------------------------------------------------------*/
    $(interval.weight.cont + ' ' + interval.box).slider({
        animate:true,
        range: true,
        min: 100,
        max: 1500,
        values: [ 500, 1000 ],
        slide: function( event, ui ) {
            $(interval.weight.cont + ' ' + interval.from).val( ui.values[ 0 ] );
            $(interval.weight.cont + ' ' + interval.before).val( ui.values[ 1 ] );       
        },
        change: function( event, ui ) {
            filter.move($(this));   
            // event .flSlider
        }
    });
    //$(interval.weight.cont + ' ' + interval.from).val($(interval.weight.cont + ' ' + interval.box).slider( "values", 0 ) );
    //$(interval.weight.cont + ' ' + interval.before).val($(interval.weight.cont + ' ' + interval.box).slider( "values", 1 ) ); 
    
    
    $('body').on('keyup', interval.weight.cont + ' ' + interval.from, function(event){
        var a = parseInt($(this).val(), 10);
        var b = parseInt($(interval.weight.cont + ' ' + interval.before).val(), 10);

        if(a < b){
            $(interval.weight.cont + ' ' + interval.box).slider({values: [a, b]});
        }
    });

    $('body').on('keyup', interval.weight.cont + ' ' + interval.before, function(event){
        var a = parseInt($(this).val(), 10);
        var b = parseInt($(interval.weight.cont + ' ' + interval.from).val(), 10);

        if(a > b){
            $(interval.weight.cont + ' ' + interval.box).slider({values: [b, a]});
        }
    });
    
    
    
    /* price ----------------------------------------------------------------*/
    $(interval.price.cont + ' ' + interval.box).slider({
        animate:true,
        range: true,
        min: 0,
        max: 100000,
        values: [ 20000, 80000 ],
        slide: function( event, ui ) {
            $(interval.price.cont + ' ' + interval.from).val( ui.values[ 0 ] );
            $(interval.price.cont + ' ' + interval.before).val( ui.values[ 1 ] );       
        },
        change: function( event, ui ) {
            filter.move($(this));  
            // event .flSlider
        }
    });
    //$(interval.price.cont + ' ' + interval.from).val($(interval.price.cont + ' ' + interval.box).slider( "values", 0 ) );
    //$(interval.price.cont + ' ' + interval.before).val($(interval.price.cont + ' ' + interval.box).slider( "values", 1 ) );

    
    $('body').on('keyup', interval.price.cont + ' ' + interval.from, function(event){
        var a = parseInt($(this).val(), 10);
        var b = parseInt($(interval.price.cont + ' ' + interval.before).val(), 10);

        if(a < b){
            $(interval.price.cont + ' ' + interval.box).slider({values: [a, b]});
        }
    });

    $('body').on('keyup', interval.price.cont + ' ' + interval.before, function(event){
        var a = parseInt($(this).val(), 10);
        var b = parseInt($(interval.price.cont + ' ' + interval.from).val(), 10);

        if(a > b){
            $(interval.price.cont + ' ' + interval.box).slider({values: [b, a]});
        }
    });
    
    
    
    
    interval.events_input(interval.load.cont + ' ' + interval.from, interval.load.cont + ' ' + interval.before, 0, 20);
    interval.events_input(interval.weight.cont + ' ' + interval.from, interval.weight.cont + ' ' + interval.before, 100, 1500);
    interval.events_input(interval.price.cont + ' ' + interval.from, interval.price.cont + ' ' + interval.before, 0, 100000);

};

interval.events_input = function(obgFrom, obgBefore, from, before){
    
    $('body').on('keydown', obgFrom, function(event){
        
        if($(obgBefore).val() == ''){
            $(obgBefore).val(before);
        }
    }); 
    
    $('body').on('keydown', obgBefore, function(event){

        if($(obgFrom).val() == ''){
            $(obgFrom).val(from);
        }
    }); 
};





/* filterButt -----------------------*/
var filterButt = {
    active: 'active',
    bl: '.filter-block',
    button: '.filter-block__button',
    buttonAll: '.filter-block__button-all',
    size: 20
};

filterButt.init = function(){
     
    for(var i=0; i < $(filterButt.button).length; i++){
        
        if(i >= filterButt.size){
            
            $(filterButt.button).eq(i).css('display', 'none');
        }
    }
    
    if(filterButt.size < $(filterButt.button).length){
        
        $(filterButt.buttonAll).css('display', 'inline-block');
    }
    
    this.events();
};

filterButt.events = function(){
     
    $('body').on('click', this.button, function(event){

        if($(this).hasClass(filterButt.active)){
            
            $(this).removeClass(filterButt.active);
        }else{
            
            $(this).parents(filterButt.bl).find(filterButt.button).removeClass(filterButt.active);
            $(this).addClass(filterButt.active);
        } 
    });
    
    $('body').on('click', this.buttonAll, function(event){

        $(filterButt.button).removeAttr('style');
        $(filterButt.buttonAll).css('display', 'none');
    });
};





/* filter ---------------------------*/
var filter = {
    active: 'active',
    cont: '.catalog-global',
    butt: '.filter-butt',
    box: '.filter',
    tim: 300,
    
    boxBlock: '.filterCont',
    boxButt: '.filterCont__title',
    boxCont: '.filterCont__box',
    boxTim: 300,
    
    popUp: '.filter-popUp',
    popUp_tim: 150,
    
    contCatalog: '.content--catalog'
};

filter.move = function(th){
    
    $(filter.popUp).removeClass(filter.active);
    $(filter.popUp).fadeOut(0);

    th.parents('.flSlider').find('.flSlider-contBox').append($(filter.popUp));
    th.parents('.flSlider').find(filter.popUp).addClass(filter.active);
    th.parents('.flSlider').find(filter.popUp).fadeIn(0);
};

filter.events = function(){
    
    filter.catalog();
    
    
    $('body').on('mousedown', function(event){
    
        if($(event.target).closest('.filterCont-list li, .flSlider').length){
            return;
        }

        $(filter.popUp).removeClass(filter.active);
        $(filter.popUp).fadeOut(filter.popUp_tim);
    });
    

    $('body').on('click', '.createCheckBox', function(event){
        
        if($(this).hasClass('createCheckBox-checked')){
            
            $(filter.popUp).removeClass(filter.active);
            $(filter.popUp).fadeOut(0);

            $(this).parents('li').append($(filter.popUp));
            $(this).parents('li').find(filter.popUp).addClass(filter.active);
            $(this).parents('li').find(filter.popUp).fadeIn(filter.popUp_tim);
            
        }else{
            
            $(this).parents('li').find(filter.popUp).removeClass(filter.active);
            $(filter.popUp).fadeOut(filter.popUp_tim);
        }
    }); 
    
     
    
    $('body').on('click', filter.butt, function(event){

        if($(this).hasClass(filter.active)){
            
            $(catalog.contCatalog).css('min-height', 'inherit');
            
            $(this).removeClass(filter.active);
            $(this).text('Показать фильтр');
            $(filter.cont).removeClass(filter.active);
             
            $(filter.box).removeClass(filter.active);
            $(filter.box).fadeOut(filter.tim);
            

        }else{
            
            $(this).addClass(filter.active);
            $(this).text('Спрятать фильтр');
            $(filter.cont).addClass(filter.active);
             
            $(filter.box).addClass(filter.active);
            $(filter.box).fadeIn(filter.tim);
            
            catalog.events();
        }  
        
    });
     
    
    $('body').on('click', filter.boxButt, function(event){
        
        if($(this).hasClass(filter.active)){
            
            filter.closeBox($(this));
            
        }else{
            
            filter.openBox($(this));
        }
        
    });
        
    // $(filter.butt).click();
};

filter.openBox = function(th){
    // Для эффекта аккордеона на странице "delivery-map.html"
    if($('.mapDelivery').length != 0){
        $(filter.boxButt).removeClass(filter.active);
        $(filter.boxCont).removeClass(filter.active);
        $(filter.boxCont).slideUp(filter.boxTim);
    }

    th.addClass(filter.active);
    th.parents(filter.boxBlock).find(filter.boxCont).addClass(filter.active);
    th.parents(filter.boxBlock).find(filter.boxCont).slideDown(filter.boxTim, function(){
        catalog.events();
    });
};

filter.closeBox = function(th){
    th.removeClass(filter.active);
    th.parents(filter.boxBlock).find(filter.boxCont).removeClass(filter.active);
    th.parents(filter.boxBlock).find(filter.boxCont).slideUp(filter.boxTim, function(){
        catalog.events();
    });
};

filter.catalog = function(){
    /*
    if($(this.contCatalog).length){

        var filt_h = $('.filter__cont').height();
        console.log( filt_h );
    }
    */
};





/* text -----------------------------*/
var text = {
    active: 'active',
    cont: '.hideText-box',
    butt: '.description-butt',
    
    contRecall: '.hideRecall-box',
    buttRecall: '.descriptionRecall-butt',
    recall: '.hideRecall-box .recall',
    recall_H: 0,
    recall_size: 0,
    recall_ind: 0,
    recallSize: 2,
    
    tim: 250
};

text.events = function(){
    
    //text.recheck();
    /*
    $('body').on('click', text.buttRecall + ' span', function(event){
        
        text.recheck();
        text.moreRecall();
    });
    */
    
    
    $('body').on('click', text.butt + ' span', function(event){
      
        if($(this).parent().hasClass(text.active)){
            
            $(this).parents(text.butt).parent().find(text.cont).slideUp(text.tim);
            $(this).parent().removeClass(text.active);
        }else{
            
            $(this).parents(text.butt).parent().find(text.cont).slideDown(text.tim);
            $(this).parent().addClass(text.active);
        }
    });
    
};

/*
text.recheck = function(){
    
    this.recall_size = $(this.recall).size();
    
    
    if(this.recall_size >= this.recallSize){
        
        $(this.buttRecall + ' b').text(this.recallSize);
        text.heightBox(this.recallSize);
        
    }else{
        
        $(this.buttRecall + ' b').text(this.recall_size);
        text.heightBox(this.recall_size);
    }
};

text.heightBox = function(siz){
    
    text.recall_H = 0;
    
    for(var i=0; i<siz + text.recall_ind; i++){

        text.recall_H += $(text.recall).eq(i).outerHeight();
    }
    
    text.recall_ind = text.recallSize;
    
}

text.moreRecall = function(){
    
    // text.recall_H = 0;
  
    console.log( this.recall_H );

    $(text.contRecall).animate(
        {
            height: text.recall_H

        }, 
        text.tim
    );



    //alert(recall_H);
};
    
*/





/* order ----------------------------*/
var order = {
    active: 'active',
    type: {
        butt: '.orderBox',
        box: '.orderType-cont'
    },
    delivery: {
        cont: '.orderWrapper__cont',
        moskow: '.orderWrapper__cont--moskow',
        all: '.orderWrapper__cont--all'
    }     
};

order.events = function(){
    
    $('body').on('click', order.type.butt, function(event){
      
        $(order.type.butt).removeClass(order.active);
        $(this).addClass(order.active);
        
        var ind = $(this).parent().index();
        $(order.type.box).removeClass(order.active);
        $(order.type.box).eq(ind).addClass(order.active);
        
    });
};

order.deliveryChoice = function(key){
     
    if(key == 'moskow'){
        
        $(this.delivery.cont).removeClass(this.active);
        $(this.delivery.moskow).addClass(this.active);
    }
    if(key == 'all'){
        
        $(this.delivery.cont).removeClass(this.active);
        $(this.delivery.all).addClass(this.active);
    }
};





/* comparison -----------------------*/
var comparison = {
    active: 'active',
    cont: '.comparison-block',
    infoBox: '.comparison-info',
    butt: '.show-characteristics', 
    contBox: '.comparison-cont',
    box: '.comparison',
    closeButt: '.comparison__close',
    tim: 500
};

comparison.events = function(){
     
    $('body').on('click', comparison.butt, function(event){

        if($(this).find('input').attr('checked')){
            
            $(comparison.cont).addClass(comparison.active);
        }else{

            $(comparison.cont).removeClass(comparison.active);
        }
    });
    
    $('body').on('click', comparison.closeButt, function(event){
      
        if(comparison.numberChecks($(this))){
            $(this).parents(comparison.box).remove();
        }
    });
          
};

comparison.numberChecks = function(th){
    
    var size = th.parents(comparison.contBox).find(comparison.box).length;
    
    if(size > 1) return true;
    else return false;
};





/* cabinet --------------------------*/
var cabinet = {
    active: 'active',
    buttCont: '.cabinet-list',
    butt: '.cabinet-list li b',
    cont: '.cabinet__data',
    box: '.cabinetData-cont',
    tim: 150
};

cabinet.events = function(){
     
    var ind = 0;
    
    $('body').on('click', cabinet.butt, function(event){

        $(this).parents(cabinet.buttCont).find('li').removeClass(cabinet.active);
        $(this).parents('li').addClass(cabinet.active);
        
        ind = $(this).parents('li').index();
        
        // $(cabinet.box).removeAttr('style');
        // $(cabinet.box).removeClass(cabinet.active);
        // $(cabinet.box).eq(ind).addClass(cabinet.active).fadeOut(0).fadeIn(cabinet.tim);
        
        $(cabinet.box).removeClass(cabinet.active);
        $(cabinet.box).eq(ind).addClass(cabinet.active);

    });
     
     
    if(!$('.cabinetTable--order tbody tr').length){
         
        $('.cabinetTable--order').css('display','none');
        $('.order-info-no').css('display','block');
    }
    
    if(!$('.cabinetTable--wish tbody tr').length){
         
        $('.cabinetTable--wish').css('display','none');
        $('.wish-info-no').css('display','block');
    }
    
    if(!$('.cabinetTable--products tbody tr').length){
         
        $('.cabinetTable--products').css('display','none');
        $('.products-info-no').css('display','block');
    }

    if(!$('.cabinetData-cont .recall').length){
        
        $('.recall-info-no').css('display','block');
    }
     
};





/* delivery -------------------------*/
var delivery = {
    active: 'active',
    
    block: '.delivery',
    box: '.delivery__cont-box',
    courier: '.delivery--courier',
    result: '.delivery-result',
    
    button: {
        block: '.delivery__butt',
        box: '.deliveryBox',
        cont: '.deliveryBox span'
    },
    cities: {
        cont: '.delivery-cities',
        butt: '.delivery-cities > li > span',
        tim: 200
    }
};

delivery.events = function(){
       
    if($(delivery.result).length){
            
        if($(delivery.courier).hasClass(delivery.active)){

            $(delivery.result).css('display','block');
        }          
    }
    
     
    $('body').on('click', delivery.button.cont, function(event){
         
        $(this).parents(delivery.button.block).find(delivery.button.box).removeClass(delivery.active);
        $(this).parent().addClass(delivery.active);
        
        var ind = $(this).parent().index();

        $(this).parents(delivery.block).find(delivery.box).removeClass(delivery.active);
        $(this).parents(delivery.block).find(delivery.box).eq(ind).addClass(delivery.active);  
         
        
        if($(delivery.result).length){
            
            if($(delivery.courier).hasClass(delivery.active)){
                
                $(delivery.result).css('display','block');
            }else{
                $(delivery.result).css('display','none');
            }            
        }
         
    });
    
     
    $('body').on('click', delivery.cities.butt, function(event){

        if($(this).hasClass(delivery.active)){

            $(this).parents('li').find('ul').slideUp(delivery.cities.tim);
            $(this).removeClass(delivery.active);
        }else {

            // $(delivery.cities.cont + ' ul').slideUp(delivery.cities.tim);
            // $(delivery.cities.butt).removeClass(delivery.active);

            $(this).parents('li').find('ul').slideDown(delivery.cities.tim);
            $(this).addClass(delivery.active);
        }
    });
     
};





/* presentSlider --------------------*/
var presentSlider = {
    cont: '.slider-present-cont'
};

presentSlider.events = function(){
    
    $(this.cont).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: adaptation.width.x_1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: adaptation.width.x_768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: adaptation.width.x_500,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
     
    $(this.cont).css('opacity','1');
    
};





/* bandSlider -----------------------*/
var bandSlider = {
    cont: '.band-slider'
};

bandSlider.events = function(){
    
    $(this.cont).slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: adaptation.width.x_1400,
                settings: {
                    slidesToShow: 8
                }
            },
            {
                breakpoint: adaptation.width.x_1180,
                settings: {
                    slidesToShow: 7
                }
            },
            {
                breakpoint: adaptation.width.x_1100,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: adaptation.width.x_1024,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: adaptation.width.x_768,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: adaptation.width.x_500,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
     
    $(this.cont).css('opacity','1');
    
};





/* search ---------------------------*/
var search = {
     
};

search.events = function(){ 

};

search.pull = function(){
    
    $('.header .container').prepend($('.logo'));
      
    $('.header .container').append($('.menuHome'));
    $('.header .container').append($('.user'));
    $('.header .container').append($('.cart'));
    
    $('.menu .container').prepend($('.search'));
     
};

search.insert = function(){
     
    $('.menuBox__cont:nth-child(1)').prepend($('.menuHome'));
     
    $('.menuBox__cont:nth-child(2)').prepend($('.logo'));
     
    $('.menuBox__cont:nth-child(3)').append($('.search'));
     
    $('.menuBox__cont:nth-child(4)').append($('.cart'));
    $('.menuBox__cont:nth-child(5)').append($('.user'));
};





/* menu -----------------------------*/
var menu = {
    /*
    cont: '.menu-js',
    title: '.menu-js__title',
    box: '.menu-js__cont',
    */
    
    cont: '.menuHome, .cart, .user, .search, .menuUpper > ul > li, .textlink-menu',
    title: '.menuHome__title, .cart__title, .user__title, .menuUpper > ul > li > span',
    box: '.menuHome__cont, .cart__cont, .user__cont, .search__cont, .menuUpper-cont',
    
    boxContent: '.menuUpper-boxContent',
    switchingButt: '.menuUpper-left--switching li a, .menuUpper-left--switching li span',
    switchingCont: '.menuUpper-cont',
    
    scroll: '.cart-scroll',
    active: 'active',
    tim: 250
};

menu.events = function(){
     
    if(!$('.cart-box').length){
        
        $('.cart-scroll').css('display','none');
        $('.cart-info').css('display','none');
        $('.cart-empty').css('display','block');
    }
    
    /*
    if($('.cart__title b').text() != 0){
        $('.cart__title b').css('opacity', 1);
    }
    */
     
    $('body').on('click', function(event){
        
        if($(event.target).closest(menu.cont).length){
            return;
        }
        menu.closeAll();
    });
    
    $('body').on('click', menu.title, function(event){

        if($(this).hasClass(menu.active)){
            menu.close($(this));
        }else{
            menu.open($(this));
        } 
    });
    
    $('body').on('click', '.cart__title', function(event){
          
        menu.paneScroll();
    });
    
    $('body').on('click', menu.switchingButt, function(event){

        var ind = $(this).parent().index();
        
        $(this).parents('ul').find('li').removeClass(menu.active);
        $(this).parent().addClass(menu.active);
         
        $(this).parents(menu.switchingCont).find(menu.boxContent).removeClass(menu.active);
        $(this).parents(menu.switchingCont).find(menu.boxContent).eq(ind).addClass(menu.active);
    });
     
     
    $('body').on('click', '.textlink-menu', function(event){

        $('.menuUpper > ul > li').eq(0).find('span').click(); 
    });
    
};

menu.paneScroll = function(){
     
    $(menu.scroll).jScrollPane({
        autoReinitialise: true
    }); 
};

menu.open = function(th){
    menu.closeAll(); 
    th.addClass(menu.active);
    th.parents(menu.cont).find(menu.box).stop(true);
    th.parents(menu.cont).find(menu.box).slideDown(menu.tim);
};

menu.close = function(th){
    th.removeClass(menu.active);
    th.parents(menu.cont).find(menu.box).slideUp(menu.tim);
};

menu.closeAll = function(){
    $(menu.title).removeClass(menu.active);
    $(menu.box).stop(true);
    $(menu.box).slideUp(menu.tim);
};






/* counter --------------------------*/
var counter = {
    cont: '.counter',
    text: '.counter__text',
    more: '.counter__more',
    less: '.counter__less',
    unit: ' шт.'
};

counter.events = function() {
    
    var str;
    
    $(counter.text).bind("change keyup input click", function() {
        if(this.value.match(/[^0-9]/g)){
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
    
    $(counter.more).on({  
        click: function(){ 

            str = $(this).parents(counter.cont).find(counter.text).val();
            if(str == ''){
                str = '1';
            }
            
            str = parseInt(str.replace(/\D+/g,""));

            if($(this).parents(counter.cont).hasClass('counter--unit')){ 
                
                $(this).parents(counter.cont).find(counter.text).val(++str + counter.unit);
            }else{
             
                $(this).parents(counter.cont).find(counter.text).val(++str);
            }
             
        }
    });
    
    $(counter.less).on({  
        click: function(){ 
            
            str = $(this).parents(counter.cont).find(counter.text).val(); 
            if(str == ''){
                str = '0';
            }
            
            str = parseInt(str.replace(/\D+/g,""));
            
            if(str > 1){
                
                if($(this).parents(counter.cont).hasClass('counter--unit')){ 
                    
                    $(this).parents(counter.cont).find(counter.text).val(--str + counter.unit);
                }else{
                    
                    $(this).parents(counter.cont).find(counter.text).val(--str);
                }
            }
            
        }
    });
    
};





/* adaptation -----------------------*/
var adaptation = {
    width: {
        x_1400: 1400,
        x_1180: 1180, 
        x_1100: 1100, 
        x_1024: 1024,
        x_768: 768,
        x_500: 500
    },
    page: 0,
    height: null
};

adaptation.events = function() {
     
    adaptation.res();
    adaptation.act();
    
    $(window).resize(function(){
        adaptation.res();
        adaptation.act();
        popUp.resize();
    });
};

adaptation.res = function(){ 
    this.page = window.innerWidth;
    this.height = window.innerHeight;
};

adaptation.act = function(){ 
      
    /*
    if($('.cart__title.active').length){
        $('.cart-scroll.jspScrollable .jspContainer').width(this.page);
    }
    */
     
    if(this.page <= this.width.x_1180){
          
        adaptation.menu();
        search.pull();
    }else{
         
        search.insert();    
    } 
    
    
    if(this.page <= this.width.x_1100){
        
        $(mapBox.box).removeClass(mapBox.addFix);
        $(mapBox.contMap).removeClass(mapBox.addMapFix);
    }else{

    }
     
    
    if(this.page < this.width.x_1024){
        
         $('.filter').before($('.page'));
         
         if($(filter.butt).hasClass(filter.active)){
              
              $(filter.butt).click();
         }
         
         $(catalog.contCatalog).css('min-height', 'inherit');
         $('.mapDelivery__cont--text').prepend($('#map-delivery'));
        
         try { 
             mapList.number = 2;
         }catch (error) { 
             //console.log(error);
         } 

    }else{
         
         $('.page-cont').append($('.page'));  
         $('.mapDelivery__cont--map').prepend($('#map-delivery'));
        
         try { 
             mapList.number = 1;
         }catch (error) { 
             //console.log(error);
         } 
    }
     

    if(this.page < this.width.x_768){
           
        $('.paymentCard-box:nth-child(2)').append($('.paymentCard-cvv'));
        $('.cart__title').append($('.cart__title span b'));
         
        if(!$('.page .sorting').length){
            
            $('.page').css('display', 'none');
        } 
        
    }else{
         
        $('.paymentCard__cont').append($('.paymentCard-cvv'));
        $('.cart__title span').append($('.cart__title b'));
     
        if(!$('.page .sorting').length){
            
            $('.page').css('display', 'inline-block');
        } 
        
    } 

};

adaptation.menu = function(){ 
    
};





/* payment --------------------------*/
var payment = {
    active: 'active',
    
    bl: '.payment',
    cont: '.payment__butt',
    block: '.paymentBox',
    button: '.paymentBox span',
    
    box: '.paymentCard__box'
};

payment.events = function(){
     
    $('body').on('click', this.button, function(event){
    
        var ind = $(this).parent().index();
        
        $(this).parents(payment.cont).find(payment.block).removeClass(payment.active);
        $(this).parents(payment.block).addClass(payment.active);
       
        $(this).parents(payment.bl).find(payment.box).removeClass(payment.active);
        $(this).parents(payment.bl).find(payment.box).eq(ind).addClass(payment.active); 
    });
};







						   
				   
						   
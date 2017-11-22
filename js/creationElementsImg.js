/**********************************************************************************************
************************************** creation elements img **********************************
***********************************************************************************************/				 

//$(window).load(function(){
//    elements.init();
//});

$(document).ready(function(){
    elements.init();
});
   			
var elements = {
    active: 'active',
    checkbox: 'createCheckBox',
    radio: 'createRadio',
    
    input_checkbox: 'input:checkbox',
    input_radio: 'input:radio',
    
    class_checkbox: 'createCheckBox',
    class_checkbox_active: 'createCheckBox-checked',
    
    class_radio: 'createRadio',
    class_radio_active: 'createRadio-checked'
};
	
elements.init = function() {
    
    for(var i=0; i<$(this.input_checkbox).size(); i++)	
    this.checkboxAdd($(this.input_checkbox), this.class_checkbox, i);
    
    for(var i=0; i<$(this.input_radio).size(); i++)
    this.radioAdd($(this.input_radio), this.class_radio, i);
    
    this.events();
};

elements.checkboxAdd = function(obj, className, i) {

    $(obj).eq(i).css('visibility', 'hidden');
    $(obj).eq(i).css('position', 'absolute');

    $('<div class="' + className + '"></div>').insertBefore($(obj).eq(i));

    if($(obj).eq(i).attr('checked')){
        $('.' + className).eq(i).addClass(this.class_checkbox_active);
        $('.' + className).eq(i).parent().find('label').addClass(this.active);
    }
};

elements.radioAdd = function(obj, className, i) {
    
    $(obj).eq(i).css('visibility', 'hidden');
    $(obj).eq(i).css('position', 'absolute');

    $('<div class="' + className + '"></div>').insertBefore($(obj).eq(i));

    if($(obj).eq(i).attr('checked')){
        $('.' + className).eq(i).addClass(this.class_radio_active);
    }
};

elements.label = function(th) {
    
    th.parent().find('.' + this.radio).click();
    th.parent().find('.' + this.checkbox).click();

    if(th.parent().find('.' + this.radio).hasClass(this.class_radio_active)){
       th.parent().find(this.input_radio).attr('checked', 'checked');
    }else{
       th.parent().find(this.input_radio).removeAttr('checked');
    } 

    if(th.parent().find('.' + this.checkbox).hasClass(this.class_checkbox_active)){
       th.parent().find(this.input_checkbox).attr('checked', 'checked');
    }else{
       th.parent().find(this.input_checkbox).removeAttr('checked');
    } 
};

elements.events = function() {
    
    $('body').on('click', '.' + this.checkbox, function(event){
			
        var ts = $(this);

        if(ts.hasClass(elements.class_checkbox_active)){

            ts.removeClass(elements.class_checkbox_active);
            ts.parent().find(elements.input_checkbox).removeAttr('checked');
            ts.parent().find('label').removeClass(elements.active);
        }else{

            ts.addClass(elements.class_checkbox_active);
            ts.parent().find(elements.input_checkbox).attr('checked', 'checked');
            ts.parent().find('label').addClass(elements.active);
        }
    });
    
    
    $('body').on('click', '.' + this.radio, function(event){

        var ts = $(this), 
            class_name = ts.parent().find(elements.input_radio).attr('class');

        $(elements.input_radio + '.' + class_name).parent().find('.' + elements.radio).removeClass(elements.class_radio_active);
        $(elements.input_radio + '.' + class_name).removeAttr('checked');

        ts.parent().find('.' + elements.radio).removeClass(elements.class_radio_active);
        ts.parent().find(elements.input_radio).removeAttr('checked');

        ts.addClass(elements.class_radio_active);
        ts.parent().find(elements.input_radio).attr('checked', 'checked');

        $(elements.input_radio + '.' + class_name).parents('.' + elements.checkbox).removeClass(elements.active);
        ts.parents('.' + elements.checkbox).addClass(elements.active);
    });
    
    
    $('body').on('click', 'label > span', function(event){
               
        var th = $(this);
        elements.label(th);
    });

};
	
		
		
		
		
		
		
		
		
		
		
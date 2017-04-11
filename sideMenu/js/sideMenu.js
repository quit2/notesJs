$(function(){
    $('#sidemenu li img').off('click').on('click',function(){
      var img_subtract = 'images/subtract.png';
      var img_plus = 'images/plus.png';
      if($(this).siblings('ul').is(':hidden')){
        $(this).attr('src',img_subtract);
        $(this).siblings('ul').css('display','block');
      }else{
        $(this).attr('src',img_plus);
        $(this).siblings('ul').css('display','none');
      }
    })
})
import $ from 'jquery';

function openContent(){
    $(".tabContent").css("display","none");

    var target = $(event.target)[0];
    console.log(target.name);
    var contentDivId = "#" + target.name;
    $(contentDivId).css("display","block");

}
export{openContent}
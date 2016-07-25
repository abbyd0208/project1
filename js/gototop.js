$(function(){
	
	var iScrollPointA = 200;  //回到某一個點
	var iScrollPointB = 700;  //滾到某一個點
	
	var sGototopHtml = '<div class="gototop" style="width:100px; height:50px; background:orange; position:fixed; bottom:50px; right:50px; z-index:100; cursor:pointer; display:none;">回上層</div>';
	
	$("body").append(sGototopHtml);
	
	$(window).scroll(function(){
		if( $(window).scrollTop() > iScrollPointB) {
			$(".gototop").show();	
		} else {
			$(".gototop").hide();	
		};
	});
	
	
	// 讓捲軸用動畫的方式移動到到指定id位罝
	$(".gototop").click(function(){
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 1000);
		return false;
	});
	
});

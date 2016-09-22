//首頁輪播圖
$(function(){
	
	$('.gallery_1 .run .inner').bxSlider({  
		slideWidth:1300,
		auto : true,
		pause : 3000
	});
	
});


//內頁輪播圖
$(function(){
		
		$('.gallery_2 .run .inner').bxSlider({
			slideWidth:750,
			pagerCustom: ".gallery_2 .pager",
			touchEnabled : true,
			auto : true
		});
	});

//側滑選單
$(function(){
		var iWinW;
		var BtnOpen = $(".header .btn_open");
		var BtnClose = $(".nav_1 .btn_close");
	
	
	//fn 選單開
		function fnNav_1Open(){
			$(".wrapper").css({"overflow":"hidden"});
			$(".nav_1").stop().animate({"left":"0%"});
		}	
	
	//fn 選單關
		function fnNav_1Close(){	
			$(".wrapper").css({"overflow":"auto"});
			$(".nav_1").stop().animate({"left":"100%"})
		}

	$(".header .btn_open").on("click",fnNav_1Open);
	$(".nav_1 .btn_close").on("click",fnNav_1Close);

	//歸零，當手機旋轉的時候，nav會被關起來
	$(window).on("orientationchange",function(){
		if( bMenuStatus === 1){fnNav_1Close()}
	});
		
});

//ifram自適應

$(document).ready(function () {
$('iframe[src*="google.com/maps"]').wrap('<div class="googlemap" />');
});

//hash scroll
$(function(){
	
	// Wicked credit to
	// http://www.zachstronaut.com/posts/2009/01/18/jquery-smooth-scroll-bugs.html
	var scrollElement = 'html, body';
	$('html, body').each(function () {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') == initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}    
	});
	
	// Smooth scrolling for internal links
	$(".subject_recommend_list a[href^='#']").click(function(event) {
		event.preventDefault();
		
		var $this = $(this),
		target = this.hash,
		$target = $(target);
		
		$(scrollElement).stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function() {
			window.location.hash = target;
		});
		
	});

});

//gototop
$(function(){
	
	var iScrollPointA = 0;  //回到某一個點
	var iScrollPointB = 700;  //滾到某一個點
	
	var sGototopHtml = '<div class="gototop">TOP</div>';
	
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


//
$(function(){
	//table寫入
	$("table").attr("class", "my_table")
	
	var sTxt1 = $(".my_table tr").eq(0).find("th").eq(0).html();
	var sTxt2 = $(".my_table tr").eq(0).find("th").eq(1).html();
	var sTxt3 = $(".my_table tr").eq(0).find("th").eq(2).html();
	var sTxt4 = $(".my_table tr").eq(0).find("th").eq(3).html();
	var sTxt5 = $(".my_table tr").eq(0).find("th").eq(4).html();
	var sTxt6 = $(".my_table tr").eq(0).find("th").eq(5).html();
	
	var aTxt = [sTxt1, sTxt2, sTxt3, sTxt4, sTxt5, sTxt6];
	
	$(".my_table tr").slice(1).each(function(i){
		$(this).find("td").each(function(j){
			$(this).prepend("<span>"+aTxt[j]+" </span>")
		});
	});
	
});


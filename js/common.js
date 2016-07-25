// JavaScript Document


//側滑選單開關===========================================================
$(function(){
	
	var iWinH ;
	
	//iscroll 模組
	var mySideScroll = new IScroll(".side .inner", {
		interactiveScrollbars:true, //滑鼠可拖拉滾動軸
		mouseWheel: true,
		scrollbars: true,
		tap: true,
		click: true,
	});
	
	//選單開
	$(".btn_side_open").on("click", function(){
		iWinH = $(window).height();
		$(".wrapper").css({"height":iWinH,"overflow":"hidden"});
		$(".side").css({"height":iWinH}).animate({"left":"0%"});
		mySideScroll.refresh();//iscroll重新算高度
		$(".btn_side_close").show();
	});
	
	//選單關
	$(".btn_side_close").on("click", function(){
		$(".wrapper").css({"height":"auto","overflow":"visible"});
		$(".side").css({"left":"100%"})
	});
	
	//重新計算高度
	$(window).on("resize", function(){
		iWinH = $(window).height();
		$(".side").css({"height":iWinH});
		mySideScroll.refresh();//iscroll重新算高度
	});
	
});


//選單吸住=================================================================
$(function(){
	
	//複製一組選單
	$(".header").after($(".nav_1").clone());
	$(".nav_1").eq(0).addClass("nav_1_ori");
	$(".nav_1").eq(1).addClass("nav_1_clone").css({"visibility":"hidden","position":"fixed","top":"-65px","z-index":"60"});
	
	
	//取得ori跟視窗偏移的距離
	var iNav_1Point = parseInt( $(".nav_1_ori").offset().top);
	var iWinScrollT;
	var oScrollTimer = null;
	
	$(window).on("scroll", function(){
		//計時器歸零
		if(oScrollTimer){clearTimeout(oScrollTimer);}
		
		oScrollTimer = setTimeout(function(){
			iWinScrollT = $(window).scrollTop();
			if(iWinScrollT>iNav_1Point+50){
				$(".nav_1_ori").css({"visibility":"hidden"})
				$(".nav_1_clone").css({"visibility":"visible"}).animate({"top":"0px"},1000)
			}else{
				$(".nav_1_ori").css({"visibility":"visible"})
				$(".nav_1_clone").css({"visibility":"hidden"})
			}
		},0);
	
	});

});

//圖集======================================================
$(function(){
	$(".gallery_1").find(".piece:not(:has(img))").remove();//大圖輪播沒廣告就隱藏
	$(".gallery_1 .run").bxSlider({
		//pager : false, //分頁
		captions:true,
		//adaptiveHeight : true, // 自適應高
		slideWidth:768,
		onSliderLoad : function(){
			$(".gallery_1").css({height:"auto"});
			$(".gallery_1 .run .inner .piece img").show();
		}
	});
	
});

//切換字的大小==================================
$(function(){
	
	var sCookieKey = "w3";//定義cookie名稱
	var sCookieVal;
	
	$(".font_size_switch a").click(function(e){
		e.preventDefault();
		sCookieVal = $(this).attr("class");
		$(".story").removeClass("size_s size_m size_l").addClass(sCookieVal);
		$.cookie(sCookieKey, sCookieVal, {expires: 365}); //覆蓋掉cookie紀錄
	});
	
	//初始偵測
	if($.cookie(sCookieKey)) {  //如果電腦有cookie紀錄
		$(".story").addClass( $.cookie(sCookieKey) );
    };
	
});

//搜尋==============================================
$(window).load(function(){
	
	//隱藏送出input，統一由.icon_close控制
 	$("#cse-search-box .send").hide();
	
	$(".header .btn_search_open").on("click", function(){
		$(".search").show().animate({"top":"0px"},300);
		$("#cse-search-box .keyword").val('').focus();
	});
	
	$(".search .btn_search_close").on("click", function(){
		$(".search").animate({"top":"-150px"},300);
	});
	
	//trigger 送出搜尋值
	 $(".search .btn_search_go").on("click", function(){
	  $("#cse-search-box .send").trigger("click");
	 });
	
	//keyword裡面沒有值的時候.search會移出去
	$("#cse-search-box .keyword").on("blur", function(){
		if($("#cse-search-box .keyword").val() == ""){
			$(".search").animate({"top":"-150px"},300);
		};
	});

});   

//讓捲軸用動畫的方式移動到到指定id位罝 news.htm======================
$(function(){
 $(".scrollgo").click(function(){
  var sGoTo = $(this).attr("rel"); //取得目標物的id class
  var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
  $body.animate({
   scrollTop: $(sGoTo).offset().top-38
  }, 500);
  return false;
 });
});


//lazyload
$(function(){
	$(".part_pictxt_1 img, .part_pictxt_2 img, .part_pictxt_3 img, .subject_columnist img").lazyload({effect : "fadeIn" });
});


// gototop
$(function(){
	
	var iScrollPointA = 0;  //回到某一個點
	var iScrollPointB = 700;  //滾到某一個點
	
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


//iframe video
$(document).ready(function () {

  //video 新聞內頁影音修正
  var et_iframe_ele = '\
    [src*="youtube.com"],\
    [src*="ettoday.net/tools/player"],\
    [src*="goo.gl"],\
    [src*="facebook.com/plugins/video.php"]\
    ';

  var $iframe = $('iframe');
  var et_iframevideo = $iframe.filter(et_iframe_ele);
 
  if(et_iframevideo.length){
      $(et_iframevideo).wrap('<div class="et_iframevideo" />');
  }

  //google.doc//////////////////////////////////
  $iframe.filter('[src*="docs.google.com"]').wrap('<div class="et_googledoc" />')

});


//廣告控制
$(function(){
	$(".part_list_2").find("h3:not(:has(a))").remove();//新聞內頁-熱門新聞的文字廣告，若沒有就隱藏
	$(".part_list_1").find("h3:not(:has(a))").remove();//首頁-熱門新聞的文字廣告，若沒有就隱藏
})

//置底橫幅控制
$(window).scroll(function () {
	//置底廣告控制：捲動大於150px ==========
	if ($(this).scrollTop() > 150) { //置底廣告出現
		$('.ad_320x50_fixed').fadeIn(100);
	} else {//捲動小於600px，不要顯示置底廣告
		$('.ad_320x50_fixed').fadeOut(100);//隱藏置底廣告
	}
});

//trackevent
$(function(){
	//主選單
	$(".nav_1 li a").click(function() {          
		ga("health.send", "event", "主選單", ""+$(this).text()+"");
	});	
    
    //Header icon
    $(".menu_1 a").click(function() {          
		ga("health.send", "event", "Header icon", ""+$(this).text()+"");
	});
    //columnist
    $(".part_pictxt_2 .piece a").click(function() {          
		ga("health.send", "event", "專欄作者", ""+$(this).text()+"");
	});
    
    
    //首頁大圖輪播
    $(".gallery_1 .run .piece a img").click(function() {          
		ga("health.send", "event", "首頁大圖輪播", ""+$(this).attr('title')+"");
	});
    
    //健康即時
    $(".part_pictxt_1 piece h3 a").click(function() {
		ga("health.send", "event", "健康即時", ""+$(this).text()+"");
	});
    
    $(".part_pictxt_1 piece h3 a").click(function() {;
	var iNo= $(".part_pictxt_1 piece h3 a").index($(this))+1;
	ga("health.send", "event", "健康雲-健康即時", "第"+iNo+"則", ""+$(this).text()+"");
    });
    
    //熱門新聞
    $(".block_content .part_list_1 h3 a").click(function() {
		ga("health.send", "event", "熱門新聞", ""+$(this).text()+"");
	});
    
    //專題新聞
    $(".part_list_2 h3 a").click(function() {
        var topic=$(".block_3 .block_title h3 a").text();
		ga("health.send", "event", "專題新聞", ""+$(this).text()+topic+"");
	});
    
    //內頁文首社群組件-fb
    $(".operate_1 .social .fb").click(function() {          
		ga("health.send", "event", "文首社群組件", "文首按鈕-facebook");
	});	
    
    //內頁文首社群組件-G+
    $(".operate_1 .social .gplus").click(function() {          
		ga("health.send", "event", "文首社群組件", "文首按鈕-gplus");
	});
    
    //內頁文首社群組件-weibo
    $(".operate_1 .social .weibo").click(function() {          
		ga("health.send", "event", "文首社群組件", "文首按鈕-webio");
	});
    
    //內頁文首社群組件-fb原生按鈕
    $(".operate_1 .fb-like").click(function() {          
		ga("health.send", "event", "PC版-文首社群組件", "文首按鈕-facebook原生按鈕like");
	});
    $(".operate_1 .fb-share-button").click(function() {          
		ga("health.send", "event", "PC版-文首社群組件", "文首按鈕-facebook原生按鈕share");
	});
    
    //限制級
	$('.icon_adult').imagesLoaded(function() { 
		ga("health.send", "event", "限制級新聞");
	});
    
    //內文
	$(".story").click(function() {          
		ga("health.send", "event", "PC版-內文連結", ""+$(this).text()+"");
	});	
    
    //內頁文末社群組件-粉絲團
	$(".operate_2 .social .fb").click(function() {          
		ga("health.send", "event", "文末社群組件", "文末按鈕-facebook粉絲團");
	});
    
    //內頁文末社群組件-youtube
	$(".operate_2 .social .youtube").click(function() {          
		ga("health.send", "event", "文末社群組件", "文末按鈕-youtube");
	});
    
    //內頁文末社群組件-留言按鈕
	$(".operate_2 .social .message").click(function() {          
		ga("health.send", "event", "文末社群組件", "文末按鈕-留言按鈕");
	});
    
    //內頁文末推薦閱讀
    $(".recommandnews h3 a").click(function() {;
		var iNo= $(".recommandnews a").index($(this))+1;
		ga("health.send", "event", "文末推薦閱讀", "第"+iNo+"則", ""+$(this).attr('title')+"");
	});
    
    //內頁文末熱門文章
    $(".hotnews .part_list_2 h3 a").click(function() {;
		var iNo= $(".hotnews .part_list_2 h3 a").index($(this))+1;
		ga("health.send", "event", "文末熱門文章", "第"+iNo+"則", ""+$(this).attr('title')+"");
	});
    
});



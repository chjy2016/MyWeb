$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	var pageUrl=window.location.href; 
	var aArray=$('nav ul li a');
	//console.log(pageUrl);
	for(var i=1;i<aArray.length;i++){
		if(pageUrl==aArray[0].href){//首页
			$(aArray[0]).addClass('clickcolor');
		}
		else if(pageUrl==aArray[i].href){
			$(aArray[i]).addClass('clickcolor');
			/*console.log($(aArray[i]).parent().parent().attr("class"));*/
			if($(aArray[i]).parent().parent().attr("class")=="dropdown-game"){
				$('.gameplay').addClass('clickcolor');
			}
		}
	}
	$('nav ul li a').click(function(){
		var c=this;
		$('nav ul li a').each(function(){
			if(this==c){
				$(this).addClass('clickcolor');
			}				
			$(this).not(c).removeClass('clickcolor');
			});
		});
		$('.dropdown-game li a').click(function(){
			$('.dropdown-game').prev() .addClass('clickcolor');
		});
	});
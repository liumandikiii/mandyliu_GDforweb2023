// JavaScript source code
$(document).ready(function(){ 


	$("#darkmode").click(function(){
		$('body').toggleClass('darkmode');
		if($("body").hasClass('darkmode')){
			$(this).text("light mode");
		}else{
			$(this).text("Dark mode");
		}

		
	});

});


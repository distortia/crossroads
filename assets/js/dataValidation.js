$(document).ready(function(){
	$('#sign-up-form').validate({
		rules:{
			name:{
				required: true
			},
			email:{
				required: true,
				email:true
			},
			password:{
				minlength: 6,
				required: true	
			},
			confirmation:{
				minlength: 6,
				equalTo: "#password"
			}
		},
		// //TODO Change text to textfield turning green
		// success: function(element){
		// 	// element.text('Good!').addClass('valid');
		// 	// element.prev().append("<span class=\"sr-only\">(success)</span>");
		// 	// element.prev().addClass( "success" );
		// }
	});
});
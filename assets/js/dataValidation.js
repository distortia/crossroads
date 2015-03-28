$(document).ready(function(){
	#('sign-up-form').validate({
		rules:{
			name:{
				required: true
			},
			email:{
				required: true,
				email:email
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
		success: function(element){
			element.text('Good!').addClass('valid');
		}
	});
});
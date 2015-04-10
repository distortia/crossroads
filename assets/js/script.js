$("#passwordCheckbox").click(function() {
    if ($("#password").attr("type") == "password" || $("#confirmPassword").attr("type")== "password") {
        $("#password").attr("type", "text");
        $("#confirmPassword").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
        $("#confirmPassword").attr("type", "password");
    }
});


$("#joinCompany").click(function(){
	$("#companyForm").empty();
	$("#companyForm").append('<input type="hidden" class="form-control" value="Content Admin" name="level">');
});

$("#createCompany").click(function(){
	$("#companyForm").empty();
	$("#companyForm").append('<input type="hidden" class="form-control" value="Company Admin" name="level">');
});


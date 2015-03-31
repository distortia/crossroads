$("#passwordCheckbox").click(function() {
    if ($("#password").attr("type") == "password" || $("#confirmPassword").attr("type")== "password") {
        $("#password").attr("type", "text");
        $("#confirmPassword").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
        $("#confirmPassword").attr("type", "password");
    }
});
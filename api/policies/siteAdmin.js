module.exports = function (req, res, ok){
	//If the user is logged in and if the admin level is less than 2 - site admin and above
	if (req.session.user && req.session.user.adminLevel <= "2") {
		return ok();
	} else {
		var requireSiteAdminError = [{error: 'requreSiteAdmin'}, {message: 'You do not have correct site admin privileges. Please contact support if this is in error.'}]
		req.session.flash = {
			err: requireSiteAdminError
		}
		//Might want to redirect to someplace else
		res.redirect('/session/new');
		return;
	}
	ok();
}
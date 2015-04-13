
module.exports = function(req, res, ok) {
	var sessionUserMatchesId = req.session.user.id === req.param('id');
	var isAdmin = req.session.user.admin;
	
	// The requested id does not match the user's id,
	// and this is not an admin
	if (!(sessionUserMatchesId || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
		req.session.flash = {
			err: noRightsError
		}
    res.redirect('/session/new');
    return;
	}

	ok();

};
module.exports = function(req, res, ok) {

	if (req.session.user && req.session.user.admin){
		return ok();
	} else {
		var requireAdminError = [{error: 'requireAdmin', message: 'You do not have administrative permissions to access this feature.'}]
		req.session.flash = {
			err: requireAdminError
		}
		res.redirect('/session/new');
		return;
	}
}
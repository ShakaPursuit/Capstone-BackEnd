const checkGoals = (req, res, next) => {
    const {name} = req.body;
    if (!name) {
        return next();
    } else {
        res.status(400).json({ error: 'Goals name are required' });
    }
};
const checkTargets = (req, res, next) => {
    const {target_date} = req.body;
    if (!target_date ) {
        return next();
    } else {
        res.status(400).json({ error: 'Target date must be required' });
    }
};

module.exports = { checkGoals, checkTargets };
const checkFirstName = (req, res, next) => {
    const { firstName} = req.body;
    
    if (firstName) {
        return next();
    } else {
        res.status(400).json({ error: 'First name are required' });
    }
};

const checkLastName = (req, res, next) => {
    const { lastName} = req.body;
    
    if (lastName) {
        return next();
    } else {
        res.status(400).json({ error: 'Last name are required' });
    }
};
module.exports = { checkFirstName, checkLastName };
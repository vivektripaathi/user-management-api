module.exports = (err, req, res, next) => {

    console.error(err);

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json("The user is not authorized")
    }

    if (err.name === 'ValidationError') {
        // validation error
        return res.status(401).json(err.message.replace(/\\/g, '').replace(/"/g, '') )
    }

    if(err.name === 'Duplicate Value'){
        // duplicate value error
        return res.status(409).json(err.message )
    }

    if(err.name === 'SequelizeDatabaseError'){
        // database query error
        return res.status(500).json(err.message.replace(/\\/g, '').replace(/"/g, ''));
    }

    if(err.name === 'Not Found'){
        return res.status(404).json(err.message)
    }

    // default to 500 server error;
    return res.status(500).json('Internal Server Error');
}

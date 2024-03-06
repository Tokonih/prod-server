function handleError (res, code, error ){
    if(code === 43){
        error = `${error} already exist with this email. login to proceed`
    }else if(code === 404){
        error = `${error} not found`
    }else if(code === 500){
        error = `server error`
    }

    return res.status(code).json({code, error})

}

module.exports = handleError
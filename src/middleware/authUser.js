const authUser = {
    isUser: (req, res, next) => {
        req.user = {
            user: 'Bauti',
            isAdmin: true
        };
        next();
    },

    isAdmin: (req, res, next) => {
        if (req.user.isAdmin) next();
        else res.status(400).json({
            error: -1,
            description: " en la ruta  http://localhost:8080/api/productos  metodos=> POST , PUT, DELETE",
            msg: "No esta  autorizado para implementar esos meotdos",
            status: 400
        })
    }

}

module.exports = authUser
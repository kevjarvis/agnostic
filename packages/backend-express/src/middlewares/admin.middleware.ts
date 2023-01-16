const adminMiddleware = (req, res, next) => {
  // Verifica si dentro del header de la petición se encuentra 
  // x-is-admin como true, este parámetro se guarda en req.isAdmin

  req.isAdmin = req.headers['x-is-admin'] === 'true';
  next();
}

export default adminMiddleware
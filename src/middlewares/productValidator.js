export const productValidator = (req, res, next) =>{
    if(
        req.body.title === undefined || typeof req.body.title !== 'string' || 
        req.body.description === undefined || typeof req.body.description !== 'string' ||
        req.body.code === undefined || typeof req.body.code !== 'string' ||
        req.body.price === undefined || typeof req.body.price !== 'number' ||
        req.body.stock === undefined || typeof req.body.stock !== 'number' ||
        req.body.category === undefined || typeof req.body.category !== 'string' ||
        req.body.thumbnails === undefined || typeof req.body.thumbnails !== 'string' 
  ) {
    console.log(
      `You must to complete all fields with the correct data type: 
      \n title: must be => "string" 
      \n description: must be => "string" 
      \n code: must be => "string" 
      \n price: must be => "number" 
      \n stock: must be => "number"
      \n category: must be => "string"
      \n thumbnails: must be => "string"`
    );
    res.status(400).send(
      `You must to complete all fields with the correct data type: 
      \n title: must be => "string" 
      \n description: must be => "string" 
      \n code: must be => "string" 
      \n price: must be => "number" 
      \n stock: must be => "number"
      \n category: must be => "string"
      \n thumbnails: must be => "string"`
    );
  } else {
    next();
  }
};

export default productValidator;
export const userValidator = (req, res, next) => {
  if (
    req.body.first_name === undefined ||
    typeof req.body.first_name !== 'string' ||
    req.body.last_name === undefined ||
    typeof req.body.last_name !== 'string' ||
    req.body.email === undefined ||
    typeof req.body.email !== 'string' ||
    req.body.age === undefined ||
    typeof req.body.age !== 'number' ||
    req.body.password === undefined ||
    typeof req.body.password !== 'string'
  ) {
    console.log(
      `You must to complete all fields with the correct data type: 
      \n\n first name: must be => "string" 
      \n last name: must be => "string" 
      \n email: must be => "string" 
      \n age: must be => "number" 
      \n password: must be => "string"`
    );
    res.status(400).send(
      `You must to complete all fields with the correct data type: 
      \n\n first name: must be => "string" 
      \n last name: must be => "string" 
      \n email: must be => "string" 
      \n age: must be => "number" 
      \n password: must be => "string"`
    );
  } else {
    next();
  }
};

export default userValidator;

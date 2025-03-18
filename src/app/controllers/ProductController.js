import * as Yup from "yup"
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";


class ProductController{
 async store(req,res){
  const Schema = Yup.object({
    name: Yup.string().required(),
    price: Yup.number().required(),
    category_id: Yup.number().required(),
    offer: Yup.boolean(),
  });
 
  

  try{
    Schema.validateSync(req.body,{abortEarly:false});
  }catch(err){
    return res.status(400).json({ error: err.errors});
  }

  const  { admin: isAdmin} = await User.findByPk(req.userId);

  if(!isAdmin){
    return res.status(401).json({message: "Voce não é administrador"})
  }
  
  const {filename: path} = req.file;

  const { name, price , category_id, offer} = req.body;

  const product = await Product.create({
    name,
    price,
    category_id,
    path,
    offer,
  });

  return res.status(201).json(product)
 }

 async index(req,res){
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        as:   'category',
        attributes: ['id','name'],
      
      },
    ],
  });

  return res.json(products)
 }
 async update(req, res){
  const Schema = Yup.object({
    name: Yup.string(),
    price: Yup.number(),
    category_id: Yup.number(),
    offer: Yup.boolean(),
  });
 
  

  try{
    Schema.validateSync(req.body,{abortEarly:false});
  }catch(err){
    return res.status(400).json({ error: err.errors});
  }

  const  { admin: isAdmin} = await User.findByPk(req.userId);

  if(!isAdmin){
    return res.status(401).json({message: "Voce não é administrador"});
  }

   const {id} = req.params;

   const findProduct = await Product.findByPk(id);


   if(!findProduct){
    return res.status(401).json({error: 'Seu id do produtos esta incorreto'});
  } 
  
  let path;
  if(req.file){
    path = req.file.filename
  }
  
  const { name, price , category_id, offer} = req.body;

  await Product.update({
    name,
    price,
    category_id,
    path,
    offer,
  },
  {
    where:{
      id,
    }
  });
  return res.status(200).json()
 }
}

export default new ProductController();
import * as Yup from "yup"
import Category from "../models/Category.js";
import User from "../models/User.js";


class CategoryController{
 async store(request,response){
  const Schema = Yup.object({
    name: Yup.string().required(),
    
  });

  try{
    Schema.validateSync(request.body,{abortEarly:false});
  } catch (err){
    return response.status(400).json({ error: err.errors});
  }

  const  { admin: isAdmin} = await User.findByPk(request.userId);

  if(!isAdmin){
    return response.status(401).json({message: "Voce não é administrador"})
  }

  let path;
  if (request.file){
    path = request.file.filename;
  }

  
  const { name } = request.body;

  const categoryExist =await Category.findOne({
    where: {
      name,
    },
  });

  if(categoryExist){
    return response.status(400).json({error: 'Categoria ja Existe'})
  }
  const {id} = await Category.create({
    name,
    path,
  });

  return response.status(201).json({id ,name});
 }

 async index(request,response){
  const categories = await Category.findAll()

  return response.json(categories)
 }
 async update(request,response){
  const Schema = Yup.object({
    name: Yup.string(),
  });
  
  try{
    Schema.validateSync(request.body,{abortEarly:false})
  }catch(err){
    return response.status(400).json({ error: err.errors})
  }

  const  { admin: isAdmin} = await User.findByPk(request.userId)

  if(!isAdmin){
    return response.status(401).json({message: "Voce não é administrador"})
  }
  const {id} =request.params

  const categoryExists =  await Category.findByPk(id);

  if(!categoryExists){
    return response.status(400).json({message:'Seu id de Categoria não esta correto. '});
  }

  let path;
  if(request.file){
    path = request.file.filename
  }
  
  const { name } = request.body;

 if(name){
  const categoryNameExist =await Category.findOne({
    where: {
      name, 
    }
  });

  if(categoryNameExist && categoryNameExist.id !== +id) {
    return response.status(400).json({error: 'Categoria ja Existe'});
   }
 }
   
  await Category.update({
    name,
    path,
  },
  {
    where:{
      id,
    },
 },
);
    return response.status(200).json();
 }  

 async index(request, response) {
  const categories = await Category.findAll();

  return response.json(categories);
 }
}

export default new CategoryController();
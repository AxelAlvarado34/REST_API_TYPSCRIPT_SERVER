import { Request, Response } from 'express'

import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {

   try {
      const product = await Product.create(req.body);
      res.json({ data: product });
   } catch (error) {
      console.log(error)
   }
}

export const getProductsAll = async(req : Request, res : Response) => {
   try {
      const products = await Product.findAll({
         attributes : {exclude : ['createdAt', 'updatedAt']},
         order: [
            ['id', 'DESC']
         ]
      })
       res.json({data : products})
   } catch (error) {
      console.log(error);
   }
}

export const getProductById = async(req : Request, res : Response) => {
   try {
      const {id} = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
         return res.status(404).json({error: 'Producto no encontrado'})
      }

      res.json({data : product})
      
   } catch (error) {
      console.log(error);
   }
}

export const updateProduct = async(req : Request, res : Response) => {
   const {id} = req.params;
   const product = await Product.findByPk(id);

   if (!product) {
      return res.status(404).json({error: 'Producto no encontrado'})
   }

   //ACTUALIZAR
   await product.update(req.body);
   await product.save();
   

   res.json({data: product})
}

export const updatePatchProduct = async(req : Request, res : Response) => {
   const {id} = req.params;
   const product = await Product.findByPk(id);

   if (!product) {
      return res.status(404).json({error: 'Producto no encontrado'})
   }

   //ACTUALIZAR
   product.availability = !product.dataValues.availability;
   await product.save();
   
   res.json({data: product})
}


export const deleteProduct = async(req : Request, res : Response) => {
   const {id} = req.params;
   const product = await Product.findByPk(id);

   if (!product) {
      return res.status(404).json({error: 'Producto no encontrado'})
   }

   await product.destroy()
   res.json({data: 'Prodcuto Eliminado'})
}
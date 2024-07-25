import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProductsAll, updatePatchProduct, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

import { body, param } from 'express-validator'

const productsRouter = Router();

//ROUTING POST
productsRouter.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value =>  value > 0 ).withMessage('Precio no valido'),
    handleInputErrors, 
    createProduct
);

//ROUTING GET ALL
productsRouter.get('/', 
    getProductsAll
);

//ROUTINS GET FIND ONE
productsRouter.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
);

//ROUTING PUT UPDATE
productsRouter.put('/:id', 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value =>  value > 0 ).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para Disponibilidad no valido'),
    handleInputErrors,
    updateProduct
);

productsRouter.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updatePatchProduct
);

productsRouter.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
);

export default productsRouter;
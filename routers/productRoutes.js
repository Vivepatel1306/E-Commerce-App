import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import formidable from "express-formidable"
import { brainTreePaymentController,  braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, realtedProductController,  searchProductController, updateProductController } from "../controllers/productController.js";

const router=express.Router()

router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);
router.get("/get-product",getProductController);
router.get("/get-product/:slug",getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.get("/product-list/:page", productListController);
router.get("/product-count",productCountController);
router.post("/product-filters",productFilterController);
router.get("/search/:keyword",searchProductController)
router.get("/related-product/:pid/:cid",realtedProductController);
router.get("/product-category/:slug",productCategoryController)
router.get('/braintree/token',braintreeTokenController)
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)
export default router;
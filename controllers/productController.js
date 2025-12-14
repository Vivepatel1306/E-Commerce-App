import slugify from "slugify";
import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.fields;
    const { photo } = req.files;

    // ✅ Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case !photo || photo.size > 1000000:
        return res.status(400).send({ error: "Photo size should be less than 1MB" });
    }

    // ✅ Create product
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // ✅ Handle photo
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
    res.status(200).send({
      message: "Orderrs find successfulli",
      products,
      TotalCount: products.length,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error in getting details of products",
      status: false,
      error
    })
  }
}

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
    res.status(200).send({
      message: "Single Datta Found ",
      product,
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error in finding singledata",
      error,
      success: false
    })
  }

}

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(
        product.photo.data
      );
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error in getting image",
      error,
      success: false
    })
  }
}
export const deleteProductController = async (req, res) => {
  try {
    const product = productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      message: "Product deleted succesfuly",
      success: true,

    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error while deleting product",
      error,
      success: false
    })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const page = req.params.page ? req.params.page : 1;
    const perPage = 4;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Error in productlistcontroller",
      status: false,
      error
    })
  }
}


export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    })
  } catch (error) {
    res.status(500).send({
      message: "Error in Counting products",
      status: false,
      error,
    })
  }
}

export const productFilterController = async (req, res) => {
  try {
    const { radio, checked } = req.body;
    const args = {};
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    if (checked.length > 0) args.category = checked
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    res.status(500).send({
      message: "Error in filtring products",
      error,
      success: false
    })
  }
}

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ],
    }).select("-photo");
    res.json(results);

  } catch (error) {
    res.status(500).send({
      message: "Error in searching product",
      success: false
    })
  }
}

export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send({
          success: false,
          error: err
        });
      }

      res.status(200).send({
        success: true,
        clientToken: response.clientToken,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error });
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
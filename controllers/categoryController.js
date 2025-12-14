import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category alredy exists"
            })
        }
        const category = await new categoryModel({
            name, slug: slugify(name)
        }).save();
        res.status(200).send({
            message: "Categori created sucessfuli",
            category,
            success: true
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error found in creating categorY",
            success: false,
            error
        });

    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Updated Category Sucessfuly ",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error on updating Category",
            success: false,
            error
        })
    }
}

export const categoryControlller = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            message: "Data displayed succesfulli",
            success: true,
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error on showing category info",
            success: false,
            error
        })
    }
}


export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            message: "Got single ctaegory succesfulli",
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error while singleCategoryController ",
            error,
            success: false
        })

    }
}
export const deleteCategoryCOntroller = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            message: "categoyr deleted succesfulli ",
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: "Error while deleting category!",
            error,
            success: false
        })

    }
}
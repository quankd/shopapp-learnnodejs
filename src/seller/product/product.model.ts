import mongoose from "mongoose";
import { ProductDoc, ProductModel } from '@shopapp-learnnodejs/common'

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        src: {type: String , required: true}
    }
})

export const Product = mongoose.model<ProductDoc, ProductModel>('Product', schema);
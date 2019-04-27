import mongoose, {Document, Schema} from "mongoose";

export interface IProduct extends Document {
    description: string;
    name: string;
    quantity: number;
}

const ProductSchema: Schema = new Schema({
    description: {type: Schema.Types.String, required: false},
    name: {type: Schema.Types.String, required: true},
    quantity: {type: Schema.Types.Number, required: true, default: 0},
});

export default mongoose.model<IProduct>("Product", ProductSchema);

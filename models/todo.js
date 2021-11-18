const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
	{
		todoid: { type: Number, required: true, unique: true },
		content: { type: String, required: true },
		completed: { type: String, default: true },
	},
	{
		timestamps: true,
	}
);

//create new todo document
todoSchema.statics.create = (payload) => {
	const todo = new this(payload);
	return todo.save();
};

//find all
todoSchema.statics.findAll = () => {
	return this.find({});
};

//find one by todoid
todoSchema.statics.findOneByTodoid = (todoid) => this.findOne({ todoid });

//update by todoid
todoSchema.statics.updateByTodoid = (todoid, payload) =>
	this.findOneAndUpdate({ todoid }, payload, { new: true });

//delete by todoid
todoSchema.statics.deleteByTodoid = (todoid) => this.remove({ todoid });

//create model export
module.exports = mongoose.model("Todo", todoSchema);

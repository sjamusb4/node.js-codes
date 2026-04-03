const mongoose = require('mongoose');

// This defines the structure of the User documents in MongoDB
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true, // This must be inside the field definition
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema); // This creates a model named 'User' based on the userSchema

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,// id of the user who created the todo
        required: true,
    },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {User, Todo};

// model vs schema
// A schema defines the structure of the document, default values, validators, etc. It is a blueprint for how the data should look.
// A model is a compiled version of the schema. It provides an interface to interact with the database, allowing you to create, read, update, and delete documents based on the defined schema.
// example: CRUD operations using the User model
// Create a new user => new User({username: 'john_doe', password: 'hashed_password'}).save();
// Read users => User.find({username: 'john_doe'});
// Update a user => User.updateOne({username: 'john_doe'}, {password: 'new_hashed_password'});
// Delete a user => User.deleteOne({username: 'john_doe'});
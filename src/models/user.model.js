const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;
    
    bcrypt.genSalt(12, function (error, salt) {
        if (error) {
            return next(error);
        }
        
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const storedPassword = this.password;
    
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, storedPassword, function (err, isMatch) {
            if (err) {
                reject(err);
            }
            
            resolve(isMatch);
        });
    });
};

module.exports = userSchema;

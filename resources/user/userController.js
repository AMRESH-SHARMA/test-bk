import User from "./userModel.js"
import mongoose from "mongoose"
import { sendResponse } from "../../util/sendResponse.js";
import { newToken } from '../../util/jwt.js'

//Register a User
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email: email }).countDocuments();
    if (exist) {
      return sendResponse(409, false, 'User already exist', res)
    }

    const user = await User.create({
      // name,
      email,
      password,
      // phone,
      // avatar: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
    });
    sendResponse(201, true, user, res)
  } catch (e) {
    if (e.code) {
      return sendResponse(400, false, `${Object.keys(e.keyValue)} Already in use`, res)
    }
    sendResponse(400, false, e, res)
  }
};

//Login User
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return sendResponse(400, false, 'Invalid Email', res);
  }

  try {
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return sendResponse(400, false, 'Invalid Password', res);
    }
    const token = newToken(user)
    const options = {
      expires: new Date(
        Date.now() + 20 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("token", token, options)
    sendResponse(201, true, token, res);
  } catch (e) {
    sendResponse(400, false, e.message, res)
  }
};


//Logout User
export const logout = async (req, res, next) => {
  try {
    const options = {
      expires: new Date(
        Date.now() + 20 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.cookie("token", null, options);
    sendResponse(200, true, 'Logged Out', res)
  } catch (e) {
    sendResponse(400, false, e.message, res)
  }
};


// 4.Forgot Password
// export const forgotPassword = async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return sendResponse(404, false, 'User not found', res)
//   }

//   try {
//     // Get ResetPassword Token
//     const resetToken = user.getResetPasswordToken();//call function

//     //save database reset token
//     await user.save({ validateBeforeSave: false });
//     //create link for send mail
//     // const resetPasswordUrl = `http://localhost:5000/api/v1/user/password/reset/${resetToken}` //send from localhost
//     //send from anyhost
//     // const resetPasswordUrl = `${req.protocol}://${req.get(
//     //     "host"
//     // )}/api/v1/user/password/reset/${resetToken}`;
//     //const resetPasswordUrl = `${process.env.FRONTEND_URL}:/api/user/password/reset/${resetToken}`;
//     //const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
//     const password = generator.generate({
//       length: 10,
//       numbers: true
//     });
//     user.password = password;
//     await user.save()
//     // const message = `Your password reset token are :- \n\n ${resetPasswordUrl} \n\nyour new password is:${password}\n\nIf you have not requested this email then, please ignore it.`;
//     // await sendEmail({

//     //   to: `${user.email}`, // Change to your recipient
//     //   from: 'project.edufuture@gmail.com', // Change to your verified sender
//     //   subject: `CMP Password Recovery`,
//     //   html: `your new password is: <br/> <strong> ${password}</strong><br/><br/>If you have not requested this email then, please ignore it.`

//     // });
//     console.log(resetToken);
//     // res.status(200).json({
//     //   success: true,
//     //   message: `Email sent to ${user.email} successfully`,
//     // });
//     sendResponse(200, true, resetToken, res)
//   } catch (e) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     return sendResponse(500, false, e.message, res);
//   }
// };


// // 5.Reset Password
// export const resetPassword = catchAsyncErrors(async (req, res, next) => {
//   // creating token hash
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(
//       new ErrorHander(
//         "Reset Password Token is invalid or has been expired",
//         400
//       )
//     );
//   }
//   //replace previous password
//   if (req.body.password !== req.body.confirmPassword) {
//     return next(new ErrorHander("Password does not password", 400));
//   }

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   sendToken(user, 200, res);
// });


// // 8.update User password
// export const updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

//   if (!isPasswordMatched) {
//     return next(new ErrorHander("Old password is incorrect", 400));
//   }

//   if (req.body.newPassword !== req.body.confirmPassword) {
//     return next(new ErrorHander("password does not match", 400));
//   }

//   user.password = req.body.newPassword;

//   await user.save();

//   sendToken(user, 200, res);
// });

// 9.update User Profile
// export const updateProfile = async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     phone: req.body.phone,
//     email: req.body.email,
//   };

//   if (req.files) {
//     const files = req.files.avatar;
//     const user = await User.findById(req.user.id);

//     const imageId = user.avatar.public_id;

//     await cloudinary.uploader.destroy(imageId)

//     const myCloud = await cloudinary.uploader.upload(files.tempFilePath, {
//       folder: "image",
//     },
//       function (error, result) { (result, error) });

//     newUserData.avatar = {
//       public_id: myCloud.public_id,
//       url: myCloud.secure_url,
//     };
//   }
//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   sendResponse(200, true, user, res)
// };

// // 9.Get all users(admin)
// export const getAllUser = catchAsyncErrors(async (req, res, next) => {

//   const users = await User.find()//.select('-role');

//   res.status(200).json({
//     success: true,
//     users,
//   });
// });

//user create
export const addUser = async (req, res, next) => {
  try {
    const { uniqueId, userName, email, phone, city } = req.body;
    const exist = await User.findOne({ email: email }).countDocuments();
    if (exist) {
      return sendResponse(409, false, 'User already exist', res)
    }
    const user = await User.create({
      _id: uniqueId,
      userName,
      email,
      phone,
      city,
      role: 'user'
    });
    sendResponse(201, true, user, res)
  } catch (e) {
    if (e.code) {
      return sendResponse(400, false, `${Object.keys(e.keyValue)} Already in use`, res)
    }
    sendResponse(400, false, e, res)
  }
};

//Get all users(except admin)
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().all('role', ['user']);
    sendResponse(200, true, users, res)
  } catch (e) {
    console.log(e);
    sendResponse(400, false, e.message, res)
  }
};

//Get single user
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('booksAdded')
    if (!user) {
      return sendResponse(400, false, `User does not exist with Id: ${req.params.id}`, res)
    }
    sendResponse(200, true, user, res)
  } catch (e) {
    console.log(e);
    sendResponse(400, false, e.message, res)
  }
};

//Update user
export const updateUser = async (req, res, next) => {
  try {
    const { userName, email, phone, city } = req.body

    const newUserData = {
      userName: userName,
      email: email,
      phone: phone,
      city: city
    };
    await User.findByIdAndUpdate(req.params.id, newUserData);
    sendResponse(200, true, 'Updated Successfully', res)
  } catch (e) {
    if (e.code) {
      return sendResponse(400, false, `${Object.keys(e.keyValue)} Already in use`, res)
    }
    sendResponse(400, false, e, res)
  }
};

//Update user
export const updateUserStatus = async (req, res, next) => {
  try {
    const TrueStatus = {
      approved: 'true'
    };
    const FalseStatus = {
      approved: 'false'
    };
    const user = await User.findById(req.body.id);
    if (user.approved) {
      await User.updateOne({ _id: mongoose.mongo.ObjectId(req.body.id) }, FalseStatus);
    } else {
      await User.updateOne({ _id: mongoose.mongo.ObjectId(req.body.id) }, TrueStatus);
    }
    sendResponse(200, true, 'User Status Updated', res)
  } catch (e) {
    sendResponse(400, false, e.message, res)
  }
};
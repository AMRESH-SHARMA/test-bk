import { check, header, query, validationResult } from 'express-validator'

export const vLogin = [
  check('email')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username can not be empty!')
    .bail(),
  check('password')
    .notEmpty()
    .withMessage('Password can not be empty!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, msg: errors.mapped() });
    next();
  },
];

export const vAccessToken = [
  header('token')
    .exists()
    .withMessage('Access Token Does not exist')
    .bail()
    .notEmpty()
    .withMessage('Access Token can not be empty')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    return res.status(422).json({ success: false, msg: errors.mapped() });
    next();
  },
];

// exports.footerCustomServiceV = [
//   check('description')
//     .exists()
//     .withMessage('Footer Custom Services description can not be empty!')
//     .isString()
//     .withMessage('Footer Custom Services description must be string')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];

// exports.addressV = [
//   check('address')
//     .exists()
//     .withMessage('Address can not be empty!')
//     .isString()
//     .withMessage('Address must be string')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];

// exports.socialLinksV = [
//   check('socialLinks')
//     .exists()
//     .withMessage('social Links are Requiered')
//     .isString()
//     .withMessage('social Links must be string')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];

// exports.FooterEndV = [
//   check('footerEnd')
//     .exists()
//     .withMessage('Footer End can not be empty!')
//     .isString()
//     .withMessage('Footer End must be string')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];

// BANNER
// exports.bannerV = [
//   check('title')
//     .exists()
//     .withMessage('title can not be empty!')
//     .isString()
//     .withMessage('title must be string')
//     .bail(),
//   check('description')
//     .exists()
//     .withMessage('description can not be empty!')
//     .isString()
//     .withMessage('description must be string')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];





// exports.validatePageQuery = [
//   query('page')
//     .exists()
//     .notEmpty()
//     .trim()
//     .isInt()
//     .withMessage('Query is not valid integer')
//     .bail(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(422).json({ errors: errors.array() });
//     next();
//   },
// ];
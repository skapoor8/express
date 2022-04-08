const express = require('express');
const adminController = require('../controllers/adminController');

// Create router
const router = express.Router();

// Change layout for admin app
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin'; 
    next();
});

router.route('/')
    .get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);
    

router.route('/posts/create')
    .get(adminController.createPost)
    .post(adminController.submitPost);

router.route('/posts/:id/edit')
    .get(adminController.editPost)
    .put(adminController.updatePost);

router.route('/posts/:id/delete')
    .delete(adminController.deletePost);

router.route('/tinymceImageUpload')
    .post(adminController.tinymceUpload);

router.route('/categories')
    .get(adminController.getCategories)
    .post(adminController.createCategory);

router.route('/categories/:id/edit')
    .get(adminController.editCategory)
    .post(adminController.updateCategory);

router.route('/tags')
    .get(adminController.getTags);

router.route('/tags/:tag/edit')
    .get(adminController.editTag)
    .post(adminController.updateTag);

router.route('/series')
    .get(adminController.getSeries);

router.route('/series/create')
    .get(adminController.newSeries)
    .post(adminController.createSeries);
 
module.exports = router;
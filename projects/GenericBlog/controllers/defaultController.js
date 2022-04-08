const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel')

module.exports = {
    index: async (req, res) => {
        const posts = await Post.find().lean();
        const categories = await Category.find().lean();
        res.render('default/index', {posts: posts, categories: categories});
    },
    viewPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id).lean().then(post => {
            res.render('default/post', {post: post});
        })
    },
    viewTag: (req, res) => {
        Post.find({tags: `${req.params.tag}`}).lean().then(posts => {
            Post.aggregate().match({tags: `${req.params.tag}`})
                .unwind('tags').group({'_id':'$tags', 'count':{$sum: 1}})
                .sort({'count': -1}).limit(posts.length/2)
                .exec((err, results) => {
                    if (results) {
                        let index = results.findIndex(t => t._id == `${req.params.tag}`);
                        if (index !== -1) results.splice(index, 1);
                        console.log(results);
                        //res.render('default/tag', {posts: posts, tag: req.params.tag, relatedTags: results});
                    } 
                    res.render('default/tag', {posts: posts, tag: req.params.tag, relatedTags: results});
                    
                })
                //.then(results => {
                //    console.log(results);
            //});
            
        });
    },
    loginGet: (req, res) => {
        res.render('default/login');
    },
    loginPost: (req, res) => {
        res.send('Login Attempted');
    },
    registerGet: (req, res) => {
        res.send('Register New User Page');
    },
    registerPost: (req, res) => {
        res.send('New User Creation Attempted');
    },
}
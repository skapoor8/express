const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const Series = require('../models//SeriesModel');

const {isFileEmpty} = require('../config/helperFunctions');

module.exports = {
    index: (req, res) => {
        res.render('admin/dashboard');
    },
    getPosts: (req, res) => {
        Post.find().populate('category').lean().then(posts => {
            res.render('admin/posts/index', {posts: posts});
        });      
    },
    createPost: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/posts/create', {categories: cats});
        });   
    },
    submitPost: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        const tinyMCEinput = req.body.body;
        const tagArray = req.body.tags.split(' ').filter(Boolean)
            .map(function(str) {return str.toLowerCase()});
        console.log('SUBMIT POST - REQ.BODY:');
        console.log(req.body);
        console.log('TAG ARRAY:');
        console.log(tagArray);

        // Add cover image
        let filename = '';
        let filepath = '';

        if (!isFileEmpty(req.files)) {
            // console.log(req.files);
            let file = req.files.coverImage;
            filename = file.name;
            filepath = '/uploads/' + filename;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir+filename, (error) => {
                if (error) {
                    throw error;
                }
            });
        }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            body: req.body.body, // tinymce input
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category,
            tags: tagArray,
            coverImage: filepath
        });

        newPost.save().then(post => {
            console.log("SAVED POST:");
            console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/haiku/posts');
        });
    },
    editPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id).lean().then(post => {
            Category.find().lean().then(categories => {
                res.render('admin/posts/edit', {post: post, categories: categories});
            });
            
        });
    },
    updatePost: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        const id = req.params.id;
        const tagArray = req.body.tags.split(' ').filter(Boolean)
            .map(function(str) {return str.toLowerCase()});
        const editedPost = Post.findById(id).then(post => {

            // Add Cover Image
            let filename = '';

            if (!isFileEmpty(req.files)) {
                let file = req.files.coverImage;
                filename = file.name;
                let uploadDir = './public/uploads/';

                file.mv(uploadDir+filename, (error) => {
                    if (error) {
                        throw error;
                    }
                });
                post.coverImage = `/uploads/${filename}`;

            }

            post.title = req.body.title;
            post.body = req.body.body;
            post.status = req.body.status;
            post.allowComments = commentsAllowed;
            post.description = req.body.description;
            post.category = req.body.category;
            post.tags = tagArray;

            post.save().then(updatedPost => {
                console.log('UPDATED POST:');
                console.log(updatedPost);
                req.flash('success-message', `The post ${updatedPost.title} was updated.`);
                res.redirect('/haiku/posts');
            });
        });
    },
    deletePost: (req, res) => {
        const id = req.params.id;
        Post.findByIdAndDelete(id).lean().then(deletedPost => {
            req.flash('success-message', `The post with title "${deletedPost.title}" was deleted`);
            res.redirect('/haiku/posts');
        })
    },

    /* TinyMCE Image Upload */
    tinymceUpload: (req, res) => {
        let filename = '';

        if (!isFileEmpty(req.files)) {
            let file = req.files.file;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir+filename, (error) => {
                if (error) {
                    throw error;
                }
            });
        }

        res.json({location: `/uploads/${filename}`});
    },

    /* CATEGORY METHODS */
    getCategories: (req, res) => {
        Category.find().lean().then(categories => {
            res.render('admin/categories/index', {categories: categories});
        })
    },
    createCategory: (req, res) => {
        const categoryName = req.body.name;
        if (categoryName) {
            const newCategory = new Category({
                title: categoryName,
            });
            newCategory.save().then(category => {
                res.status(200).json(category);
            })
        }
    },
    editCategory: async (req, res) => {
        const categoryId = req.params.id;
        const categories = await Category.find().lean();
        Category.findById(categoryId).lean().then(category => {
            res.render('admin/categories/edit', {category: category, categories: categories});
        })
    },
    updateCategory: (req, res) => {
        const categoryId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(categoryId).then(category => {
                category.title = newTitle;
                category.save().then(updated => {
                    res.status(200).json({url: '/haiku/categories'});
                })
            })
        }
    },

    /* TAG METHODS */
    getTags: (req, res) => {
        
            Post.aggregate().unwind('tags').group({'_id':'$tags', 'count':{$sum: 1}}).then( tagCounts => {
                res.render('admin/tags/index', {tagCounts: tagCounts});
            })
    },
    editTag: (req, res) => {
        console.log("1. req.body.tag=", req.body.tag);
        console.log("2. req.params.tag=", req.params.tag);
        res.render('admin/tags/edit', {tag: req.params.tag, success: req.query.success});
    },
    updateTag: (req, res) => {
        console.log(req.params.tag);
        Post.find({tags: `${req.params.tag}`}).lean().then(posts => {
            console.log('POSTS FOUND WITH TAG');
            console.log(posts);
        });
        Post.update({tags: `${req.params.tag}`}, {'$set': {'tags.$': `${req.body.tag}`}}, {multi: true}).then(() => {
                Post.find({tags: `${req.body.tag}`}).lean().then(posts => {
                    console.log("NOT BROKEN", posts.length);
                    req.flash('success-message', `tag ${req.params.tag} was changed to ${req.body.tag} in ${posts.length} articles`);
                    console.log("3. req.body.tag=", req.body.tag);
                    console.log("4. req.params.tag=", req.params.tag);
                    res.redirect(`/haiku/tags/${req.body.tag}/edit?success=true`);
                });
                
        });

        
    },
    deleteTag: (req, res) => {
        res.send('Deleting a Tag');
    },
    /* SERIES METHODS */
    getSeries: (req, res) => {
        Series.find().lean().then(series => {
            res.render('admin/series/index', {series: series});
        }); 
    },
    newSeries: (req, res) => {
        Post.find().lean().then(posts => {
            res.render('admin/series/create', {posts: posts});
        });
    },
    createSeries: (req, res) => {
        const newSeries = new Series({
            title: req.body.title,
            description: req.body.description,
        });

        newSeries.save().then(series => {
            console.log("SAVED SERIES:");
            console.log(series);
            req.flash('success-message', 'Series created successfully');
            res.redirect('/haiku/series');
        });
    },
}
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Author = require('./author');
var Book = require('./book');

mongoose.connect('mongodb://localhost/mongoose_basics', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
   if (err) throw err;

   console.log('Successfully connected');

   // var jamieAuthor = new Author({
   //    _id: new mongoose.Types.ObjectId(),
   //    name: {
   //       firstName: 'Jamie',
   //       lastName: 'Munro'
   //    },
   //    biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
   //    twitter: 'https://twitter.com/endyourif',
   //    facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
   // });

   // jamieAuthor.save(function (err) {
   //    if (err) throw err;

   //    console.log('Author successfully saved.');

   //    var mvcBook = new Book({
   //       _id: new mongoose.Types.ObjectId(),
   //       title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
   //       author: jamieAuthor._id,
   //       ratings: [{
   //          summary: 'Great read'
   //       }]
   //    });

   //    mvcBook.save(function (err) {
   //       if (err) throw err;

   //       console.log('Book successfully saved.');
   //    });

   //    var knockoutBook = new Book({
   //       _id: new mongoose.Types.ObjectId(),
   //       title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
   //       author: jamieAuthor._id
   //    });

   //    knockoutBook.save(function (err) {
   //       if (err) throw err;

   //       console.log('Book successfully saved.');
   //    });
   // });

   Book.find({
      title: /mvc/i
   }).sort('-created')
      .limit(5)
      .exec(function (err, books) {
         if (err) throw err;

         console.log("Books: "+books);
      });

   Author.findById('5fc122e349f28b05ef5046b9', function (err, author) {
      if (err) throw err;

      author.linkedin = 'https://www.linkedin.com/in/jamie-munro-8064ba1a/';

      author.save(function (err) {
         if (err) throw err;

         console.log('Author updated successfully');
      });
   });

   Author.findByIdAndUpdate('5fc122e349f28b05ef5046b9', { linkedin: 'https://www.linkedin.com/in/jamie-munro-8064ba1a/' }, function (err, author) {
      if (err) throw err;

      console.log("Author: "+author);
   });

   Author.find(function (err, authors) {
      if (err) throw err;

      console.log("Find all Authors: "+authors);
   });

});

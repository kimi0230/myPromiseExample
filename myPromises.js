var async = require('async')
var fs = require('fs');
var _ = require("underscore");

var files = ['article.json', 'content.json', 'author.json'];

function getArtical(id) {
	return new Promise(function(resolve, reject) {
		fs.readFile('article.json', 'utf8', function(err, text) {
			if (err) {
				reject(err)
			} else {
				let artical = JSON.parse(text);
				artical = artical[0];
				resolve(artical);
			}
		});
	});
}

function getContent(id) {
    return new Promise(function(resolve, reject) {
		fs.readFile('content.json', 'utf8', function(err, text) {
			if (err) {
				reject(err);
			} else {
                let content = JSON.parse(text);
                content = _.find(content, function(item){
                    return item.id == id;
                });
                // content = _.where(content, {id: id})[0];
				resolve(content);
			}
		});
	});
}

function getAuthor(id) {
	return new Promise(function(resolve, reject) {
		fs.readFile('author.json', 'utf8', function(err, text) {
			if (err) {
				reject(err)
			} else {
				let author = JSON.parse(text);
                author = _.find(author, function(item){
                    return item.id == id;
                });
                resolve(author);
			}
		});
	});
}

function getArticleList() {
	return new Promise(function(resolve, reject) {
		fs.readFile('article.json', 'utf8', function(err, text) {
			// console.log(JSON.parse(text));
			if (err) {
				reject(err)
			} else {
				resolve(JSON.parse(text));
			}
		});
	});
}

getArticleList().then(function(articles) {
    // console.log("articles list = ", articles);
	return getArtical(articles[0].id);

}).then(function(artical) {
	// console.log("article = ",artical);

    return getContent(artical.content_id);
}).then(function(content){
    // console.log(content);

    return getAuthor(content.authorId);
}).then(function(author){
    console.log(author);
});




// const promise = new Promise(function(resolve, reject) {
// 	// 成功時
// 	resolve(value)
// 	// 失敗時
// 	reject(reason)
// });

// promise.then(function(value) {
// 	// on fulfillment(已實現時)
//     console.log("successful");
// }, function(reason) {
//     console.log("fail");
// 	// on rejection(已拒絕時)
// })
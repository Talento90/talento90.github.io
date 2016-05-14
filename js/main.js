$(function() {

var apiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/sharednode.org/posts/?number=5&author=2";

    var request = $.ajax({
        url: apiUrl,
        method: "GET"
    });

    request.done(function(data) {
        createPosts(data.posts);
    });

    request.fail(function(jqXHR, code) {
        errorPosts();
    });

    request.always(function() {
        $("#blog-list-spinner").hide();
    });

    function createPosts(posts) {
        var list = $("#blog-list");
        
        (posts.reverse()).forEach(function(post) {
            $('<li class="list-group-item">' +
                '<a href="' + post.URL + '"> <i class="fa fa-calendar"></i> ' + new Date(post.date).toLocaleDateString() + ' - ' + post.title + '</a>' +
            '</li>').insertAfter(list);
        }, this);
    }
 
    function errorPosts() {
        $("#blog-list").append('<li class="list-group-item list-group-item-danger">Some error occurred <i class="fa fa-thumbs-down"></i></li>');
    }
});
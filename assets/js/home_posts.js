{
    // Method to submit the form data for a new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }>">X</a>
                    </small>
    
                    ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                </p>

                <div class="post-comment">

                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type your comment Here ...">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Comment">
                        </form>


                        <div class="post-comments-list">
                            <ul class="post-comments-${post._id}">
                            </ul>
                        </div>
                </div>
    </li>`)
    }

    // Creating a Method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    createPost();

}
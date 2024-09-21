document.addEventListener('DOMContentLoaded', () => {
    // Populate with predefined posts
    const predefinedPosts = [
        {
            profile: {
                name: "Alice Smith",
                role: "expert",
                picture: "meee.jpg"
            },
            message: "any stamps",
                comments: [
                    "check my profile bro!"
            ]
        },
        {
            profile: {
                name: "Bob Johnson",
                role: "seller",
                picture: "meeeee.jpg"
            },
            message: "Had an incredible dinner at this new restaurant!",
            image: "stamps2.jpg",
            comments: [
                "That looks cool!",
                "Where did you get this all first ?"
            ]
        },
        {
            profile: {
                name: "Charlie Brown",
                role: "Stamp collector",
                picture: "bob.jpg"
            },
            message: "Captured this stunning pic of my older letter last evening.",
            image: "stamps1.jpg",
            comments: [
                "Beautiful !",
                "What are the stamps  did you use?"
            ]
        }
    ];

    const postsContainer = document.getElementById('posts');

    predefinedPosts.forEach(postData => {
        const post = createPost(postData.profile, postData.message, postData.image, postData.comments);
        postsContainer.appendChild(post);
    });
});

function createPost(profile, messageText, imageFile, comments) {
    const post = document.createElement('div');
    post.classList.add('post');

    // Post header
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    
    const profilePic = document.createElement('div');
    profilePic.classList.add('profile-pic');
    profilePic.style.backgroundImage = `url(${profile.picture})`;
    
    const profileDetails = document.createElement('div');
    profileDetails.classList.add('profile-details');
    profileDetails.innerHTML = `
        <strong>${profile.name}</strong><br>
        ${profile.role}
    `;

    postHeader.appendChild(profilePic);
    postHeader.appendChild(profileDetails);
    post.appendChild(postHeader);

    // Post content
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    if (messageText) {
        const message = document.createElement('div');
        message.classList.add('message');
        message.textContent = messageText;
        postContent.appendChild(message);
    }

    if (imageFile) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const image = document.createElement('img');
        image.src = imageFile;
        image.classList.add('resized-image');
        imageContainer.appendChild(image);
        postContent.appendChild(imageContainer);
    }

    post.appendChild(postContent);

    // Action buttons
    const actionButtons = document.createElement('div');
    actionButtons.classList.add('action-buttons');
    actionButtons.innerHTML = `
        <button class="like-button" onclick="likePost(this)">
            <i class="fa fa-thumbs-up"></i> Like <span class="count">0</span>
        </button>
        <button class="unlike-button" onclick="unlikePost(this)">
            <i class="fa fa-thumbs-down"></i> Unlike <span class="count">0</span>
        </button>
        <button class="comment-button" onclick="toggleComments(this)">
            <i class="fa fa-comment"></i> Comment
        </button>
        <button class="share-button">
            <i class="fa fa-share"></i> Share
        </button>
    `;
    post.appendChild(actionButtons);

    // Comments section
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');
    commentsSection.style.display = 'none'; // Initially hidden
    commentsSection.innerHTML = `
        <textarea placeholder="Add a comment..."></textarea>
        <button class="post-comment-button" onclick="postComment(this)">Post Comment</button>
    `;
    post.appendChild(commentsSection);

    // Add predefined comments
    comments.forEach(commentText => {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.textContent = commentText;

        commentsSection.insertBefore(comment, commentsSection.querySelector('textarea'));
    });

    return post;
}

function toggleComments(button) {
    const post = button.closest('.post');
    const commentsSection = post.querySelector('.comments-section');
    commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
}

function likePost(button) {
    const countSpan = button.querySelector('.count');
    const count = parseInt(countSpan.textContent, 10);
    countSpan.textContent = count + 1;
}

function unlikePost(button) {
    const countSpan = button.querySelector('.count');
    const count = parseInt(countSpan.textContent, 10);
    if (count > 0) {
        countSpan.textContent = count - 1;
    }
}

function postComment(button) {
    const post = button.closest('.post');
    const commentsSection = post.querySelector('.comments-section');
    const commentText = commentsSection.querySelector('textarea').value;

    if (commentText.trim() !== '') {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.textContent = commentText;

        commentsSection.insertBefore(comment, commentsSection.querySelector('textarea'));
        commentsSection.querySelector('textarea').value = ''; // Clear textarea
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const imageInput = document.getElementById('imageInput');
    const postsContainer = document.getElementById('posts');

    const messageText = messageInput.value;
    const file = imageInput.files[0];
    
    if (messageText || file) {
        const post = document.createElement('div');
        post.classList.add('post');

        // Post header
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        
        const profilePic = document.createElement('div');
        profilePic.classList.add('profile-pic');
        
        const profileDetails = document.createElement('div');
        profileDetails.classList.add('profile-details');
        profileDetails.innerHTML = `
            <strong>Surjit Kumar</strong><br>
            Senior philatelist
        `;

        postHeader.appendChild(profilePic);
        postHeader.appendChild(profileDetails);
        post.appendChild(postHeader);

        // Post content
        const postContent = document.createElement('div');
        postContent.classList.add('post-content');

        if (messageText) {
            const message = document.createElement('div');
            message.classList.add('message');
            message.textContent = messageText;
            postContent.appendChild(message);
        }

        if (file) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('resized-image');
            postContent.appendChild(image);
        }

        post.appendChild(postContent);

        // Action buttons
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');
        actionButtons.innerHTML = `
            <button class="like-button" onclick="likePost(this)">
                <i class="fa fa-thumbs-up"></i> Like <span class="count">0</span>
            </button>
            <button class="unlike-button" onclick="unlikePost(this)">
                <i class="fa fa-thumbs-down"></i> Unlike <span class="count">0</span>
            </button>
            <button class="comment-button" onclick="toggleComments(this)">
                <i class="fa fa-comment"></i> Comment
            </button>
            <button class="share-button">
                <i class="fa fa-share"></i> Share
            </button>
        `;
        post.appendChild(actionButtons);

        // Comments section
        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.style.display = 'none'; // Initially hidden
        commentsSection.innerHTML = `
            <textarea placeholder="Add a comment..."></textarea>
            <button class="post-comment-button" onclick="postComment(this)">Post Comment</button>
        `;
        post.appendChild(commentsSection);

        postsContainer.prepend(post); // Add new post to the top

        // Clear input fields
        messageInput.value = '';
        imageInput.value = '';
    }
}

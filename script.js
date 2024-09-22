const socket = io();

const commentForm = document.getElementById('commentForm');
const usernameInput = document.getElementById('usernameInput');
const commentInput = document.getElementById('commentInput');
const commentsDiv = document.getElementById('comments');

// Load existing comments
socket.on('load comments', (comments) => {
    commentsDiv.innerHTML = ''; // Clear existing comments
    comments.forEach(addComment);
});

// Listen for new comments
socket.on('new comment', (comment) => {
    addComment(comment);
});

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const comment = {
        username: usernameInput.value,
        text: commentInput.value,
        time: new Date().toLocaleTimeString()
    };
    socket.emit('new comment', comment);
    commentInput.value = '';
});

function addComment(comment) {
    const div = document.createElement('div');
    div.classList.add('comment');
    div.innerHTML = `
        <img src="https://via.placeholder.com/40" alt="Avatar">
        <div class="comment-details">
            <span class="comment-username">${comment.username}</span>
            <span class="comment-time">${comment.time}</span>
            <p class="comment-text">${comment.text}</p>
        </div>
    `;
    commentsDiv.appendChild(div);
}
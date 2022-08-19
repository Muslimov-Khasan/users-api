const elUsersList = document.querySelector('.user-list');
const elUserCount = document.querySelector('.api-user__counting');
const elPostsList = document.querySelector('.post-list');
const elPostCount = document.querySelector('.api-post__counting');
const elCommentsList = document.querySelector('.comment-list');
const elCommentCount = document.querySelector('.api-comment__counting');

// Documnet Template
const elUsersTemp = document.querySelector('.user-list-temp').content;
const elPostsTemp = document.querySelector('.post-list-temp').content;
const elCommentTemp = document.querySelector('.comment-list-temp').content;

// Render users
function renderUsers(array, wrapper){
    if(array){
        const userDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            const userClone = elUsersTemp.cloneNode(true);
            
            userClone.querySelector('.user-list__heading').textContent = item.name;
            userClone.querySelector('.user-list__mail').textContent = item.email;
            userClone.querySelector('.user-list__mail').href = `mailto:${item.email}`;
            userClone.querySelector('.user-list__company').textContent = item.company.name;
            userClone.querySelector('.user-list__address').textContent = item.address.city;
            userClone.querySelector('.user-list__btn').dataset.userId = item.id;
            
            userDocFragment.appendChild(userClone);
        })
        
        elUserCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null;
        wrapper.appendChild(userDocFragment);
    }
}
// render post function
function renderPosts(array, wrapper){
    if(array){
        const postDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            const postClone = elPostsTemp.cloneNode(true);
            
            postClone.querySelector('.post-list__heading').textContent = item.title;
            postClone.querySelector('.post-list__desc').textContent = item.body;
            postClone.querySelector('.post-list__btn').dataset.postId= item.id;
            
            postDocFragment.appendChild(postClone)
        })
        
        elPostCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null
        wrapper.appendChild(postDocFragment)
    }
}
// render comments function
function renderComments(array, wrapper){
    if(array){
        const commentDocFragment = document.createDocumentFragment();
        
        array.forEach(item => {
            const commentClone = elCommentTemp.cloneNode(true);
            
            commentClone.querySelector('.comment-list__heading').textContent = item.name;
            commentClone.querySelector('.comment-list__mail').textContent = item.email;
            commentClone.querySelector('.comment-list__desc').textContent = item.body;
            
            commentDocFragment.appendChild(commentClone)
        })
        
        elCommentCount.textContent = `Count of users: ${array.length}`;
        wrapper.innerHTML = null;
        wrapper.appendChild(commentDocFragment)
    } 
}

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => renderUsers(data, elUsersList))

elUsersList.addEventListener('click', evt => {
    const findID = evt.target.dataset.userId

    renderComments([], elCommentsList)
    
    fetch(`https://jsonplaceholder.typicode.com/user/${findID}/posts`)
    .then(response => response.json())
    .then(data => renderPosts(data, elPostsList))
})

elPostsList.addEventListener('click', evt => {
    const findCommentId = evt.target.dataset.postId
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${findCommentId}/comments`)
    .then(response => response.json())
    .then(data => renderComments(data, elCommentsList))
})


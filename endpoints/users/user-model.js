const db = require('../../data/db-config.js');


module.exports = {
    find,
    findById,
    findByUsername,
    findPosts,
    add,
    update,
    remove
};


function find(){
    return db('users');
}

// a single user or null if no user
function findById(id){
    return db('users').where({ id }).first();
}

function findByUsername(username){
    return db('users').where({ username }).first();
}

// SELECT id, contents, username FROM posts
  // JOIN users as u ON p.user = u.id;
function findPosts(user_id){
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.title', 'p.contents', 'p.user_id')
    .where({ user_id })
}

//resolves to newly crerated user
function add(user){
    return db('users').insert(user)
    .then(ids => {
        return findById(ids[0]);
    });
}

//resolves to updated user
function update(changes, id){
    return db('users').where({ id }).update(changes)
    .then(count => {
        return findById(id);
    });
}

//resolves to count
function remove(id){
    return  db('users').where({ id }).del();
}





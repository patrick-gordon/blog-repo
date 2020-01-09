const db = require('../data/db-config.js');


module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
};


function find(){
    return db('users');
}

function findById(id){
    return db('users').where({ id }).first();
}

function findPosts(user_id){
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id })
}

function add(user){
    return db('users').insert(userData);
}

function update(){
    return db('users').where({ id }).update(changes);

}

function remove(){
    return  db('users').where({ id }).del();
}





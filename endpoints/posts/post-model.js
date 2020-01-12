const db = require('../../data/db-config.js');



module.exports = {
    find,
    add, 
    remove,
    update,
    findById
}

function find(){
    return db('posts');
}

function add(post){
    return db('posts').insert(post)
    .then(ids => {
        return findById(ids[0]);
    });
}

function update(changes, id){
    return db('posts').where({ post_id }).update(changes)
    .then(count => {
        return findById(id);
    })
}


function remove(id){
    return  db('posts').where({ id }).del();
}

function findById(id){
    return db('posts').where({ id }).first();
}
const db = require('../db/connection')


const fetchTopics = () => {
    return db.query(
        `SELECT * FROM topics`
    )
    .then(topics => {
        return topics.rows
    })
}

const fetchArticles = (sort_by = 'created_at', order = 'desc') => { //sort_by the column, order arranges the column in descending order
    return db.query(
        `SELECT articles.*, count(comments.comment_id) AS comment_count
        FROM articles 
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id 
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`
    )
    .then(articles => {
        return articles.rows
    })
}

module.exports = { fetchTopics, fetchArticles };
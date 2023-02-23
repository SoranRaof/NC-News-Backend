const app = require('../app');
const sorted = require('jest-sorted');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const { handleServerErrors, handleCustomErrors, handlePSQLErrors } = require('../controllers/error-handling-controller');

beforeEach(() => seed(testData));

afterAll(() => db.end());


describe('GET /api/topics', () => {
    test('responds with a 200 status code', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
    })
    test('get /api/topics request responds with an array of topics objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(res => {
            expect(res.body.topics).toBeInstanceOf(Array);
            expect(res.body.topics).not.toBeEmpty();
            for (let i = 0; i < res.body.topics.length; i++) {
                expect(res.body.topics[i]).toBeInstanceOf(Object);
                expect(res.body.topics[i]).toHaveProperty('slug');
                expect(res.body.topics[i]).toHaveProperty('description');
            }
        })
    })
})

describe('GET /api/articles', () => {
    test('responds with a 200 status code', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
    })
    test('get /api/articles request responds with an array of articles objects with a comment_count property and date in decending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
            expect(res.body.articles).toBeInstanceOf(Array);
            expect(res.body.articles).not.toBeEmpty();
            for (let i = 0; i < res.body.articles.length; i++) {
                expect(res.body.articles[i]).toBeInstanceOf(Object);
                expect(res.body.articles[i]).not.toBeEmpty();
                expect(res.body.articles[i]).toHaveProperty('article_id');
                expect(res.body.articles[i]).toHaveProperty('title');
                expect(res.body.articles[i]).toHaveProperty('body');
                expect(res.body.articles[i]).toHaveProperty('votes');
                expect(res.body.articles[i]).toHaveProperty('topic');
                expect(res.body.articles[i]).toHaveProperty('author');
                expect(res.body.articles[i]).toHaveProperty('created_at');
                expect(res.body.articles[i]).toHaveProperty('comment_count');
            }
        })
    })
    test('get /api/articles date property is in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
            expect(res.body.articles).toBeSortedBy('created_at', { descending: true })
        })
    })
    });

describe('GET /api/articles/:article_id', () => {
    test('responds with a 200 status code', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
    })
    test('get /api/articles/:article_id request responds with an article object with the correct properties', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(res => {
            
            for (let i = 0; i < res.body.article.length; i++) {
                expect(res.body.article).toBeInstanceOf(Object);
                expect(res.body.article).not.toBeEmpty();
                expect(res.body.article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),})
            }
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('responds with a 200 status code', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
    })
    test('get /api/articles/:article_id request responds with an array of comments objects with the correct properties', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(res => {
            expect(res.body.comments).toBeInstanceOf(Array);
            expect(res.body.comments).not.toBeEmpty();
            expect(res.body.comments.length).toBe(11)
            for (let i = 0; i < res.body.comments.length; i++) {
                expect(res.body.comments[i]).toBeInstanceOf(Object);
                expect(res.body.comments[i]).not.toBeEmpty();
                expect(res.body.comments[i]).toMatchObject({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number)})
            }
        })
    })
})

describe('error handling', () => {
    test('responds with a 404 status code when given an invalid path', () => {
        return request(app)
        .get('/api/invalid-path')
        .expect(404)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Not found');
        })
    })
    test('responds with a 400 status code when given an invalid perameter', () => {
        return request(app)
        .get('/api/articles/string')
        .expect(400)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Bad request');
        })
    })
    test('responds with a 404 along without a no article found message when given an invalid article id', () => {
        return request(app)
        .get('/api/articles/999999')
        .expect(404)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Article not found');
        })
    })
})

describe('error handling', () => {
    test('responds with a 404 status code when given an invalid path', () => {
        return request(app)
        .get('/api/invalid-path')
        .expect(404)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Not found');
        })
    })
    test('responds with a 400 status code when given an invalid perameter', () => {
        return request(app)
        .get('/api/articles/:999999')
        .expect(400)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Bad request');
        })
    })
    test('responds with a 404 along without a no article found message when given an invalid article id', () => {
        return request(app)
        .get('/api/articles/:article_id/string')
        .expect(404)
        .then(res => {
            const { msg } = res.body;
            expect(msg).toBe('Not found');
        })
    })
})


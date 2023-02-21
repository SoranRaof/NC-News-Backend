const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const { handleServerErrors } = require('../controllers/error-handling-controller');

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
            expect(res.body.topics[0]).toHaveProperty('slug');
            expect(res.body.topics[0]).toHaveProperty('description');
            for (let i = 0; i < res.body.topics.length; i++) {
                expect(res.body.topics[i]).toBeInstanceOf(Object);
                expect(res.body.topics[i]).not.toBeEmpty();
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
            expect(res.body.articles[0]).toHaveProperty('article_id');
            expect(res.body.articles[0]).toHaveProperty('title');
            expect(res.body.articles[0]).toHaveProperty('body');
            expect(res.body.articles[0]).toHaveProperty('votes');
            expect(res.body.articles[0]).toHaveProperty('topic');
            expect(res.body.articles[0]).toHaveProperty('author');
            expect(res.body.articles[0]).toHaveProperty('created_at');
            expect(res.body.articles[0]).toHaveProperty('comment_count');
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
})
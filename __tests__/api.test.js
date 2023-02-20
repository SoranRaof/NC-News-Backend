const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

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







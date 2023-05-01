# Northcoders News API

## Background

### We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture. This will be a RESTFUL server hosting, where registered users can comment on articles, as well as vote on comments/articles.

## We will be using a PSQL database and interacting with it using node-postgres. To connect to the database, we require two .env files:

## .env.development

```
PGDATABASE=nc_news;
```

## .env.test

```
PGDATABASE=nc_news_test;
```

### To run the test suites, first ensure that all required dependencies are installed by running npm install in your terminal while in the project directory. This will install all dependencies listed in package.json, including dotenv, express, pg, pg-format, supertest, jest, jest-extended, and jest-sorted. After installation, check the node_modules folder to ensure all dependencies were properly installed.

### To run the test suites, use the command npm test app.test.js. This will execute the tests using the Jest testing framework, which is included in the dependencies. If any test cases fail, Jest will provide detailed error messages to help identify and fix the issue.

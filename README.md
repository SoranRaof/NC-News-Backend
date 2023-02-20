# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

This database will be PSQL, we will interact with it using [node-postgres]

## As .env.\* is added to the .gitignore, anyone who wishes to clone this repo will not have access to the necessary environment variables. You must create the following .env files in order to successfully connect to the two databases locally:

## .env.development

```
PGDATABASE=nc_news
```

## .env.test

```
PGDATABASE=nc_news_test
```

# Express RESTful API (Auth)
RESTful API  using express js (Auth) + mongoDB  build  simple project

## Installation

<pre>
    1. npm i -g nodemon #If not installed
    2. npm install
</pre>

## Start server

<pre>
    1. npm start #command in package.json
</pre>

## Open Api

<pre>
    1. Register Api POST : <a href="http://127.0.0.1:3000/api/users">http://127.0.0.1:3000/api/users</a>
    2. Auth Api POST : <a href="http://127.0.0.1:3000/api/auth">http://127.0.0.1:3000/api/auth</a> #return token
    3. Other api : /genres, /customers, /rentals, /movies etc. #before add header token key=x-auth-token
    Example.
        - <a href="http://127.0.0.1:3000/api/genres">http://127.0.0.1:3000/api/genres</a>   
        - <a href="http://127.0.0.1:3000/api/customers">http://127.0.0.1:3000/api/customers</a>
        - <a href="http://127.0.0.1:3000/api/rentals">http://127.0.0.1:3000/api/rentals</a>
        - <a href="http://127.0.0.1:3000/api/movies">http://127.0.0.1:3000/api/movies</a>
</pre>

## Script data test

<pre>
    you can import collection data to mongoDB => resources/data/*.json
</pre>

## RESTful API Designing guidelines 

<p>
    <b>GET</b>      /api/genres
</p>
<p>
    <b>POST</b>     /api/genres
</p>
<p>
    <b>PUT</b>      /api/genres/:id
</p>
<p>
    <b>DELETE</b>   /api/genres/:id
</p>

## Recommend tools 

<pre>
    Call api <a href="https://www.getpostman.com/">Postman</a>
</pre>
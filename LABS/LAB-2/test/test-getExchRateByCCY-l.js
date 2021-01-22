/**
 * Test cases for testing  service-docday.js  class
 * Function: docGetDocStr 
 * 
 */
 
 
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();
var http = require('http');
const query = require('querystring');


const cfunc = require('../NbuServices/getExchRateByCCY');


describe('Testing NbuServices/getCurrentExchRate', function() {
  this.timeout(0);

  //before(done => { });
 
  it('test', function(done){
    console.log(cfunc);
    var l_prm= {
             "date": "2020-06-16",
             "valcode": "USD"
        };
    cfunc.main( l_prm  )
    .then (cf_res => {
       console.log( JSON.stringify( cf_res ));
       done();
    
    }) 
    .catch (err =>{
        console.log(err.message)
        done(err);
    });
    
  
  });  //it

  it('POST /login expect authorized', function(done){
    
    done();
  });  //it



  // end of test
  //after(done => {  });
});

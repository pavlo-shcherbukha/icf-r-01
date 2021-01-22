/**
 * Test cases 
 * Function: GetCustomerByPhone
 * 
 */
 
 
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();
var http = require('http');
const query = require('querystring');


const cfunc = require('../GetCustomerByPhone');


describe('Testing GetCustomerByPhone', function() {
  this.timeout(0);

  //before(done => { });
 
  it('test', function(done){
    console.log(cfunc);
    var l_prm= {
             "phone": "222-33-55"
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

  it('test', function(done){
    console.log(cfunc);
    var l_prm= {
             "phone": null
        };
    cfunc.main( l_prm  )
    .then (cf_res => {
       console.log( JSON.stringify( cf_res ));
       done();
    
    }) 
    .catch (err =>{
        console.log(err.message)
        done();
    });
    
  
  });  //it



  // end of test
  //after(done => {  });
});

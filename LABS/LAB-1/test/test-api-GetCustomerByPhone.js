/*
*
*/ 
 
 
const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();


var test_env_lr=true;
var i_host = 'https://b6dadcc6.us-south.apigw.appdomain.cloud/lab01/';
var i_url = '/customerbyphone';
var http = require('https');


describe('Test ICF API GW call', function() {
  let test_server;
  let app;
  this.timeout(0);

  before(done => {
        done();
  });
 


  it('Post' + i_url +' Expect response 200 postCustomerbyphone', function(done){
    //this.skip(); 

    
    var l_req={"phone": "222-33-44"};     
        
    if (test_env_lr) {
      console.log('Запрос: ');
      console.log( JSON.stringify(l_req) );
      console.log('Ответ: ');
    } 


    request( i_host )
    .post(i_url)
    .send( l_req )
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json')
    .expect(200)
    .end(function(err, res) {
        if (err) {
            console.log(err.message);
            done(err);
        } else {
          var lrsp = res.body;
          lrsp.should.have.property('cif');
          lrsp.should.have.property('cif_address');
          lrsp.should.have.property('cif_firstname');
          lrsp.should.have.property('cif_lasname');
          if (test_env_lr) {
            console.log(  JSON.stringify(res.body)  );
          }   
          done();
        }    
    });
  });  //it


  // end of test
  after(done => {
        done(); 
  });
});
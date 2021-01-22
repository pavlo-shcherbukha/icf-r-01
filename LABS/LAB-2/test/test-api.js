/** Тестирование вызовов к API */

var expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

var http = require('http');

const log4js = require('log4js');
const querystring = require('querystring');

/**==============================
* read env  variables
*================================
*/
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init('/config/mappings.json');

const lwa_apikey =  IBMCloudEnv.getString('WA_APIKEY');
const lwa_assistantid =  IBMCloudEnv.getString('WA_ASSISTANTID');
const lwa_url =  IBMCloudEnv.getString('WA_URL');
const lwa_apiver =  IBMCloudEnv.getString('WA_APIVER');
/**================================================*/


log4js.configure({
    appenders: { console: { type: 'console' } },
    categories: { default: { appenders: [ 'console' ], level: 'info' } }
});
const logger = log4js.getLogger('API-Assistant');
logger.level = process.env.LOG_LEVEL || 'info' ;

var i_assistant_id = lwa_assistantid;  ; 
var i_session_id = '';
var i_PORT = process.env.WA_ASSIST_BE_SERVICE_PORT || 3000 ;

// Testing API
describe('Testing Server', function() {
  let test_server;
  this.timeout(0);

  before(done => {
    console.log('Start Application');
    let app = require(process.cwd() + '/index');
    test_server = app.listen( i_PORT, done);
  });
  

    it('Simple Tests assert.typeOf', function( done) {
      assert.typeOf('a', 'string');
      done();
    });

    it('Health endpoint shows status up', function(done){
      var responseString = '';

      var options = {
        host: 'localhost',
        port: i_PORT,
        path: '/health'
      };

      var callback = function(response){
        response.on('data', function (chunk) {
          responseString += chunk;
        });

        response.on('end', function () {
          expect(responseString).to.equal('{"status":"UP"}');
          done();
        });
      };

      http.request(options, callback).end();
    });

    it('Assistant: Create Session', function(done){
      var responseString = '';

      var options = {
        host: 'localhost',
        port: i_PORT ,
        path: '/session'
      };

      var callback = function(response){
        response.on('data', function (chunk) {
          responseString += chunk;
        });

        response.on('end', function () {

          response.should.have.property('statusCode');
          response.should.have.property('statusMessage');
          assert.equal(200, response.statusCode);
          
          var reso = JSON.parse(responseString);
          reso.should.have.property('status');
          reso.should.have.property('statusText');
          reso.should.have.property('result');
          reso.status.should.equal(201);
          reso.statusText.should.equal('Created');
          expect( reso.result.session_id).to.be.a('string');

          i_session_id = reso.result.session_id ;

          logger.info("=========Create Session=====================");
          logger.info( reso.status );
          logger.info( reso.statusText );
          logger.info( reso.result );
          logger.info("===========================================");
          done();
        });
      };

      http.request(options, callback).end();
    });

    it('Assistant: Send message 1', function(done) {
      before(function() {
         // Пропускаем,  если сессия не была  создана
          if( i_session_id==='' ) {
            this.skip();
          } 
      });
      var responseString = '';
      
      // Структура сообщения 
      var xssn = {  assistant_id: i_assistant_id,
                    session_id: i_session_id,
                    text: ' my text',
                    context: '?'
                  } ;
      var data = querystring.stringify( xssn );   
  
      var options = {
          host: 'localhost',
          port: i_PORT,
          path: '/sendmsg',
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": data.length
          }      
      };
  
      var callback = function(response){
          response.on('data', function (chunk) {
              responseString += chunk;
          });
  
          response.on('end', function () {
            assert.equal(200, response.statusCode);

            var rspo = JSON.parse(responseString);
            rspo.should.have.property('status');
            rspo.should.have.property('statusText');
            rspo.should.have.property('result');
            rspo.status.should.equal(200);
            rspo.statusText.should.equal('OK');
            
             
            logger.info('============Send message 1==============================');
            logger.info('request = ' + xssn.text);
            logger.info('status = ' + rspo.status);
            logger.info('statusText = ' + rspo.statusText);
            logger.info('result = ' + JSON.stringify(rspo.result) );
            logger.info('');
            logger.info('=======================================================');
            
            done();
          });
      };
  
      var req = http.request(options, callback);
          req.on('error', function(e) {
          logger.info("Got error: " + e.message);
      });
      req.write(data);
      req.end();
    });

    it('Assistant: Send message 2', function(done) {
      before(function() {
         // Пропускаем,  если сессия не была  создана
          if( i_session_id==='' ) {
            this.skip();
          } 
      });
      var responseString = '';
      
      // Структура сообщения 
      var xssn = {  assistant_id: i_assistant_id,
                    session_id: i_session_id,
                    text: 'I want coffe',
                    context: '?'
                  } ;

      var data = querystring.stringify( xssn );   
  
      var options = {
          host: 'localhost',
          port: i_PORT,
          path: '/sendmsg',
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": data.length
          }      
      };
  
      var callback = function(response){
          response.on('data', function (chunk) {
              responseString += chunk;
          });
  
          response.on('end', function () {
            assert.equal(200, response.statusCode);

            var rspo = JSON.parse(responseString);
            rspo.should.have.property('status');
            rspo.should.have.property('statusText');
            rspo.should.have.property('result');
            rspo.status.should.equal(200);
            rspo.statusText.should.equal('OK');
            
             
            logger.info('============Send message 2==============================');
            logger.info('request = ' + xssn.text);
            logger.info('status = ' + rspo.status);
            logger.info('statusText = ' + rspo.statusText);
            logger.info('result = ' + JSON.stringify(rspo.result) );
            logger.info('');
            logger.info('=======================================================');
            
            done();
          });
      };
  
      var req = http.request(options, callback);
          req.on('error', function(e) {
          logger.info("Got error: " + e.message);
      });
      req.write(data);
      req.end();
    });
  
    it('Assistant: Send message 3', function(done) {
      this.skip();   
      before(function() {
         // Пропускаем,  если сессия не была  создана
          if( i_session_id==='' ) {
            this.skip();
          } 
      });
      var responseString = '';
      
      // Структура сообщения 
      //encodeURI(' Американо ')
      var xssn = {  assistant_id: i_assistant_id,
                    session_id: i_session_id,
                    text: 'Хочу Американо !',
                    context: '?'
                  } ;

      //logger.info( JSON.stringify( xssn ) );      
      var data = querystring.stringify(  xssn   );
     // var vv = JSON.parse(data);   
     // logger.info('Send message=' + data);
      var options = {
          host: 'localhost',
          port: i_PORT,
          path: '/sendmsg',
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": data.length
          }      
      };
  
      var callback = function(response){
          response.on('data', function (chunk) {
              responseString += chunk;
          });
  
          response.on('end', function () {
           
            assert.equal(200, response.statusCode);

            //var rspo = JSON.parse(responseString);
            rspo.should.have.property('status');
            rspo.should.have.property('statusText');
            rspo.should.have.property('result');
            rspo.status.should.equal(200);
            rspo.statusText.should.equal('OK');
            
             
            logger.info('============Send message 3==============================');
            logger.info(responseString);
            logger.info('request = ' + xssn.text);
            logger.info('status = ' + rspo.status);
            logger.info('statusText = ' + rspo.statusText);
            logger.info('result = ' + JSON.stringify(rspo.result) );
            logger.info('');
            logger.info('=======================================================');
            
            done();
          });
      };
  
      var req = http.request(options, callback);
          req.on('error', function(e) {
          logger.info("Got error: " + e.message);
      });
      req.write(data);
      req.end();
    });



    it('Assistant: Delete Session', function(done) {
      before(function() {
         // Пропускаем, удаление сессии, если она не создана
          if( i_session_id==='' ) {
            this.skip();
          } 
      });
      var responseString = '';
      
      // Структура для удаления сессии 
      var xssn = {
                    assistant_id: i_assistant_id, 
                    session_id: i_session_id 
                  } ;

      var data = JSON.stringify( xssn );   
  
      var options = {
          host: 'localhost',
          port: i_PORT,
          path: '/delsession',
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Content-Length": data.length
          }      
      };
  
      var callback = function(response){
          response.on('data', function (chunk) {
              responseString += chunk;
          });
  
          response.on('end', function () {
            assert.equal(200, response.statusCode);

            var rspo = JSON.parse(responseString);

            rspo.should.have.property('status');
            rspo.should.have.property('statusText');
            rspo.should.have.property('result');
            rspo.status.should.equal(200);
            rspo.statusText.should.equal('OK');
            i_session_id = '' ;
  
            logger.info('============Delete Session==============================');
            logger.info('status = ' + rspo.status);
            logger.info('statusText = ' + rspo.statusText);
            logger.info('result = ' + rspo.result);
            logger.info('');
            logger.info('=======================================================');
            
            done();
          });
      };
  
      var req = http.request(options, callback);
          req.on('error', function(e) {
          logger.info("Got error: " + e.message);
      });
      req.write(data);
      req.end();
    });


  after(done => {
    console.log('Stop Application');
    test_server.close(done);
    
  });


});

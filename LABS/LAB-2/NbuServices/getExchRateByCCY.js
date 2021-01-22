
/**
  *
  * main() will be run when you invoke this action
  *
  * Сервис получения  курса NBU за указанную дату по указанной валюте
  *
  * @see https://old.bank.gov.ua/control/uk/publish/article?art_id=38441973&cat_id=38459171#exchange
  *
  * @param {object} a_params - параметры запроса
  * @param {object} a_params.date - дата курса в формате YYYY-MM-DD
  * @param {object} a_params.valcode - кода валюты букв: USD, EUR
  *
  * Пример запроса:
  *
  * {
  *     "date": "2020-06-16",
  *     "valcode": "USD"
  * }
  * 
  *
  * @return {object} result
  * @return {boolean} result.ok  true-все хорошо, ищем rdata, 
  * @return {array} result.rdata
  * @return {string} result.rdata[i].cc код валюты буквенный: USD, EUR
  * @return {string} result.rdata[i].exchangedate  Дата курса в формате DD.MM.YYYY
  * @return {number} result.rdata[i].r030 код валюты цифровой 840, 987
  * @return {number} result.rdata[i].rate курс за единицу
  * @return {string} result.rdata[i].txt  название валюты текстовое
  *
  * Пример ответа:
  * {
  *   "ok": true,
  *   "rdata": [
  *     {
  *       "cc": "USD",
  *       "exchangedate": "16.06.2020",
  *       "r030": 840,
  *       "rate": 26.844,
  *       "txt": "Долар США"
  *     }
  *   ]
  * }
  * 
  * 
  * 
  * 
  *   
  */   
const axios = require('axios');

// Заголовки по умолчанию
const i_headers = { 'Content-Type': 'application/json',
		            'accept': 'application/json'
};
// url сервиса на получение  текущего курса  за дату по валюте
//             https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20200627&json          
const i_url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';

const i_logid = 'NbuServices/getCurrentExchRate: ';

function main(a_params) {
    var l_step='';
    l_step = i_logid + 'Старт';
    console.log(l_step);

    if ( !isDefined(a_params.date) ){
            var err = new Error(i_logid + 'Не передан параметр a_params.date  YYYY-MM-DD!') ;
            throw err;
    } else if ( !isDefined(a_params.valcode) ){
            var err = new Error(i_logid + 'Не передан параметр a_params.valcode  "USD, EUR, UAH...."!') ;
            throw err;
    }


    let l_reqparams = {  headers: i_headers };


    var l_dt = new Date(a_params.date);

    var l_exchdt = l_dt.toISOString().slice(0, 10).replace(/-/g, '');

    //var l_exchdt = l_dt.format("yyyymmdd");
    var l_url = i_url + '?'+'valcode='+a_params.valcode+'&'+'date='+l_exchdt+'&'+'json'
    
    l_step = i_logid + 'Вызываю сервис: [' + l_url + ']';
    console.log(l_step);    
    
    return  axios.get(l_url, l_reqparams)
	.then ( result_exch => {
	    if (result_exch.status === 200) {
	        l_step = i_logid + 'Сервис вернул успешный статус: [' + result_exch.status.toString() + ']';
            console.log(l_step);
	   } else {
	        l_step = i_logid + 'Сервис вернул статус - ошибку: [' + result_exch.status.toString() + ']';
            console.log(l_step);
            throw new Error(l_step);

	   } 
	   l_step = i_logid + 'Возвращаю ответ' ;
       console.log(l_step);
	   var result_ok={ ok: true,rdata: result_exch.data};
	   return Promise.resolve(   result_ok );
	   
	})
	.catch ( err => {
	    l_step = i_logid + 'Возвращаю ответ с ошибкой!' ;
        console.log(l_step);
	    var result_err={ ok: false, error: err ,rdata: null};
	    return Promise.reject(  result_err );
	})
}

	/**
	 * Проверяет, что переменная на undefined и не null
	 * если OK возвразает true, если не сложилось - false
	 * @param {any} p_value любая переменная
	 * @returns {boolean} l_result результат проверки переменной 
	 */
function isDefined(p_value) {
		let l_result = true ;
		if (typeof p_value === "undefined"){
			l_result=false;
		} else if ( p_value === null){
			l_result=false;
		} else {
			// do nothing
		};
		return l_result ;     
}

exports.main = main;



/**
  *
  * main() Будет запущена, когда активируется action
  * 
  *
  * @param {object} params Параметр, который принимает action  в виде json-обьекта
  * @param {string} params.phone - Номер телефона 
  *
  * @return {object} result - JSON обьект с параметрами клиента .
  *     @return {string} result.cif - Внутренний код клиента
  *     @return {string} result.cif_firstname - Имя клиента
  *     @return {string} result.cif_lastname - Фамилия клиента
  *     @return {string} result.cif_address - Адресс клиента
  */
function main(params) {
  //return { message: 'Hello World' };
  return new Promise (  (resolve, reject) => {
      setTimeout(() => {
          if ( !isDefined(params.phone) ){
              var err = new Error('Не передан параметр params.phone!') ;
              reject( err );
          } 
          else {  
              var result = {
                  cif: '100012340',
                  cif_firstname: 'Pavlo',
                  cif_lasname: 'Petrenko',
                  cif_address: 'Kyiv, Khreschatic, 26, flat 123'

              };
              resolve(result);
          }
      }, 1000);

  });
 
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
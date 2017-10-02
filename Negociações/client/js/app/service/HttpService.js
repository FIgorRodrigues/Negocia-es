class HttpService{

	get(url=''){

		return Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onreadystatechange = () => {

				if(xhr.readyState == 4 && xhr.status == 200 ){

					console.log(xhr.responseText);
					resolve(JSON.parse(xhr.responseText));
				}
				else{

					console.log(xhr.responseText);
					reject('Não foi possivel importar as negociações');
				}
			};
			xhr.send();
		});
	}
}
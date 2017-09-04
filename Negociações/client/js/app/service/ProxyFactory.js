class ProxyFactory{

	static create(objeto, propriedades, acao){

		return new Proxy(objeto,{

			get(target, prop, receiver){

				if(propriedades.includes(prop) && ProxyFactory._eFuncao(target[prop])){

					return function(){

						Reflect.apply(target[prop], target, arguments);
						return acao(target);
					}
				}

				return Reflect.get(target, prop, receiver);
			},

			set(target, prop, value, receiver){

				if(propriedades.includes(prop)){

					target.prop = value;
					acao(target);
				}

				return Reflect.set(target, prop, value, receiver);
			} 
		});

	}
	
	static _eFuncao(func){

		return typeof(func) == typeof(Function);
	}
}
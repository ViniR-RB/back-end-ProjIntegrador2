class AplicacaoError extends Error {
	constructor(massage: string) {
		super(massage);
	}
}


class ContaExistenteError extends AplicacaoError {
	constructor(massage: string) {
		super(massage);
	}
}
class ContaInexistenteError extends AplicacaoError{
    constructor(massage: string){
        super(massage)
    }
}
class PasswordIsNotMatch extends AplicacaoError{
    constructor(massage:string){
        super(massage);
    }
}
class JwtTokenInvalid extends AplicacaoError {
    constructor(massage:string){
        super(massage)
    }
}
class JwtNotFound extends AplicacaoError {
    constructor(massage:string) {
        super(massage)
    }
}



export { ContaExistenteError, AplicacaoError, ContaInexistenteError,PasswordIsNotMatch, JwtTokenInvalid, JwtNotFound}

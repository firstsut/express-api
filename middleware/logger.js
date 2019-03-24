function log(message = '',data = "",type = 'log'){
    switch(type){
        case "log":
            console.log('LOG : '+message,data || "")
            break;
        case "info" :
            console.info('INFO : '+message,data || "")
            break;        
        case "warn" :
            console.warn('WARN : '+message,data || "")
            break;
        case "trace" :
            console.trace('TRACE : '+message,data || "")
            break;
        case "error" :
            console.error('ERROR : '+message,data || "")
            break;
        default : 
            console.log('LOG : '+message,data || "")
            break;    
    }
    
}
module.exports = log;
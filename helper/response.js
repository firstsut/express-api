function errorResponse(data){
    console.log("ErrorResponse ... ",data);
    let response = "Internal Server Error...";    
     if(data){

        //Case model inValid        
        if(data.errors){
            let {errors} = data;
            response = [];
            for(let key in errors){
                response.push({
                    key : errors[key].path,
                    message : errors[key].message,
                });
            }           
        }

        //Case joi inValid
        else if(Array.isArray(data)){
            response = [];
            data.map(({message,path})=>{
                response.push({
                    key : path[0],
                    message : message,
                });
            })
        }else if(data !== "" && typeof data === "string"){
            response = data;
        }else if(typeof data === "object" && Object.keys(data).length > 0){
            response = data;
        }
        
    }
    return response;
}

module.exports = errorResponse;
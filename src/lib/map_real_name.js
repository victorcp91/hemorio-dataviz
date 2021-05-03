export function map_real_name(name){
    if(name.includes("_minus")){
      return name.replace("_minus", "-")
    }
    if(name.includes("_plus")){
      return name.replace("_plus", "+")
    }
    return name
}



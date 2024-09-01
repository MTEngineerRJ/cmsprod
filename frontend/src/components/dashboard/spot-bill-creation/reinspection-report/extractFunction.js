export const getExpandedData = (row,value,field)=>{
    if(String(field) === "description"){
        return {
            ...row,
            description : value
        }
    }
    if(String(field) === "bill_sr"){
        return {
            ...row,
            bill_sr : value
        }
    }
    if(String(field) === "qa"){
        return {
            ...row,
            qa : value
        }
    }
    if(String(field) === "qe"){
        return {
            ...row,
            qe : value
        }
    }
    if(String(field) === "estimate"){
        return {
            ...row,
            estimate : value
        }
    }
    if(String(field) === "assessed"){
        return {
            ...row,
            assessed : value
        }
    }
    if(String(field) === "remark"){
        return {
            ...row,
            remark : value
        }
    }
    if(String(field) === "sac"){
        return {
            ...row,
            sac : value
        }
    }
    if(String(field) === "gst"){
        return {
            ...row,
            gst : value
        }
    }
    if(String(field) === "type"){
        return {
            ...row,
            type : value
        }
    }

}

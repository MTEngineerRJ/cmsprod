


 const emailHandler=(val,inspectionType)=>{
    if(String(inspectionType).toLowerCase().includes("inspection")){
        return `
        1. Certificate of registration <br/>
        2. Aadhar Card <br/>
        3. Insurance policy <br/>
        4. Damage vehicle photographs/video <br/>
        5. Signature <br/>
        `
    }
    if(String(inspectionType).toLowerCase().includes("spot")){
        return `
        1. Driving licence  <br/>
        2. Certificate of Registration  <br/>
        3. Insurance policy <br/>
        4. Claim Form/Written Statements <br/>
        5. Damage vehicle photographs <br/>
        6. Aadhar card <br/>
        7. Pan card <br/>
        8. Fitness <br/>
        9. Permit <br/>
        10. Road Tax <br/>
        11. Load challan (if any) <br/>
        12. FIR/Police report (if any) <br/>
        `
    }

    if(val === 1){
        return `
        1. Driving Licence <br/>
        2. Certificate of registration <br/>
        3. Repair Estimate <br/>
        4. Claim form <br/>
        5. Insurance policy <br/>
        6. Damage vehicle photographs/video <br/>
        7. Aadhar Card <br/>
        8. Pan Card <br/>
        9. Cancel Cheque <br/>
        10. Satisfaction voucher <br/>
        11. Previous year policy <br/>
        12. Preinspection (if break in insurance) <br/>
        13. NCB confirmation <br/>
        `
    }
    return '';
}
module.exports = emailHandler;
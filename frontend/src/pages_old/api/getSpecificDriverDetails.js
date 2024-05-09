import axios from "axios";
 async function handler (request,response) {

    
  try {
    const token = request.headers.authorization;
    const domain = process.env.BACKEND_DOMAIN;
    const leadId = request.query.LeadId;

    console.log(leadId);


    const userResponse = await axios.get(`${domain}/driverDetails/getSpecificDriverDetails`,
    {
        headers: {
          Authorization:token,
          "Content-Type":"application/json"
        },
        params:{
            LeadId : leadId
        },
        timeout:30000,
        
      });
    const users = userResponse.data;


    return response.status(200).json({msg:"OK",data : users});
  } catch (err) {
    
    if (err.response) {
      // If the error is from an axios request (e.g., HTTP 4xx or 5xx error)
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.error(statusCode,axiosError.message); // Log the error for debugging

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      // Handle other types of errors
      return response.status(500).json({ error: "Internal Server Error" });
    }

  }
}
 
export default handler;


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://miamioh.instructure.com/api/v1/courses/79158/discussion_topics/",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer 1053~zZZ1cOaoEPq97H3BIPS9f9OdGiTh8UgTmtAKDISNr8olmUNN6Xx4H31iMuKiomrM",
    "User-Agent": "PostmanRuntime/7.18.0",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "10769049-a9ee-41ba-bd5b-63bbd295dc0f,7e8b05cd-3742-43a6-aa82-e6adedf8da86",
    "Host": "miamioh.instructure.com",
    "Accept-Encoding": "gzip, deflate",
    "Cookie": "_csrf_token=o2mhqCz3CiZJYqdLTLhBUqGLUoyqpDvR2pz9iie7VyDGLO3SW65AXAQN9AQr2QYwiuw3%2Bc%2FRQbWY6aXoY98Paw%3D%3D; log_session_id=db2b20441eedb8fb983ae8727b43929b; canvas_session=hUpOc_fxLn0Sw99Oy6qsKg.Zy4q4W8cYqOpACVR8Bw1UCgviRUhtMalaWxRES-gTkCZVzdwNYPcdykDmxn8xJInTALuFBcYvc-ojZt4xTRrzaVGwBAXQEROSH2LKxih_L1kaz1021gwYE6y1EmQcAVL._6poq7pTYui8ZvqnaMletNrSqz8.Xb8-cw",
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

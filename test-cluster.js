const axios=require('axios');

function callApi(){
for(let i=0;i<500;i++){
    axios.get('http://localhost:4000');
}
}
callApi();
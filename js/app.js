"use strict"

// AJAX => Asyncron JavaScript and XML
const firstSelectVal = document.querySelector("#Currencies1")
const secondSelectVal = document.querySelector("#Currencies2")
const firstInput = document.querySelector("#firstInput")
const secondInput = document.querySelector("#secondInput")
const changeBtn = document.querySelector(".changeBtn")

const usd = document.querySelector("#pusd")
const euro = document.querySelector("#peuro")
const rub = document.querySelector("#prub")
const gbr = document.querySelector("#pgbr")

function start(){
    //get data from db.json and calculate
    firstInput.addEventListener("input",function(event){
        const request = new XMLHttpRequest();  // XHR
        // 1) method, 2) url, 3) async, 4) username, 5) password
        request.open("GET","db/data.json")
        request.setRequestHeader("content-type", "application/json");
        request.send()
        // status, statusText, response, readyState
        request.addEventListener("readystatechange", () => {
            let text1 = firstSelectVal.value;
            let text2 = secondSelectVal.value;
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.response);
              
                secondInput.value = (
                    parseFloat(event.target.value) / parseFloat(data[text1][text2])
                ).toFixed(2);
            }
        })
    })
    //
    secondInput.addEventListener("input",function(event){
        const request = new XMLHttpRequest();  // XHR
        // 1) method, 2) url, 3) async, 4) username, 5) password
        request.open("GET","db/data.json")
        request.setRequestHeader("content-type", "application/json");
        request.send()
        // status, statusText, response, readyState
        request.addEventListener("readystatechange", () => {
            let text1 = secondSelectVal.value;
            let text2 = firstSelectVal.value;
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.response);
                
                firstInput.value = (
                    parseFloat(event.target.value) / parseFloat(data[text1][text2])
                ).toFixed(2);
            }
        })
    })
    //setting values of inputs to empty
    document.addEventListener("click", (e)=>{
        if(e.target.id === "btn"){
            return
        }
        firstInput.value = "";
        secondInput.value = "";

    });
    // changes values of select and input with each other
    changeBtn.addEventListener("click", ()=>{
        let sVal = firstSelectVal.value;
        let iVAl = firstInput.value

        firstSelectVal.value = secondSelectVal.value;
        secondSelectVal.value = sVal;
        firstInput.value = secondInput.value
        secondInput.value = iVAl
    });
    // gets values from db json and set (usd value ,euro value ...)
    window.addEventListener("load", (e)=>{
      
        const request = new XMLHttpRequest();
    
        request.open("GET","db/data.json")
        request.setRequestHeader("content-type", "application/json");
        request.send()

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.response);
              
                usd.textContent = data.amd.usd
                euro.textContent = data.amd.eur
                rub.textContent = data.amd.rub
                gbr.textContent = data.amd.gbr
            }
        })

    });
}

start()
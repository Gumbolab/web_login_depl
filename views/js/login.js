var login = window.document.getElementById('submit');
var error_user_name = document.getElementById('error');
var signup = document.getElementById('Sign-up');
var checkbox = document.getElementById('remeber_pw');
// try to get data from local staorage 
var user = JSON.parse(window.localStorage.getItem('user'));
// 
console.log(user);
document.getElementById("typing-user").value = user.mail;
document.getElementById("typing-pw").value = user.pw;

signup.onclick = () => {
        // window.location.href = '/html/signup.html';
        // alert("here");
        console.log("here ")
        location.replace("/html/signup.html");
}
function validateInput(userName) {
        if (userName === '') {
                error_user_name.innerHTML = 'please typing your user name or your mail';
                return Promise.resolve(true);// true if have error
        }
        error_user_name.innerHTML = '';
        return Promise.resolve(false);

}


function PostUserLoginData() {
        var thePostUrl = 'http://0.0.0.0:3000/users/1';
        var userName = document.getElementById("typing-user").value;
        var pw = document.getElementById("typing-pw").value;

        function callback(res) {
                console.log('hello');
                console.log(res);
                if (res == 'EXISTED') {
                        // alert(" succes login");
                        if (checkbox.checked) {
                                //local storage
                                localStorage.setItem('user', JSON.stringify({
                                        mail: userName,
                                        pw: pw
                                }));

                        }

                        console.log("well done");
                        // location.replace("./html/success.html");
                } else if (res == 'NOT FOUND') {
                        error_user_name.innerHTML = 'mail or pw wrong';
                }
        }


        validateInput(userName).then((ans) => {
                if (!ans) {
                        postHTTP(thePostUrl, callback);
                }
        })
        function postHTTP(theurl, callback) {
                var http = new XMLHttpRequest();// make new request
                http.onreadystatechange = function () {
                        if (http.readyState == 4 && http.status == 200) {
                                callback(http.response);
                        }
                }

                http.open('POST', theurl, true);// open channel for http transfer
                http.setRequestHeader('Content-Type', 'application/json');
                http.send(JSON.stringify({ mail: userName, pw: pw }));
                // console.log('warting for check mail is existed or not');
        }



}

login.addEventListener('click', PostUserLoginData);

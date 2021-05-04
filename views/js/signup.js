var login_nav = document.getElementById('lo-gin');
var create_acc = document.getElementById('signup');
login_nav.onclick = () => {
        // alert("everything done");
        location.replace("../index.html");
}
// LET CHECKING SYNTAX OF 


create_acc.addEventListener('click', CREATENEWACCOUNT);


function CREATENEWACCOUNT() {
        //muon create acc:
        /*
                1. checking syntax field 
                2.post to server
                    1. existed mail
                    2. no existed 
    
                    */
        var name = document.getElementById("typing-name").value;
        var pw = document.getElementById("typing-pw").value;
        var mail = document.getElementById('typing-mail').value;
        var theUrl = '/newuser';
        console.log(" start the function");
        function callback(res) {
                console.log(res);
                if (res == 'DONE') {

                        location.replace("./success.html");
                } else if (res == 'EXISTED') {
                        document.getElementById('error-mail').innerHTML = 'mail existed';

                }
        }//ending callback function


        validateSyntax(name, mail, pw).then((ans) => {
                console.log(ans);
                // true have error
                if (!ans) {
                        PostHttp(theUrl, callback);
                } else {
                        console.log("server still waiting");
                }

        }); // ending validate



        function PostHttp(theurl, callback) {
                var http = new XMLHttpRequest();// make new request
                http.onreadystatechange = function () {
                        if (http.readyState == 4 && http.status == 200) {
                                callback(http.response);
                        }
                }

                http.open('POST', theurl, true);// open channel for http transfer
                http.setRequestHeader('Content-Type', 'application/json');
                http.send(JSON.stringify({ name: name, mail: mail, pw: pw }));
                // console.log('warting for check mail is existed or not');

        }
}///ending createacc function

function validateSyntax(name, mail, pw) {
        var error_name;
        var error_mail;
        var error_pw;
        // var error_pw = false;
        if (name == '' || name.length > 15) {
                document.getElementById('error-name').innerHTML = 'Invalid username';
                error_name = true;

        } else {
                document.getElementById('error-name').innerHTML = '';
                if (function () {
                        const limit_char = '!@#$%^&*()- +';
                        for (var i = 0; i < limit_char.length; i++) {
                                if (name.includes(limit_char[i])) {
                                        document.getElementById('error-name').innerHTML = 'user name can not includes special character';
                                        return true;
                                }
                        } return false;

                }()) {
                        // document.getElementById('error-name').innerHTML='please choose another name';
                        // console.log("when name is wrong ");
                        error_name = true;

                } else {
                        document.getElementById('error-name').innerHTML = '';
                        error_name = false;
                }

        }



        if (mail == '') {
                error_mail = true;// have error
                document.getElementById('error-mail').innerHTML = 'Invalid mail';
        } else {
                if (mail.includes('@')) {
                        var index_first_acong = mail.indexOf('@');


                        document.getElementById('error-mail').innerHTML = '';
                        for (var i = index_first_acong + 1; i < mail.length; i++) {
                                console.log(i);

                                switch (true) {
                                        case i == index_first_acong + 1 && mail[i - 2] == '.':
                                                document.getElementById('error-mail').innerHTML = 'Invalid mail';
                                                error_mail = true;
                                                break;
                                        case mail[mail.length - 1] == '.':
                                                document.getElementById('error-mail').innerHTML = 'Invalid mail';
                                                error_mail = true;
                                                break;
                                        case '!@#$%%&*()_-+=,":;~`/<>'.includes(mail[i]):
                                                document.getElementById('error-mail').innerHTML = 'Invalid mail';
                                                error_mail = true;
                                                break;
                                        case mail[i] == '.' && mail[i - 1] == '.':
                                                document.getElementById('error-mail').innerHTML = 'Invalid mail';
                                                error_mail = true;
                                                break;
                                        default:
                                                error_mail = false;
                                                document.getElementById('error-mail').innerHTML = '';
                                                break;


                                }
                                if (error_mail) {
                                        break;
                                }

                        }//ending for   

                } else {
                        //if have no @ character
                        document.getElementById('error-mail').innerHTML = 'Invalid mail';
                        error_mail = true;
                        // console.log("have error mail");
                }
        }

        if (pw == '') {

                document.getElementById('error-pw').innerHTML = 'Invalid password';
                // return false;
                error_pw = true;;
        } else {
                document.getElementById('error-pw').innerHTML = '';
                error_pw = false;
        }

        if (error_name || error_pw || error_mail) {
                return Promise.resolve(true);////true have error
        } else {
                return Promise.resolve(false);///have no error
        }

}




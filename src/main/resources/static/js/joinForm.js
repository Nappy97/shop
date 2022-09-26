//-------- HTML 요소 셀렉팅 ---------//

const username = document.querySelector('#username');

const elFailureMessage = document.querySelector('.failure-message');
const elSuccessMessage = document.querySelector('.success-message');

const password = document.querySelector('#password');
const re_password = document.querySelector('#re_password');

const elRe_PWFailureMsg = document.querySelector('.mismatch-message');
const elRe_PWSuccessMsg = document.querySelector('.match-message');

const elPWFailureLeng = document.querySelector('.password-failure-length');
const elPWFailureComb = document.querySelector('.password-failure-comb');
const elPWFailureContn = document.querySelector('.password-failure-contn');
const elPWFailureUpper = document.querySelector('.password-failure-upper');
const elPWSuccessMessage = document.querySelector('.password-success-message');

const name1 = document.querySelector('#name');

const elIllegibleMessage = document.querySelector('.illegible-message');
const elReadableMessage = document.querySelector('.readable-message');

const elSubmitButton = document.querySelector('#subit-button');

//-------- 유효성 검사 ---------//

// { 아이디 } input 유효성 검사
function usernameFn() {
    if (isMoreThan4Length(username.value) && isUserNameChar(username.value)) {
        elSuccessMessage.classList.remove('hide');
        elFailureMessage.classList.add('hide')
    } else {
        elFailureMessage.classList.remove('hide');
        elSuccessMessage.classList.add('hide');
    }

    isSubmitButton();
}

username.addEventListener('click', usernameFn);
username.addEventListener('keyup', usernameFn);

// { 비밀번호 } input 유효성 검사
function passwordFn() {

    if (isMoreThan10Length(password.value)) {
        elPWFailureLeng.classList.add('hide');
    } else {
        elPWFailureLeng.classList.remove('hide');
    }


    if ((isPasswordEng(password.value) + isPasswordNum(password.value) + isPasswordSpeci(password.value) >= 2) &&
        (isPasswordBlank(password.value)) &&
        (isPasswordChar(password.value))
    ) {
        elPWFailureComb.classList.add('hide');
    } else {
        elPWFailureComb.classList.remove('hide');
    }

    if (isPasswordRepeat(password.value)) {
        elPWFailureContn.classList.remove('hide');
    } else {
        elPWFailureContn.classList.add('hide');
    }

    if ((isPasswordUpper(password.value))) {
        elPWFailureUpper.classList.add('hide');
    } else {
        elPWFailureUpper.classList.remove('hide');
    }

    if ((isMoreThan10Length(password.value)) &&
        (isPasswordEng(password.value) + isPasswordNum(password.value) + isPasswordSpeci(password.value) >= 2) &&
        (isPasswordChar(password.value)) &&
        (isPasswordBlank(password.value)) &&
        (!isPasswordRepeat(password.value)) &&
        ((isPasswordUpper(password.value)))
    ) {
        elPWSuccessMessage.classList.remove('hide');
    } else {
        elPWSuccessMessage.classList.add('hide');
    }

    isSubmitButton();
}

password.addEventListener('click', passwordFn)
password.addEventListener('keyup', passwordFn)
password.addEventListener('keyup', re_passwordFn)

// { 비밀번호 확인 } input 유효성 검사
function re_passwordFn() {
    if (isMatch(password.value, re_password.value) && isPasswordBlank(re_password.value)) {
        //console.log('두 비밀번호가 동일.');
        elRe_PWFailureMsg.classList.add('hide');
        elRe_PWSuccessMsg.classList.remove('hide');
    } else {
        //console.log('두 비밀번호가 다름');
        elRe_PWFailureMsg.classList.remove('hide');
        elRe_PWSuccessMsg.classList.add('hide');
    }

    isSubmitButton();
}

re_password.onclick = re_passwordFn;
re_password.onkeyup = re_passwordFn;


// 이름 유효성 검사
function name1Fn() {
    if (isName1Char(name1.value)) {
        elIllegibleMessage.classList.add('hide');
        elReadableMessage.classList.remove('hide');
    } else {
        elIllegibleMessage.classList.remove('hide');
        elReadableMessage.classList.add('hide');
    }

    isSubmitButton();
}

name1.addEventListener('click', name1Fn);
name1.addEventListener('keyup', name1Fn);


//-------- 최종 유효성 검사에서 사용하는 함수 ---------//

// 모든 조건이 충족되었는지 확인하는 함수
function isAllCheck() {
    console.log("validationstart");
    if (isMoreThan4Length(username.value) && isUserNameChar(username.value)) { // 아이디
        if ((isMoreThan10Length(password.value)) &&
            (isPasswordEng(password.value) + isPasswordNum(password.value) + isPasswordSpeci(password.value) >= 2) &&
            (isPasswordChar(password.value)) &&
            (isPasswordBlank(password.value)) &&
            (!isPasswordRepeat(password.value)) &&
            ((isPasswordUpper(password.value)))
        ) { // 비밀번호
            if (isMatch(password.value, re_password.value)) { // 비밀번호 확인
                //console.log('true!!');
                if (isName1Char(name1.value)) {
                    console.log("validationend");
                    return true;
                }
            }
        }
    } else {
        console.log('false!!');
        return false;
    }
}

// [회원가입 버튼] 배경 활성화 함수
function isSubmitButton() {
    if (isAllCheck()) {
        elSubmitButton.classList.add('allCheck');
    } else {
        elSubmitButton.classList.remove('allCheck');
    }
}

document.getElementById("registerForm").onsubmit = function() {
    if (isAllCheck()) {
        // document.getElementById("registerForm").submit();
        return true;

    } else {
        alert('모든 조건이 충족되어야합니다.');
        return false;
    }
};



//-------- 유효성 검사에서 사용하는 함수다 ---------//

// [아이디] 길이가 4자 이상이면 true를 리턴하는 함수
function isMoreThan4Length(value) {
    // 아이디 입력창에 사용자가 입력을 할 때
    // 글자 수가 4개이상인지 판단한다.
    // 글자가 4개 이상이면 success메세지가 보여야 한다.
    return value.length >= 4;
}

// [아이디] '영문, 숫자'만 있으면 true를 리턴하는 함수
function isUserNameChar(username) {
    var letters = /^[A-Za-z0-9]+$/;

    if (username.match(letters)) {
        return true;
    } else {
        return false;
    }
}

// [비밀번호] 길이가 10자 이상이면 true를 리턴하는 함수
function isMoreThan10Length(password) {
    return password.length >= 10;
}

// [비밀번호] 영문이 있으면 true를 리턴하는 함수
function isPasswordEng(password) {
    var letters = /[A-Za-z]/; // 잘 모르겠지만 이것은 정규표현식으로 AZ - az 모든 알파벳을 담고 있다.

    if (letters.test(password)) {  // 정규표현식에 영어문자가 모두 들었고. 정규표현식의 메소드인 test()로 비밀번호 문자에 영어가 있는지 판단한다.
        return true;
    } else {
        return false;
    }
}

// [비밀번호] 숫자가 있으면 true를 리턴하는 함수
function isPasswordNum(password) {
    var letters = /[0-9]/;

    if (letters.test(password)) {
        return true;
    } else {
        return false;
    }
}

// [비밀번호] 특수문자가 있으면 true를 리턴하는 함수
function isPasswordSpeci(password) {
    var letters = /[~!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]/;

    if (letters.test(password)) {
        return true;
    } else {
        return false;
    }
}

// [비밀번호][비밀번호 확인] 스페이스가 없을 경우 true를 리턴하는 함수
function isPasswordBlank(password) {
    if (password.search(/\s/) === -1) {
        return true;
    } else {
        return false;
    }
}

// [비밀번호] '영문, 숫자, 특수문자'만 있으면 true를 리턴하는 함수
function isPasswordChar(password) {
    var letters = /^[A-Za-z0-9~!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>\/?]+$/;

    if (password.match(letters)) {
        //console.log('가능한 것만 있네!');
        return true;
    } else {
        //console.log('안되는 것도 있네?');
        return false;
    }
}

// [비밀번호] 동일한 숫자 3개 이상 연속 사용하면 true를 리턴하는 함수
function isPasswordRepeat(password) {
    // password의 길이만큼 반복되는 반복문이 있어야 한다.
    // 문자 하나와 나 자신+1과 나자신 +2와 비교한다.
    // 숫자인지 아닌지 판단한다.숫자이면 true 아니면 false
    for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
            if (!isNaN(Number(password[i]))) {
                return true;
            }
        }
    }
    return false;
}

// [비밀번호] 영문자 중에 대문자 하나이상 포함되면 true를 리턴하는 함수
function isPasswordUpper(password) {
    var letters = /[A-Z]/;

    if (letters.test(password)) {
        return true;
    } else {
        return false;
    }
}

// [비밀번호 확인] 매치가 동일하면 true를 리턴하는 함수
function isMatch(password1, password2) {
    if (password1 && password2) {
        if (password1 === password2) {
            return true;
        }
    } else {
        return false;
    }
}

// 이름이 숫자가 들어간경우
function isName1Char(name1) {
    var letters = /^[가-힣]+$/;
    if (name1.match(letters)) {
        return true;
    } else {
        return false;
    }
}

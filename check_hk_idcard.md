var assert = require('assert');
describe('test', function() {
    it('coc', function() {
        var testCard01 = checkHKIDcard("AB987654(2)");
        assert(testCard01, true);

        var testCard02 = checkHKIDcard("G123456(A)");
        assert.equal(testCard02, true);

        var testCard03 = checkHKIDcard("L555555(0)");
        assert.equal(testCard03, true);

        var testCard04 = checkHKIDcard("C123456(9)");
        assert.equal(testCard04, true);

        var testCard05 = checkHKIDcard("AY987654(A)");
        assert.equal(testCard05, false);

    });
})


function checkHKIDcard(str) {
    var reg = /^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$/
    if(!str.match(reg)) return false;

    var temp = str.replace(/[\(\)]/g, '');

    var len = temp.length;
    var sum =  (len === 9)
                    ? 9 * (temp[0].charCodeAt() - 64) + 8 * (temp[1].charCodeAt() - 64)
                    : 8 * (temp[0].charCodeAt() - 64);

    var arr = temp.split('').reverse().join('').substr(1, 6);
    var arrResult = [2, 3, 4, 5, 6, 7];

    for(var i = 0; i< arr.length; i++) {
        sum += Number(arr[i]) * arrResult[i];
    }

    var mod = sum % 11;
    var lastCode = temp[len -1];
    if(mod === 0 && Number(lastCode) === 0 ) return true;

    var checkCode = 11 - mod;
    if(checkCode === 10 && lastCode === 'A') return true;

    if(checkCode > 0 && checkCode < 10 && Number(lastCode) === checkCode) return true;
    return false;
}
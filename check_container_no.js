/*
 集装箱校验码校验规则：

 集装箱号由4位公司代码和7位数字组成（如CBHU3202732），其中第七位数字就是校验码。首先将公司代码转换为数字，去掉11及其倍数，
 连加除以11，其余数为校验位。 A=10 B=12 C=13 D=14 E=15 F=16 G=17 H=18 I=19 J=20 K=21 L=23 M=24
 N=25 O=26 P=27 Q=28 R=29 S=30 T=31 U=32 V=34 W=35 X=36 Y=37 Z=38

 标准箱号构成基本概念：采用ISO6346（1995）标准。标准集装箱箱号由11位编码组成，包括三个部分：
 1、 第一部分由4位英文字母组成。前三位代码 (Owner Code) 主要说明箱主、经营人，第四位代码说明集装箱的类型。
 列如CBHU 开头的标准集装箱是表明箱主和经营人为中远集运。
 2、 第二部分由6位数字组成。是箱体注册码（Registration Code）, 用于一个集装箱箱体持有的唯一标识。
 3、 第三部分为校验码（Check Digit）由前4位字母和6位数字经过校验规则运算得到，用于识别在校验时是否发生错误。即第11位数字。
  根据校验规则箱号的每个字母和数字都有一个运算的对应值。箱号的前10位字母和数字的对应值从0到Z对应数值为0到38，11、22、33不能对11取模数，所以要除去。.
 2、第N位的箱号对应值再分别乘以2的（N－1）次方 （N＝1，2，3………..10）
 例如：箱号为CBHU3202732的集装箱它的第1位代码为C，
 它的代码值＝代码的对应值×2的（1－1）次方 ＝13×1＝13。
 类推第2位代码为B
 它的代码值＝代码的对应值×2的（2－1 ）次方＝12×2＝24 以此类推得到箱号前10位代码的代码值,
 将前10位的代码值乘积累加后对11取模箱号为CBHU3202732的集装箱前10位箱号的代码累加值＝4061，取11的模后为2，就是这个箱号第11位的识别码的数值。
 以此类推，就能得到校验码。

 */


function verityContainerNo(container_no) {

    if(typeof container_no !== 'string' || container_no === '') return false;

    container_no = container_no.toUpperCase();
    let reg = /[A-Z]{4}\d{7}/;
    if(!reg.test(container_no)) return false;

    let word = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 12,
        C: 13,
        D: 14,
        E: 15,
        F: 16,
        G: 17,
        H: 18,
        I: 19,
        J: 20,
        K: 21,
        L: 23,
        M: 24,
        N: 25,
        O: 26,
        P: 27,
        Q: 28,
        R: 29,
        S: 30,
        T: 31,
        U: 32,
        V: 34,
        W: 35,
        X: 36,
        Y: 37,
        Z: 38
    }

    let sum = 0;
    let num = 0;
    let len = container_no.length - 1;

    for(let i =0; i < len; i++) {
        num = Number(word[container_no[i]]) << i;
        sum += (num == 0) ? 0 : num ;
    }

    let check = Number(container_no.substr(-1));
    let result = sum % 11;
    result = (result === 10) ? 0 : result;

    return check === result;
}

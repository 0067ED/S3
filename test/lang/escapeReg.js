import escapeReg from 'third/lang/escapeReg';

describe('third/lang/escapeReg', function() {
    it('escapeReg(input)', function () {
        expect(escapeReg('.*+?^=!:${}()|[]\/\\-')).toBe('\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\]\\\/\\\\\\-');
        var reg = new RegExp('\\s([' + escapeReg('.*+?^=!:${}()|[]\/\\-') + '])\\s');
        expect(reg.test(' . ')).toBeTruthy();
        expect(reg.test(' * ')).toBeTruthy();
        expect(reg.test(' + ')).toBeTruthy();
        expect(reg.test(' ? ')).toBeTruthy();
        expect(reg.test(' ^ ')).toBeTruthy();
        expect(reg.test(' = ')).toBeTruthy();
        expect(reg.test(' ! ')).toBeTruthy();
        expect(reg.test(' : ')).toBeTruthy();
        expect(reg.test(' $ ')).toBeTruthy();
        expect(reg.test(' { ')).toBeTruthy();
        expect(reg.test(' } ')).toBeTruthy();
        expect(reg.test(' ( ')).toBeTruthy();
        expect(reg.test(' ) ')).toBeTruthy();
        expect(reg.test(' | ')).toBeTruthy();
        expect(reg.test(' [ ')).toBeTruthy();
        expect(reg.test(' ] ')).toBeTruthy();
        expect(reg.test(' \/ ')).toBeTruthy();
        expect(reg.test(' \\ ')).toBeTruthy();
        expect(reg.test(' - ')).toBeTruthy();
        expect(reg.test(' 1 ')).toBeFalsy();
    });
});

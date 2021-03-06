import on from 'third/event/on';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/event/on', function() {
    var test;
    var flag;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
        flag = false;
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('on(element, event, callback)', function () {
        var t = 1;
        runs(function () {
            on(test, 'click', function (e) {
                expect(e).not.toBeNull();
                t = 2;
                flag = true;
            });
            test.click();
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
        runs(function () {
            expect(t).toBe(2);
        });
    });
});

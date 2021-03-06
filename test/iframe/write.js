import createAnonymous from 'third/iframe/createAnonymous';
import write from 'third/iframe/write';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/iframe/write', function() {
    var html = '<div id="test">test</div>';
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('write(iframe, html, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = createIframe();
            write(iframe, html, function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                // use `window.window` instead of `window` to fixed fro IE8
                expect(getOwnerWindow(iframe)).toBe(window.window);
                expect(win.document).toBe(doc);
                expect(win).toBe(getWindow(iframe));
                expect(doc.getElementById('test')).not.toBeNull();
                expect(doc.getElementById('test').innerHTML).toBe('test');
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});

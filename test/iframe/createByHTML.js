import createByHTML from 'third/iframe/createByHTML';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/iframe/createByHTML', function() {
    var html = '<div id="test">test</div>';
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('createByHTML(html, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = createByHTML(html, function (win, doc) {
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

    it('createByHTML(html, callback, win)', function () {
        var t = 1;
        runs(function () {
            var contextIframe = createIframe();
            var contextWindow = getWindow(contextIframe);
            var iframe = createByHTML(html, function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getOwnerWindow(iframe)).toBe(contextWindow);
                expect(win.document).toBe(doc);
                expect(win).toBe(getWindow(iframe));
                expect(doc.getElementById('test')).not.toBeNull();
                expect(doc.getElementById('test').innerHTML).toBe('test');
                flag = true;
            }, contextWindow);
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});

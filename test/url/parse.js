import parse from 'third/url/parse';

describe('third/url/parse', function() {
    var DEFAULT_PORT_MAP = {
        ftp: 21,
        file: 0,
        gopher: 70,
        http: 80,
        https: 443,
        ws: 80,
        wss: 443
    };
    var thisPorotocol = location.protocol;
    var thisPort = location.port;
    var _port = (DEFAULT_PORT_MAP[thisPorotocol] == thisPort) ? '' : (':' + thisPort);
    var thisHostname = location.hostname;
    var thisHost = thisHostname + _port;
    var thisOrigin = location.protocol + '//' + thisHost;

    it('parse(absoluteUrl)', function () {
        var url = parse('wss://example.com');
        expect(url.origin).toBe('wss://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/');
        expect(url.port).toBe('443');
        expect(url.protocol).toBe('wss:');
        expect(url.search).toBe('');
        expect(url.hash).toBe('');
        expect(url.href).toBe('wss://example.com/');
        var url = parse('https://example.com:80/books/123/?a=1&b=3#hashid');
        expect(url.origin).toBe('https://example.com:80');
        expect(url.host).toBe('example.com:80');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/123/');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('https:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe('https://example.com:80/books/123/?a=1&b=3#hashid');
        var url = parse('https://example.com/books/123/?a=1&b=3#hashid');
        expect(url.port).toBe('443');
        var url = parse('http://example.com/books/123/?a=1&b=3#hashid');
        expect(url.port).toBe('80');
        expect(url.href).toBe('http://example.com/books/123/?a=1&b=3#hashid');
        var url = parse('https://example.com:8000/books/123/?a=1&b=3#hashid');
        expect(url.hostname).toBe('example.com');
        var url = parse('ws://example.com/books/123?a=1&b=3#hashid');
        expect(url.port).toBe('80');
        expect(url.host).toBe('example.com');
        expect(url.pathname).toBe('/books/123');
        expect(url.search).toBe('?a=1&b=3');
    });

    it('parse(\'books/123/?a=1&b=3#hashid\')', function () {
        var url = parse('books/123/?a=1&b=3#hashid');
        expect(url.origin).toBe(thisOrigin);
        expect(url.host).toBe(thisHost);
        expect(url.hostname).toBe(thisHostname);
        expect(url.pathname).toBe('/books/123/');
        expect(url.port).toBe(thisPort);
        expect(url.protocol).toBe(thisPorotocol);
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe(thisOrigin + '/books/123/?a=1&b=3#hashid');
    });

    it('parse(\'./books/123/?a=1&b=3#hashid\')', function () {
        var url = parse('./books/123/?a=1&b=3#hashid');
        expect(url.origin).toBe(thisOrigin);
        expect(url.host).toBe(thisHost);
        expect(url.hostname).toBe(thisHostname);
        expect(url.pathname).toBe('/books/123/');
        expect(url.port).toBe(thisPort);
        expect(url.protocol).toBe(thisPorotocol);
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe(thisOrigin + '/books/123/?a=1&b=3#hashid');
    });

    it('parse(\'../1?a=1&b=3#hashid\', \'http://example.com/books/123/\')', function () {
        var url = parse('../1?a=1&b=3#hashid', 'http://example.com/books/123/');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/1');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe('http://example.com/books/1?a=1&b=3#hashid');
    });

    it('parse(\'../../1?a=1&b=3#hashid\', \'http://example.com/books/love/123\')', function () {
        var url = parse('../../1?a=1&b=3#hashid', 'http://example.com/books/love/123/');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/1');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe('http://example.com/books/1?a=1&b=3#hashid');
    });

    it('parse(\'?a=1&b=3#hashid\', \'http://example.com\')', function () {
        var url = parse('?a=1&b=3#hashid', 'http://example.com');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe('http://example.com/?a=1&b=3#hashid');
    });

    it('parse(\'#hashid\', \'http://example.com/books/123\')', function () {
        var url = parse('#hashid', 'http://example.com/books/123');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/123');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('');
        expect(url.hash).toBe('#hashid');
        expect(url.href).toBe('http://example.com/books/123#hashid');
    });

    it('parse(\'.\', \'http://example.com/books/123\')', function () {
        var url = parse('.', 'http://example.com/books/123');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('');
        expect(url.hash).toBe('');
        expect(url.href).toBe('http://example.com/books/');
    });

    it('parse(\'.\', \'http://example.com/books/123/\')', function () {
        var url = parse('.', 'http://example.com/books/123/');
        expect(url.origin).toBe('http://example.com');
        expect(url.host).toBe('example.com');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/123/');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('http:');
        expect(url.search).toBe('');
        expect(url.hash).toBe('');
        expect(url.href).toBe('http://example.com/books/123/');
    });

    it('parse(relativeUrl, baseUrl)', function () {
        var url = parse('books/123/?a=1&b=3#hashid', 'https://example.com/user/123/');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/user/123/books/123/');
        expect(url.port).toBe('443');
        expect(url.protocol).toBe('https:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.href).toBe('https://example.com/user/123/books/123/?a=1&b=3#hashid');

        var url = parse('../../books/123/?a=1&b=3#hashid', 'https://example.com/user/123/');
        expect(url.hostname).toBe('example.com');
        expect(url.pathname).toBe('/books/123/');
        expect(url.port).toBe('443');
        expect(url.protocol).toBe('https:');
        expect(url.search).toBe('?a=1&b=3');
        expect(url.href).toBe('https://example.com/books/123/?a=1&b=3#hashid');
    });
});

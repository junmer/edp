/**
 * @file devServer默认配置
 * @author otakustay[otakustay@live.com], 
 *         errorrik[errorrik@gmail.com]
 * @module lib/webserver/conf
 */

exports.port = 80;

exports.documentRoot = process.cwd();
exports.getLocations = function () {
    return [
        { 
            location: '/', 
            handler: home( 'index.html' )
        },
        { 
            location: /^\/redirect-local/, 
            handler: redirect('redirect-target', false) 
        },
        { 
            location: /^\/redirect-remote/, 
            handler: redirect('http://www.baidu.com', false) 
        },
        { 
            location: /^\/redirect-target/, 
            handler: content('redirectd!') 
        },
        { 
            location: '/empty', 
            handler: empty() 
        },
        { 
            location: /\.less$/, 
            handler: [
                file(),
                less()
            ]
        },
        { 
            location: /^.*$/, 
            handler: file()
        }
    ];
};

exports.injectRes = function ( res ) {
    for ( var key in res ) {
        global[ key ] = res[ key ];
    }
};

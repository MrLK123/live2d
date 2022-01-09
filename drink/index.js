


!async function () {
    var fileName = "95type_405/95type_405.model.json";
    function injectCustomJs (jsPath, cb) {
        var temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        temp.src = chrome.runtime.getURL(jsPath);
        temp.onload = function () {
            this.parentNode.removeChild(this);
            cb && cb();
        };
        document.head.appendChild(temp);
    };
    function addNewStyle (newStyle) {
        var styleElement = document.getElementById('styles_js');

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }

        styleElement.appendChild(document.createTextNode(newStyle));
    }
    function setupCanvasPanel () {
        var canvas = document.createElement('canvas');
        canvas.id = "live2d";
        canvas.width = 400;
        canvas.height = 500;
        canvas.style.width = '400px';
        canvas.style.height = '500px';
        canvas.style.position = "fixed";
        canvas.style.zIndex = 9999;
        canvas.style.right = '0px';
        canvas.style.bottom = '-10px';
        canvas.style.pointerEvents = 'none';
        canvas.style.filter = 'drop-shadow(0px 10px 10px #ccc)';
        document.body.appendChild(canvas);

        // 提醒文案
        var panel = document.createElement('div');
        panel.id = 'textOut';
        panel.style.position = "fixed";
        panel.style.zIndex = 9999;
        panel.style.right = '80px';
        panel.style.bottom = '450px';
        panel.style.width = '200px';
        panel.style.height = 'auto';
        // panel.style.pointerEvents='none';
        panel.style.cursor = "pointer";
        panel.style.display = 'flex';
        panel.style.flexDirection = 'column';
        panel.style.alignItems = 'start';
        document.body.appendChild(panel);
        addNewStyle(`
        .chatLine {
           padding:5px 10px;
           color:#fff;
           background:rgba(0,0,0,.3);
           border-radius:14px;
        }
        .chatLine>div:nth-child(2) {
           display:none;
        }
        .chatLine>div:nth-child(1) {
           color:#fff;
        }
        .chatLine:hover>div:nth-child(1) {
           color:#d8d8d8;
        }
        .chatLine:hover>div:nth-child(2) {
           display:block;
        }
     `);
    }
    function timeoutTask () {
        let timer;
        function fn () {
            if (new Date().getMinutes() === 0) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', 'https://api.btstu.cn/yan/api.php', true)
                xhr.send()
                xhr.onreadystatechange = function () {
                    if (xhr.status === 200 && xhr.readyState == 4) {
                        const textOut = document.getElementById('textOut');
                        textOut.innerHTML = '<div class="chatLine">同学:多喝热水!<br/>' + xhr.response + '<div>';
                    }
                }
            } else {
                timer = setTimeout(fn, 60000)
            }
        }
        timer = setTimeout(fn, 60000);

    }
    function addEvent () {
        const textOut = document.getElementById('textOut');
        textOut.addEventListener('click', () => {
            textOut.innerHTML = '';
            timeoutTask();
        })
    }
    injectCustomJs('./live2d-mini.js', async function () {

        setupCanvasPanel();
        injectCustomJs('./render.js');
        timeoutTask();
        addEvent();
    });
}()
var iframe = document.getElementsByTagName('iframe')[0];
function load(e) {
    if(e.keyCode == 13){
        loadURL(document.getElementById("dark-url").value);
        
        return false;
    }
}
var loadURL = function (src) {
    url = src;
    var script = document.createElement('script');
    script.src = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22' + encodeURIComponent(url) + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData';
    document.body.appendChild(script);
};
var getData = function (data) {
    if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200) loadHTML(data.query.results.resources.content);
    else if (data && data.error && data.error.description) loadHTML(data.error.description);
    else loadHTML('Error: Cannot load ' + url);
};
var loadHTML = function (html) {
    iframe.src = 'about:blank';
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html.replace(/<head>/i, '<head><base href="' + url + '"><scr' + 'ipt>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { e.preventDefault(); parent.loadURL(e.target.href); } });</scr' + 'ipt>'));
    iframe.contentWindow.document.close();
};

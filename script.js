var iframe = document.getElementsByTagName('iframe')[0];

var enterPressed = function(e){
    if(e.keyCode == 13){
        load();
        return false;
    }
};
var load = function(){
    var url = document.getElementById("dark-url").value;
    if(url.length>0){
        loadURL(url);
    }
};
var loadURL = function(src){
    url = src;
    var script = document.createElement('script');
    script.src = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20data.headers%20where%20url%3D%22' + encodeURIComponent(url) + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=getData';
    document.body.appendChild(script);
};
var getData = function(data){
    if (data && data.query && data.query.results && data.query.results.resources && data.query.results.resources.content && data.query.results.resources.status == 200) loadHTML(data.query.results.resources.content);
    else if (data && data.error && data.error.description) loadHTML(data.error.description);
    else loadHTML('Sorry! Cannot load ' + url + '.');
};
var loadHTML = function(html){
    iframe.src = 'about:blank';
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html.replace(/<head>/i, 
        '<head><base href="' + url + '">' +
        '<script>document.addEventListener("click", function(e) { if(e.target && e.target.nodeName == "A") { e.preventDefault(); parent.loadURL(e.target.href); } });</script>' +
        '<style>img{filter:invert(1);-webkit-filter:invert(1);}</style>'));
    iframe.contentWindow.document.close();
};
var getParameter = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

var urlParameter = getParameter('url');
if(urlParameter && urlParameter.length>0){
    document.getElementById("dark-url").value = urlParameter;
    load();
}else{
    iframe.src="javascript:'<h1><a href=\"https://github.com/MinhasKamal/DarkLight\" target=\"_blank\">DarkLight</a></h1>"+
    "<p>For viewing a page in night mode- paste the link in the URL box & press enter.</p>"+
    "<p>The page may be loaded slowly, so please be patient. If the website does not allow framing (like- StackOverflow, GitHub), then the page will not load.</p>"+
    "<p>You can also create night mode link for any webpage- <br /> &nbsp;&nbsp;&nbsp; https://minhaskamal.github.io/DarkLight/?url=[your-webpage-link] <br /> &nbsp;&nbsp;&nbsp; Example: <a href=\"https://minhaskamal.github.io/DarkLight/?url=https://news.ycombinator.com\" target=\"_blank\">https://minhaskamal.github.io/DarkLight/?url=https://news.ycombinator.com</a></p>'";

}
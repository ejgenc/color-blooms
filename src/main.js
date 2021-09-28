console.log("JS script loaded successfully!")

var getMaxSizeOfSquaresInRect = function(n,w,h) 
{
    var sw, sh;
    var pw = Math.ceil(Math.sqrt(n*w/h));
    if (Math.floor(pw*h/w)*pw < n) sw = h/Math.ceil(pw*h/w);
    else sw = w/pw;
    var ph = Math.ceil(Math.sqrt(n*h/w));
    if (Math.floor(ph*w/h)*ph < n) sh = w/Math.ceil(w*ph/h);
    else sh = h/ph;
    return Math.max(sw,sh);
}
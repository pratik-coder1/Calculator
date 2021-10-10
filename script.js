var val=document.getElementById("expression");
function addToExpression(event,value)
{
    if(value.toString().match(/[/*%^+-]/))
    {
        if(checkLeftSide()===false)
            return;
    }
    val.innerHTML+=String(value);
}
function clearExp(event)
{
    console.log(val);
    val.innerHTML="";
}
function checkLeftSide( )
{
    var exp=val.innerHTML;
    if(exp===null || exp==="")
    {
        alert(" cant append symbol to empty string")
        return false;
    }
    var len=exp.toString().length;
    var lastsymbol=exp.toString().slice(-1);
    if( lastsymbol.match(/[+-/*^%]/))
    {
        alert("cannot have symbol next to a symbol");
        return false;
    }
    return true;

}
function evaluateExp(event,doc) {
    if(val.innerHTML===null || val.innerHTML==="")
        return ;
    var tokens=String(val.innerHTML).toLocaleLowerCase().match(/[^\d()]+|[\d.]+/g);
    var operators=new Array();
    var operands=new Array();
   function tokenizer(element)
    {
        if( element.match(/[+-/*^%]/))
            operators.push(element);
        else
            operands.push(element);
    }
    tokens.forEach(tokenizer);
    console.log("tokens",tokens);
    function precedence(ch) {
     if( ch==="+"|| ch==="-")
                return 1;
     if( ch=== "*"|| ch==="/"||ch==="%")
                return 2;
if( ch==='^')
                return 3;
return -1;
    }
    var output=new Array();
    var stack=new Array();
    for( i=0;i<tokens.length;i++)
    {
        var ch=tokens[i];
        console.log(ch+" "+precedence(ch));
        if( precedence(ch)===-1)
        {
            output.push(ch);
            console.log("stack cur", stack);
            console.log("output cur", output);
        }
        else {
            if (stack.length === 0) {
                stack.unshift(ch);
                console.log("stack cur", stack);
                console.log("output cur", output);
            }
            else {
                var top = stack.slice(0, 1)[0];
                console.log("top is ",top);
                while (stack.length > 0 && precedence(top)>=precedence(ch)) {
                    output.push(stack.shift());
                    top=stack.slice(0,1)[0];
                }
                stack.unshift(ch);
                console.log("stack cur", stack);
                console.log("output cur", output);
            }
        }

    }
    while(stack.length>0)
    {
        output.push(stack.shift());
    }
    console.log("output is ", output);
    var compute=new Array();
    compute.unshift(output.shift());
    while(output.length>0)
    { console.log(compute);
        var e1=output.shift();
        console.log(e1);
        if(e1.match(/[+-/%^*]/))
        {

            var a2=Number(compute.shift());
            var a1=Number(compute.shift());

            if( e1==='+')
                compute.unshift(a1+a2);
            if( e1==='-')
                compute.unshift(a1-a2);
            if( e1==='/')
                compute.unshift(a1/a2);
            if( e1==='*')
                compute.unshift(a1*a2);
            if( e1==='^')
                compute.unshift(a1**a2);
            if( e1==='%')
                compute.unshift(a1%a2);
        }
        else
            compute.unshift(e1);

    }
   var finalans=compute.shift();
    console.log(finalans);
    document.getElementById("prev-expression").innerHTML=val.innerHTML;
    val.innerHTML=finalans;
}


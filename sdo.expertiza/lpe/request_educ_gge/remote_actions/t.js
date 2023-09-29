function include(ts, p) {
    var mc;
    try {
        mc = TopElem.script;
    } catch (e) {
        try {
            te = tools.open_doc(p.id).TopElem;
            if (p.to == 'server_agent') mc = te.run_code;
            else throw 'unknown object in params: ' + p.to;
        } catch (e) {
            throw "TopElem or self_id not found!";
        }
    }
    mc += '';
    if (!IsArray(ts)) ts = [ts];
    var c = "";
    for (t in ts) c += '\n' + ld(t);
    c += '\n' + cmc(mc);
    try {
        tools.safe_execution(c);
    } catch (e) {
        eval(c);
    }
    return false;
}

function ld(tc) {
    curActiveWebTemplate = null;
    var es = tools_web.insert_custom_code(tc, null, false, true);
    es = StrRightRangePos(es, es.indexOf('\<\%') + 2);
    es = StrLeftRange(es, es.indexOf('\%\>'));
    return es;
}

function cmc(c) {
    var x = 'if (inc' + 'luded)';
    var i = c.indexOf(x);
    if (i < 0) throw '"' + x + '" not found in the main code!';
    var cc = StrRightRangePos(c, i);
    cc = StrReplaceOne(cc, x, 'if (true)');
    return cc;
}

included = include('server_functions', {to: 'server_agent', id: 7140255621678765675});

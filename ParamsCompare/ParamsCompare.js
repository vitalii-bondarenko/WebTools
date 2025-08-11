var DataflashParser;
const import_done = import('../modules/JsDataflashParser/parser.js').then(mod => { DataflashParser = mod.default });

let paramsA = {};
let paramsB = {};

async function readFile(input, side) {
    const file = input.files[0];
    if (!file) { return; }
    if (file.name.toLowerCase().endsWith('.bin')) {
        await import_done;
        const buffer = await file.arrayBuffer();
        let log = new DataflashParser();
        log.processData(buffer, []);
        if (!("PARM" in log.messageTypes)) {
            alert("No params in log");
            return;
        }
        const PARM = log.get("PARM");
        let params = {};
        for (let i = 0; i < PARM.Name.length; i++) {
            params[PARM.Name[i]] = PARM.Value[i];
        }
        setParams(side, params);
    } else {
        const text = await file.text();
        document.getElementById(side === 'A' ? 'textA' : 'textB').value = text;
        setParams(side, parseParamText(text));
    }
    updateDiff();
}

function readText(text, side) {
    setParams(side, parseParamText(text));
    updateDiff();
}

function setParams(side, params) {
    if (side === 'A') {
        paramsA = params;
    } else {
        paramsB = params;
    }
}

function parseParamText(text) {
    const params = {};
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
        const parts = line.trim().split(/[\s,=\t,]+/);
        if (parts.length >= 2) {
            const value = parseFloat(parts[1]);
            if (!isNaN(value)) {
                params[parts[0]] = value;
            }
        }
    }
    return params;
}

function updateDiff() {
    const tbody = document.getElementById('diff');
    tbody.innerHTML = '';
    const keys = new Set([...Object.keys(paramsA), ...Object.keys(paramsB)]);
    const sorted = Array.from(keys).sort((a, b) => a.localeCompare(b));
    for (const key of sorted) {
        const valA = paramsA[key];
        const valB = paramsB[key];
        const tr = document.createElement('tr');
        if (valA !== valB) {
            tr.style.backgroundColor = '#ffdddd';
        }
        const valAstr = valA === undefined ? '' : param_to_string(valA);
        const valBstr = valB === undefined ? '' : param_to_string(valB);
        tr.innerHTML = `<td style="padding:2px 6px;">${key}</td><td style="padding:2px 6px;">${valAstr}</td><td style="padding:2px 6px;">${valBstr}</td>`;
        tbody.appendChild(tr);
    }
}


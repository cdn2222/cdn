function copythis(text) {
    // Create a temporary element
    var tempElement = document.createElement('textarea');
    tempElement.value = text;

    // Append the temporary element to the DOM
    document.body.appendChild(tempElement);

    // Select the text in the temporary element
    tempElement.select();
    tempElement.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary element
    document.body.removeChild(tempElement);
}


function apply_action(gid, action, lid) {

    const postData = {
        gid: gid,
        action: action,
    };

    axios.post('/actions/js_action', postData, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 3600000,
    })
        .then(response => {
            addFloatingAlert(response.data.data);
            light_text(lid, action);
        })
        .catch(error => {
            addFloatingAlert(error)
        });
}


function entry_action(gid, min_id, by_id, entry_id, lid) {

    const postData = {
        gid: gid,
        min: document.getElementById(min_id).value,
        by: document.getElementById(by_id).value,
        entry: document.getElementById(entry_id).value,
    };

    axios.post('/actions/entry_action', postData, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 3600000,
    })
        .then(response => {
            light_text(lid, response.data.data);
        })
        .catch(error => {
            light_text(lid, error);
        });
}

function save_matcher_action(rid, slug, value_id, lid, network, symbol) {

    const postData = {
        rid: rid,
        slug: slug,
        base_slug: document.getElementById(value_id).value,
        network: network,
        symbol: symbol,
    };

    axios.post('/actions/save_matcher_action', postData, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 3600000,
    })
        .then(response => {
            light_text(lid, response.data.data,response.data.color,);
        })
        .catch(error => {
            light_text(lid, error);
        });
}

function fetch_deals(network, profit_id, min_profit_id, entry_id, type) {

    const postData = {
        network: network,
        profit: document.getElementById(profit_id).value,
        min_profit: document.getElementById(min_profit_id).value,
        entry: document.getElementById(entry_id).value,
        type: type,
    };
    addFloatingAlert("loading " + network);

    axios.post('/actions/fetch_deals', postData, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 3600000,
    })
        .then(response => {
            addFloatingAlert(response.data.data);
        })
        .catch(error => {
            addFloatingAlert(error)
        });
}
function refresh_chains() {
    addFloatingAlert("refreshing chains loading" );

    axios.post('/actions/refresh_chains', {}, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 3600000,
    })
        .then(response => {
            addFloatingAlert(response.data.data);
        })
        .catch(error => {
            addFloatingAlert(error)
        });
}


function do_command(command) {
    const postData = {
        command: command
    };
    addFloatingAlert("loading command " + command);

    axios.post('/do_command', postData, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 3600000,
    })
        .then(response => {
            addFloatingAlert(response.data.data);
        })
        .catch(error => {
            addFloatingAlert(error)
        });
}

function swap_price(by, type, chain, outToken, price, entry, gid,oid) {

    const postData = {
        by: by,
        type: type,
        chain: chain,
        outToken: outToken,
        price: price,
        entry: entry,
        gid: gid,
        oid: oid,
    };

    axios.post('/actions/swap_price', postData, {
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 3600000,
    })
        .then(response => {
            addFloatingAlert(response.data.data);
        })
        .catch(error => {
            addFloatingAlert(error)
        });
}

function hideFloatingAlert() {
     document.getElementById('floatingAlert')?.remove();
}
function addFloatingAlert(txt) {
    // Check if the floating div already exists
    const existingDiv = document.getElementById('floatingAlert');

    if (existingDiv) {
        existingDiv.innerHTML = txt;
    } else {
        // If the div doesn't exist, create a new one and append it to the body
        const div = document.createElement('div');
        div.id = 'floatingAlert';
        div.style.position = 'fixed';
        div.style.bottom = '0%';
        div.style.left = '50%';
        div.style.backgroundColor = 'black';
        div.style.fontSize = '16px';
        div.style.paddingLeft = '10px';
        div.style.paddingRight = '10px';
        div.style.overflow = 'auto';
        div.style.resize = 'both';

        div.style.height = '300px';
        div.style.maxHeight = '300px';
        div.style.minHeight = '80px';

        div.style.width = '755px';
        div.style.maxWidth = '755px';
        div.style.minWidth = '200px';

        div.style.transform = 'translate(-50%, -5%)';

        div.innerHTML = txt;
        document.body.appendChild(div);
    }
}

function light_text(lid, action,color="red") {
    const dv = document.getElementById(lid);
    dv.style.backgroundColor = color;
    dv.textContent = action;
}

function open_new_tab(location) {
    const url = window.location.origin + location;
    window.open(`${url}`, '_blank');
}
function open_url(url) {
    window.open(`${url}`, '_blank');
}

function find_in_new_tab(gid) {
    const currentDomain = window.location.origin;
    window.open(`${currentDomain}/find?pair=${gid}`, '_blank');
}

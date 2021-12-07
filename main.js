const resultTag = document.getElementById("result");
const textArea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");

// TODO: Write your codes here

function onToggleObj(e) {
    if (e.target.classList.contains("json-viewer-object-start")) {
        e.target.classList.toggle("json-viewer-object-close")
    }
}

function JSONBeautifuler(data) {
    let rootElement = document.createElement('ul')
    render(rootElement, data)
    rootElement.addEventListener('click', onToggleObj)
    return rootElement
}

submitBtn.addEventListener("click", function () {
    resultTag.innerHTML = null
    try {
        textArea.classList.remove('has-error')
        resultTag.appendChild(JSONBeautifuler(JSON.parse(textArea.value)))
    } catch (e) {
        textArea.classList.add('has-error')
    }
})


let data = {
    "Fish": {
        "Trout": {},
        "salmon": {}
    },
    "tree": {
        "Huge": {
            "sequoia": {},
            "oak": {}
        },
        "Flowering": {
            "apple tree": {},
            "magnolia": {
                'new': {
                    'new': {
                        'new': {
                            'new': 'new',
                            'new2': 'new2',
                            'new3': 'new3'
                        }
                    }
                }
            }

        }
    }
}


function createTree(container, obj) {
    container.append(createTreeDom(obj));
}

function createTreeDom(obj) {
    if (!Object.keys(obj).length) return;

    let ul = document.createElement('ul');

    for (let key in obj) {
        let li = document.createElement('li');
        li.innerHTML = key;

        if (typeof obj[key] === 'object') {
            let childrenUl = createTreeDom(obj[key]);
            if (childrenUl) {
                li.append(childrenUl);
                console.log(obj[key]);
            }
        } else if (typeof obj[key] === 'string') {
            let childrenUl = ':' + obj[key];
            if (childrenUl) {
                li.append(childrenUl);
            }

        }

        ul.append(li);
    }

    return ul;
}

let container = document.getElementById('container');
createTree(container, data);


function stringify(obj) {
    let objString = '';

    // We get the last key of this object
    const lastKey = Object.keys(obj).pop();
    // We add the first curly brace
    objString += '{';
    for (const key in obj) {
        const value = obj[key];

        objString += `"${key}":`;

        if (typeof obj[key] === 'object') {
            objString += `${stringify(value)}`;
        } else if (typeof value === 'string') {
            objString += `"${value}"`;
        } else if (typeof obj[key] === 'number') {
            objString += `${value}`;
        }

        // We add the comma
        if (key !== lastKey) {
            objString += ',';
        }
    }
    // We add the last curly brace
    objString += '}';
    return objString;
}

console.log(stringify(data))
console.log(data);


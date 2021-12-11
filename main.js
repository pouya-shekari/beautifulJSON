const resultTag = document.getElementById("result");
const textArea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");


function render(container, obj) {
    container.innerHTML += `<span class="json-viewer-object-start">{</span>`
    container.appendChild(createTreeDom(obj));
    container.innerHTML += `<span class="json-viewer-object-end">}</span>`
}

function createTreeDom(obj) {
    let ul = document.createElement("ul");
    for (let key in obj) {
        let li = document.createElement('li');
        if (typeof obj[key] === 'object') {
            let childrenUl = createTreeDom(obj[key]);

            li.innerHTML=`<span class="json-viewer-object-start">"${key}" : {</span>`
            li.appendChild(childrenUl);

            li.innerHTML+=  `  <span class="json-viewer-object-end"> }</span>`

        }else if(typeof obj[key] === 'string'){
            li.innerHTML +=  `<span class="key">"${key}" :</span>
                                   <span class="value-${typeof obj[key]}">"${obj[key]}"</span>`;

        }else{
            li.innerHTML +=  `<span class="key">"${key}" :</span>
                                   <span class="value-${typeof obj[key]}"> ${obj[key]}</span>`;

        }

        ul.appendChild(li);
    }

    return ul;
}


function onToggleObj(e){
    if(e.target.classList.contains("json-viewer-object-start")){
        e.target.classList.toggle("json-viewer-object-close")
    }
}

function JSONBeautifuler(data){
    let rootElement = document.createElement('ul')
    render(rootElement , data)
    rootElement.addEventListener('click' , onToggleObj)
    return rootElement
}

submitBtn.addEventListener("click",function(){
    resultTag.innerHTML = null
    try{
        textArea.classList.remove('has-error')
        resultTag.appendChild(JSONBeautifuler(JSON.parse(textArea.value)))
    }catch (e) {
        textArea.classList.add('has-error')
    }
})

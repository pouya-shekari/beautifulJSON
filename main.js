const resultTag = document.getElementById("result");
const textArea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");

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

document.querySelector("#salvar").addEventListener("click", cadastrar)


let tarefas =[]

window.addEventListener("load", () => {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    atualizar()
    
})

document.querySelector("#buscar").addEventListener("keyup", () =>{
    let busca = document.querySelector("#buscar").value
    let tarefasFiltradas = tarefas.filter((tarefa) => {
        return  tarefa.titulo.toLowerCase().includes(busca.toLowerCase())

    })
    filtrar(tarefasFiltradas)
})


function filtrar(tarefas){
    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach((tarefa) => {
        document.querySelector("#tarefas").innerHTML += createCard (tarefa)
    })
}


function atualizar(){
    document.querySelector("#tarefas").innerHTML = ""
    localStorage.setItem("tarefas", JSON.stringify (tarefas))
    tarefas.forEach((tarefa) => {
        document.querySelector("#tarefas").innerHTML += createCard (tarefa)
    })
}

function cadastrar (){
    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const link = document.querySelector("#link").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    
    const tarefa ={
        id: Date.now(),
        titulo: titulo, //poderia ser só titulo por ser o mesmo nome da variavel ex: titulo,
        descricao: descricao,
        categoria: categoria,
        link: link,
        concluida: false
    }

    
    if(!validar(tarefa.titulo, document.querySelector("#titulo") )) return
    if(!validar(tarefa.descricao, document.querySelector("#descricao") )) return

    tarefas.push(tarefa)
    
    atualizar()

    
    modal.hide()
}

function validar (valor, campo){
    //clean code
    if(valor ==""){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true

}

function apagar (id){

    tarefas = tarefas.filter((tarefa) => {
        return tarefa.id != id 
    })
    
    console.log(tarefas)

    atualizar()
}

function concluir (id){
    let tarefaEncontrada = tarefas.find((tarefa) => {
        return tarefa.id == id
    })

    tarefaEncontrada.concluida = true
    atualizar()
}

function createCard (tarefa){
    let disabled =  tarefa.concluida ? "disabled" : ""

    return `
    <div class="col-lg-3 col-md-6 col-12">

    <div class="card">
        <div class="card-header">
         ${tarefa.titulo}
        </div>
            <div class="card-body">
            <p class="card-text">${tarefa.descricao}</p>
                <p>
                    <span class="badge text-bg-danger">${tarefa.categoria}</span>
                </p>
                
            <a onClick="concluir(${tarefa.id})" href="${tarefa.link}" target="_blank" class="btn btn-success" ${disabled} title= "Marcar como concluída">
            
            <i class="bi bi-play-circle-fill"></i>
                Escutar Música
                </a>
            <a onClick="apagar(${tarefa.id})" href="#" class="btn btn-danger" title="Apagar tarefa">
                <i class="bi bi-trash"></i>
                Excluir Música
                </a>
            </div>
    </div> <!--Card-->

</div> <!--Final da coluna-->
    ` //template literals
}
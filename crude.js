document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar (){
    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const link = document.querySelector("#link").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    
    const tarefa ={
        titulo: titulo, //poderia ser só titulo por ser o mesmo nome da variavel ex: titulo,
        descricao: descricao,
        categoria: categoria,
        link: link
    }

    if(!validar(tarefa.titulo, document.querySelector("#titulo") )) return
    if(!validar(tarefa.descricao, document.querySelector("#descricao") )) return


    document.querySelector("#tarefas").innerHTML += createCard (tarefa)
    
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

function apagar (botao){
    botao.parentNode.parentNode.parentNode.remove()
}

function createCard (tarefa){
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
            <a href="${tarefa.link}" class="btn btn-success"title= "Marcar como concluída">
            <i class="bi bi-play-circle-fill"></i>
                Escutar Música
                </a>
            <a onClick="apagar(this)" href="#" class="btn btn-danger" title="Apagar tarefa">
                <i class="bi bi-trash"></i>
                Excluir Música
                </a>
            </div>
    </div> <!--Card-->

</div> <!--Final da coluna-->
    ` //template literals
}
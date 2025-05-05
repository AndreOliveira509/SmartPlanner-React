import { useState } from 'react'
import './App.css'

function App() {
  const [texto, setTexto] = useState('')
  const [tarefas, setTarefas] = useState([])

  function adicionarTarefa() {
    if (texto.trim() === '') return

    setTarefas([...tarefas, { texto, concluida: false, editando: false }])
    setTexto('')
  }

  function concluirTarefa(index) {
    const novasTarefas = [...tarefas]
    novasTarefas[index].concluida = true
    setTarefas(novasTarefas)
  }

  function editarTarefa(index) {
    const novasTarefas = [...tarefas]
    novasTarefas[index].editando = true
    setTarefas(novasTarefas)
  }

  function salvarEdicao(index, novoTexto) {
    const novasTarefas = [...tarefas]
    novasTarefas[index].texto = novoTexto
    novasTarefas[index].editando = false
    setTarefas(novasTarefas)
  }

  function deletarTarefa(index) {
    const novasTarefas = [...tarefas]
    novasTarefas.splice(index, 1)
    setTarefas(novasTarefas)
  }

  return (
    <div className="App">
      <h1>SmartPlanner</h1>
      <div className="input-container">
            <input
            type="text"
            maxLength='20'
            placeholder="Digite uma tarefa"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
      </div>


      {tarefas.map((tarefa, index) => (
       <div className={`tarefas ${tarefa.concluida ? 'concluida' : ''}`}>
       {tarefa.editando ? (
         <>
           <input
             type="text"
             defaultValue={tarefa.texto}
             onKeyDown={(e) => {
               if (e.key === 'Enter') salvarEdicao(index, e.target.value)
             }}
           />
           <button onClick={() => salvarEdicao(index, tarefa.texto)}>Salvar</button>
         </>
       ) : (
         <>
           <span>{tarefa.concluida ? `✅ ${tarefa.texto}` : tarefa.texto}</span>
           <div className="botoes">
             {!tarefa.concluida && (
               <>
                 <button onClick={() => concluirTarefa(index)}>Concluir</button>
                 <button onClick={() => editarTarefa(index)}>Editar</button>
               </>
             )}
             <button onClick={() => deletarTarefa(index)}>Del</button>
           </div>
         </>
       )}
     </div>     
      ))}
    </div>
  )
}

export default App

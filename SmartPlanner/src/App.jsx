import { useState } from 'react'
import './App.css'

function App() {
  const [texto, setTexto] = useState();
  const [tarefas, setTarefas] = useState([...tarefas, { texto, concluida: false, editando: false }])
  
  function adicionarTarefa() {
    if (texto.trim() === '') return

    setTarefas([...tarefas, texto])

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
    <>
      <h1>SmartPlanner</h1>
      <input type="text" value={texto} onChange={(e)=> setTexto(e.target.value)}/>
      <button onClick={adicionarTarefa}>Adicionar</button>
      {tarefas.map((tarefa, index) => (
            <div
              key={index}
              className={`tarefas ${tarefa.concluida ? 'concluida' : ''}`}
            >
              {tarefa.editando ? (
                <>
                  <input
                    type="text"
                    defaultValue={tarefa.texto}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        salvarEdicao(index, e.target.value)
                      }
                    }}
                  />
                  <button onClick={() => salvarEdicao(index, tarefa.texto)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>{tarefa.concluida ? `✅ ${tarefa.texto}` : tarefa.texto}</span>
                  {!tarefa.concluida && (
                    <>
                      <button onClick={() => concluirTarefa(index)}>Concluir</button>
                      <button onClick={() => editarTarefa(index)}>Editar</button>
                    </>
                  )}
                  <button onClick={() => deletarTarefa(index)}>Del</button>
                </>
              )}
            </div>
          ))}
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  const [texto, setTexto] = useState();
  const [tarefas, setTarefas] = useState([])
  
  function adicionarTarefa() {
    if (texto.trim() === '') return

    setTarefas([...tarefas, texto])

    setTexto('')
     
    }
    function deletarTarefa(index) {
      // Cria uma cópia das tarefas
      const novasTarefas = [...tarefas]
      // Remove o item no índice informado
      novasTarefas.splice(index, 1)
      // Atualiza o estado
      setTarefas(novasTarefas)
    }

  return (
    <>
      <h1>SmartPlanner</h1>
      <input type="text" value={texto} onChange={(e)=> setTexto(e.target.value)}/>
      <button onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {tarefas.map((tarefa, index) => (
          <div key={index} className={tarefas}>
            {tarefa}
            <button onClick={() => deletarTarefa(index)}>Del</button>
          </div>
        ))}
      </ul>
    </>
  )
}

export default App

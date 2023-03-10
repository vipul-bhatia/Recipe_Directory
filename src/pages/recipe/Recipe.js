import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const {mode} = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() =>{
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=>{
      if(!doc.exists){
        setError('No recipe found')
        setIsPending(false)
      }
      else{
        setRecipe(doc.data())
        setIsPending(false)
      }
    },
    (err) =>{
      setError(err.message)
      setIsPending(false)
    }
    )
    
    return () => unsub()// this is a cleanup function
  }, [id])

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Updated title'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  )
}
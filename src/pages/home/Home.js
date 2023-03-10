import { projectFirestore } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'
import { useState, useEffect } from 'react'

// styles
import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

useEffect(() =>{
  setIsPending(true)
 const unsub =  projectFirestore.collection('recipes').onSnapshot((snapshot)=>{
    if(snapshot.empty){
      setError('No recipes found')
      setIsPending(false)
    }
    else{
      let results = []
      snapshot.docs.forEach(doc =>{
        results.push({...doc.data(), id: doc.id})
      })
      setData(results)
      setIsPending(false)
    }
  }, (err)=>{
    setError(err.message)
    setIsPending(false)
  })

  return () => unsub()// this is a cleanup function
}, [])


  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}

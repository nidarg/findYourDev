import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SearchBox = () => {
  const[keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(keyword.trim()){
      navigate(`/profiles/search/${keyword}`)
    }
    else{
      navigate('/profiles')
    }
  }

  return (

    <form className="form" onSubmit={e=>handleSubmit(e)}>
      <div className="form-group">
        <input type="text" placeholder="Search dev" name="keyword" value = {keyword} onChange={e=>setKeyword(e.target.value)}/>
      </div>
      <button type="submit" className="btn btn-primary my-1">
        Search
      </button>
          
    </form>
  )
}

export default SearchBox
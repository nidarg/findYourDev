import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'


const ProfileGithub = () => {

  const dispatch = useDispatch()
  const getProfile = useSelector(state=>state.getProfile)
  const{profile:{githubusername}, repos} = getProfile

  useEffect(()=>{
    dispatch(getGithubRepos(githubusername))
  },[githubusername,dispatch,getGithubRepos])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos && (
        repos.map(repo=>(
          
          <div key={repo._id} className="repo bg-white p-1 my-1">

            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            
          </div>
        )

          )
      )}
    </div>
  )
}

export default ProfileGithub
const express = require('express');
const request = require('request')
const router = express.Router();
const authorization = require('../../middleware/authorization')
const Profile = require('../../models/Profile')
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')
const checkObjectId = require('../../middleware/checkObjectId');

//@ route GET api/profile/me
//@desc get current user profile
// @access Private
router.get('/me', authorization, async(req, res)=>{
  try {
    
    const profile = await Profile.findOne({userId:req.user._id})
    .populate('userId', 'name avatar')

    if(!profile){
      return res.status(400).json({message:'There is no profile for this user'})
    }
    res.json(profile);
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message)
  }
})

//@ route POST api/profile
//@desc create or update a user profile
// @access Private

router.post('/', [authorization,[
  check('userstatus', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty()
]], async(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  // destructure the request
  const {
    website,
    skills,
    company,
    location,
    bio,
    userstatus,
    githubusername,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    // spread the rest of the fields we don't need to check
  
  } = req.body;

  const profileFields = {}

  profileFields.userId = req.user.id
  if(company){profileFields.company = company}
  if(website){profileFields.website = website}
  if(location){profileFields.location = location}
  if(bio){profileFields.bio = bio}
  if(userstatus){profileFields.userstatus = userstatus}
  if(githubusername){profileFields.githubusername = githubusername}
  //build am array of skills from string
  if(skills){
    profileFields.skills = skills.split(',').map(skill=>skill.trim())
  }

  // build social object
  // profileFields.social = {youtube:'',twitter:'',facebook:'',linkedin:'',instagram:''}
  if(youtube){profileFields.youtube = youtube}
  if(twitter){profileFields.twitter = twitter}
  if(facebook){profileFields.facebook = facebook}
  if(linkedin){profileFields.linkedin = linkedin}
  if(instagram){profileFields.instagram = instagram}

  try {
    let edit = false
    let profile = await Profile.findOne({userId:req.user._id})
    
    if(profile){
      edit = true
      //Update profile
      profile = await Profile.findOneAndUpdate(
        {userId:req.user._id},
        //use $set and $inc operators to update any field in MongoDB
        {$set:profileFields},
        {new:true}
        )
        return res.json({profile,edit})
    }

      // Create profile
      profile = new Profile(profileFields)
      await profile.save()
      
      res.json({profile,edit})

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }

})


//@ route GET api/profile
//@desc get all profiles
// @access Public
router.get('/', async(req, res)=>{
  try {
    const keyword = req.query.keyword ?
    {
      userstatus:{
      $regex: req.query.keyword,
      $options:'i'
    }

    
  }:{}
    const profiles = await Profile.find({...keyword}).populate('userId', ['name', 'avatar'])

    res.json(profiles)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

//@ route GET api/profile/user/:user_id
//@desc get user profile
// @access Public
router.get('/user/:user_id', checkObjectId('user_id'), async({ params: { user_id } }, res)=>{
  
  try {
    

      const profile = await Profile.findOne({userId:user_id}).populate('userId', ['name', 'avatar'])
      if(!profile){
        res.status(400).json({message:"Profile not found"})
      }
      res.json(profile)

    
    
  } catch (error) {
    console.error(error.message);
    if(error.kind == 'ObjectId'){
      return res.status(400).json({message:"Profile not found"})
    }
    res.status(500).send('Server Error');
  }
})


//@ route DELETE api/profile
//@desc Delete profile user & posts
// @access Private
router.delete('/', authorization, async(req, res)=>{
  try {

    //todo->remove user posts

    //remove profile
    await Profile.findOneAndRemove({userId:req.user._id})
    // remove user
    await User.findOneAndRemove({_id:req.user._id})
   res.json({message:'User deleted'})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

//@ route PUT api/profile/experience
//@desc Add profile experience
// @access Private
router.put('/experience', [authorization, 
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

  ]], 
  async(req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const{title, company, location, from, to,description} = req.body

    const newExp = {title, company, location, from, to, description}
    try {
      const profile = await Profile.findOne({userId:req.user._id})
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })


  //@ route DELETE api/profile/experience/:experience_id
//@desc Delete profile experience
// @access Private
router.delete('/experience/:exp_id', authorization, async(req, res)=>{
  try {
    const profile = await Profile.findOne({userId:req.user._id})
    profile.experience = profile.experience.filter((exp)=>exp._id.toString() !== req.params.exp_id)
    
    await profile.save()
    res.json(profile)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

//@ route PUT api/profile/education
//@desc Add profile education
// @access Private
router.put('/education', [authorization, 
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

  ]], 
  async(req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const{school, degree, fieldofstudy, from, to, description} = req.body

    const newEdu = {school, degree, fieldofstudy, from, to, description}
    try {
      const profile = await Profile.findOne({userId:req.user._id})
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  })


  //@ route DELETE api/profile/education/:edu_id
//@desc Delete profile education
// @access Private
router.delete('/education/:edu_id', authorization, async(req, res)=>{
  try {
    const profile = await Profile.findOne({userId:req.user._id})
    profile.education = profile.education.filter((edu)=>edu._id.toString() !== req.params.edu_id)
    
    await profile.save()
    res.json(profile)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

 //@ route GET api/profile/github/:username
//@desc Get user repos from Github
// @access Public

router.get('/github/:username', async(req, res)=>{
  try {

    const options = {
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method:'GET',
      headers:{'user-agent':'node.js'}
    }
    
    request(options,(error, response, body)=>{
      if(error){console.log(error)}

      if(response.statusCode !== 200){
        res.status(404),json({message:'No Github profile found'})
      }

      res.json(JSON.parse(body))
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
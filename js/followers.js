fetchApi('GET','/timeline', {}, function (response, statusCode) {
  console.log(response);
  //updating profile info

  document.getElementById('followers').innerHTML = response.followers_count
  document.getElementById('following').innerHTML = response.followees_count

  response.followees.forEach(function(result){
      var followerContainer = document.createElement('div')
      followerContainer.classList.add('followerContainer')
      followerContainer.classList.add('thumbnail')
      followerContainer.classList.add('col-sm-3')
      var followerImgContainer = document.createElement('div')
      followerImgContainer.classList.add('followerImgContainer')
      var followerNameContainer = document.createElement('div')
      followerNameContainer.classList.add('followerNameContainer')
      var followerButtonContainer = document.createElement('div')
      followerButtonContainer.classList.add('followerButtonContainer')

      var userImage = document.createElement('img')
      userImage.setAttribute('src', result.avatar)
      var username = document.createElement('h3')
      username.innerHTML = result.username
      username.classList.add('text-center')
      var unfollowButton = document.createElement('button')
      unfollowButton.classList.add('btn')
      unfollowButton.classList.add(result.username)
      unfollowButton.classList.add('unfollow')
      unfollowButton.innerHTML = 'Unfollow'
      unfollowButton.setAttribute('type', 'button')

      followerButtonContainer.appendChild(unfollowButton)
      followerNameContainer.appendChild(username)
      followerImgContainer.appendChild(userImage)

      followerContainer.appendChild(followerImgContainer)
      followerContainer.appendChild(followerNameContainer)
      followerContainer.appendChild(followerButtonContainer)

      document.getElementById('followerPost').appendChild(followerContainer)
  })
  $(function(){
    createMarquee()
  })

  document.body.addEventListener('click', function (e){
    if (e.target.classList.contains('unfollow')) {
      fetchApi('POST','/unfollow', {}, function (response, statusCode) {
        if (statusCode >= 200 && statusCode < 300) {
          redirect('/followers.html')
        }
        else {
          alert("something went wrong")
        }
      })
    }
    // sessionStorage.removeItem('api_token')
    // redirect('/index.html')
  })

})


//signout
document.getElementById('signout').addEventListener('click', function (){
  sessionStorage.removeItem('api_token')
  redirect('/index.html')
})

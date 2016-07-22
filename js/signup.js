document.getElementById('btnSubmit').addEventListener('click', function () {
  var formFields = {
    username: document.getElementById('name').value,
    email: document.getElementById('emailSignUp').value,
    password: document.getElementById('passwordSignUp').value,
    avatar: document.getElementById('avatarSignUp').value
  }

  fetchApi('/signup', formFields, function (response, statusCode) {
    if (statusCode === 201) {
      saveToken(response.token)
      redirect('/timeline.html')
    }
    else {
      // popup a warning
    }
  })
})
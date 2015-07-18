export default class LoginController{
  constructor($auth,$location){
    this.$auth = $auth;
    this.$location = $location;
    if($auth.isAuthenticated()){
      $location.path('/dashboard');
    }
  }
  authenticate (provider) {
    this.$auth.authenticate(provider)
      .then(()=>{
        this.$location.path('/dashboard')
      })
      .catch((err)=>{
        //todo bootstrap modal
        //alert('you\'re not welcome here stranger');
      })
  }
}

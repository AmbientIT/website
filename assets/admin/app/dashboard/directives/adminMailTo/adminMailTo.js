export default ()=>{
  return {
    scope:{
      email: '@'
    },
    template:'<a href="mailto:{{email}}">{{email}}</a>'
  }
}

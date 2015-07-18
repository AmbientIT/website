export default ()=>{
  return {
    scope:{
      base64: '@',
      height: '@'
    },
    template:'<img style="border-radius:50%;" src="data:image/png;base64,{{base64}}" width="{{height}}" height="{{height}}"/>'
  }
}

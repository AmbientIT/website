import template from './admin-mailto.tpl.html!text';

export default ()=>{
  return {
    scope:{
      email: '@'
    },
    template: template
  }
}

import template from './admin-picture.tpl.html!text';

export default ()=>{
  return {
    scope:{
      url: '@',
      height: '@'
    },
    template: template
  }
}

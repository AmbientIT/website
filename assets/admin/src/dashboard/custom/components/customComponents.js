import textTemplate from './text-field.tpl.html!text';

export default (NgAdminConfigurationProvider, $provide)=>{
  $provide.decorator('maTextFieldDirective', ['$delegate', function ($delegate) {
    $delegate[0].template = textTemplate;
    return $delegate;
  }]);
}

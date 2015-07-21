import './dashboard.css!';

import angular from 'angular';
import components from './components/components';
import filters from './filters/filters';
import custom from './custom/custom';

import categoryUi from './entities/category';
import trainerUi from './entities/trainer';
import contactUi from './entities/contact';
import formationUi from './entities/formation';
import mediaUi from './entities/media';
import userUi from './entities/user';
import projectUi from './entities/project';

import customLayoutTemplate from './custom/views/layout.tpl.html!text';

export default angular.module('ai.dashboard',[
  'ng-admin',
  components.name,
  filters.name,
  custom.name
])
  .config((NgAdminConfigurationProvider)=>{
    let nga = NgAdminConfigurationProvider;


    let admin = nga.application('AmbientIT Back-Office')
      .baseApiUrl('/api/');

    admin.layout(customLayoutTemplate);


    let contact = nga.entity('contact')
      .identifier(nga.field('slug'));

    let formation = nga.entity('formation')
      .identifier(nga.field('slug'));

    let category = nga.entity('category')
      .identifier(nga.field('slug'));

    let user = nga.entity('user')
      .identifier(nga.field('slug'));

    let media = nga.entity('media')
      .identifier(nga.field('slug'));

    let trainer = nga.entity('trainer')
      .identifier(nga.field('slug'));

    let project = nga.entity('project')
      .identifier(nga.field('slug'));

    // set the application entities
    admin
      .addEntity(contact)
      .addEntity(user)
      .addEntity(category)
      .addEntity(formation)
      .addEntity(trainer)
      .addEntity(media)
      .addEntity(project);

    //// customize entities and views
    //

    categoryUi(nga,category);
    trainerUi(nga, trainer,user);
    mediaUi(nga, media);
    userUi(nga, user);
    formationUi(nga, formation,category);
    contactUi(nga,contact);
    projectUi(nga, project, media, user);

    admin.menu(nga.menu()
        .addChild(nga.menu(contact).icon('<i class="ion-person-stalker"></i>'))
        .addChild(nga.menu(trainer).icon('<i class="ion-person-add"></i>'))
        .addChild(nga.menu(user).icon('<i class="ion-person"></i>'))
        .addChild(nga.menu(category).icon('<i class="ion-pricetag"></i>'))
        .addChild(nga.menu(formation).icon('<i class="ion-university"></i>'))
        .addChild(nga.menu(media).icon('<i class="ion-images"></i>'))
        .addChild(nga.menu(project).icon('<i class="ion-nuclear"></i>'))
    );

    nga.configure(admin);
  })

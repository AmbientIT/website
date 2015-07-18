import angular from 'angular';
import directives from './directives/directives';
import filters from './filters/filters';

export default angular.module('ai.dashboard',[
  'ng-admin',
  directives.name,
  filters.name
])
  .config((NgAdminConfigurationProvider)=>{
    let nga = NgAdminConfigurationProvider;


    let admin = nga.application('AmbientIT Back-Office')
      .baseApiUrl('/api/');

    let contact = nga.entity('contact')
      .identifier(nga.field('id'));

    let formation = nga.entity('formation')
      .identifier(nga.field('id'));

    let category = nga.entity('category')
      .identifier(nga.field('id'));

    let user = nga.entity('user')
      .identifier(nga.field('id'));

    let media = nga.entity('media')
      .identifier(nga.field('id'));

    let trainer = nga.entity('trainer')
      .identifier(nga.field('id'));

    // set the application entities
    admin
      .addEntity(contact)
      .addEntity(user)
      .addEntity(category)
      .addEntity(formation)
      .addEntity(trainer)
      .addEntity(media);

    //// customize entities and views
    //

    trainer.dashboardView()
      .title('formateurs')
      .sortField('createdAt')
      .sortDir('DESC')
      .perPage(5)
      .fields([
        nga.field('displayName'),
        nga.field('email'),
        nga.field('formations','template')
          .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
        nga.field('price', 'template')
          .label('tarif journalier')
          .template('<span>{{ entry.values.price | currency:"€":2:true }}</span>')
      ]);

    trainer.listView()
      .title('Formateurs')
      .sortField('displayName')
      .sortDir('ASC')
      .fields([
        trainer.dashboardView().fields()
      ])
      .listActions(['show', 'edit', 'delete']);

    trainer.creationView()
      .title('Ajout d\'un nouveau formateur')
      .fields([
        nga.field('user', 'reference')
          .label('associé à un compte ambient-it ?')
          .targetEntity(user)
          .targetField(nga.field('displayName')),
        nga.field('firstName')
          .label('Prénom')
          .attributes({placeholder: 'le prénom du formateur'})
          .validation({ minlength: 2, maxlength:30}),
        nga.field('lastName')
          .label('Nom')
          .attributes({placeholder: 'le nom du formateur'})
          .validation({ minlength: 2, maxlength:30}),
        nga.field('email')
          .label('email')
          .attributes({placeholder: 'l\'email du formateur'})
          .validation({ email: true}),
        nga.field('formations','template')
          .label('formations')
          .template('<div admin-relation-select attr-name="formations" data="entry.values" relation-name="formation"></div>'),
        nga.field('price', 'number')
          .label('prix')
          .attributes({placeholder: 'le tarif journalier du formateur'})
          .validation({number: true}),
        nga.field('extrenal', 'boolean')
          .label('est une resource externe ?'),
        nga.field('home', 'boolean')
          .label('affiché en home ? (4 max)')
      ]);

    trainer.editionView()
      .title('Edition du formateur {{ entry.values.displayName }}')
      .actions(['list','show', 'delete'])
      .fields([
        trainer.creationView().fields()
      ]);

    trainer.showView()
      .title('Formateur {{ entry.values.name }}')
      .actions(['list','edit', 'delete'])
      .fields([
        nga.field('displayName')
          .label('Nom du formateur')
          .attributes({placeholder: 'le nom du formateur'})
          .validation({ minlength: 2, maxlength:30}),
        nga.field('email')
          .label('email')
          .attributes({placeholder: 'l\'email du formateur'})
          .validation({ email: true}),
        nga.field('formations','template')
          .label('formations')
          .template('<div admin-relation-repeter data="entry.values.formations" relation-name="formation"></div>'),
        nga.field('price', 'number')
          .label('prix')
          .attributes({placeholder: 'le tarif journalier du formateur'})
          .validation({number: true}),
        nga.field('extrenal', 'boolean')
          .label('est une resource externe ?'),
        nga.field('home', 'boolean')
          .label('affiché en home ? (4 max)')        ]);
    trainer.deletionView()
      .title('Confirmez vous la suppression du formateur {{ entry.values.displayName }} ?')
      .description('Attention Toute suppression est definitive');


    media.dashboardView()
      .title('derniers uploads')
      .sortField('createdAt')
      .sortDir('DESC')
      .perPage(5)
      .fields([
        nga.field('file','template')
          .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>'),
        nga.field('name'),
        nga.field('size','template')
          .label('taille')
          .template('<span>{{ entry.values.size | size }}</span>')

      ]);

    media.listView()
      .title('Bibliothèque de multimédia')
      .description('List of media')
      .sortField('name')
      .sortDir('ASC')
      .infinitePagination(true)
      .fields([
        nga.field('file','template')
          .template('<admin-picture base64="{{ entry.values.file }}" height="50px"></admin-picture>'),
        nga.field('name')
          .label('nom du média'),
        nga.field('size','template')
          .label('taille')
          .template('<span>{{ entry.values.size | size }}</span>')
      ])
      .listActions(['show', 'edit', 'delete']);

    media.creationView()
      .title('upload un nouveau fichier')
      .description('Pour pouvoir utiliser le fichiers il faudra ensuite le modifier et lui ajouter un nom')
      .fields([
        nga.field('file','file')
          .label('Le fichier à uploader')
          .uploadInformation({ 'url': '/api/upload/media?avatar=true', 'fileFormDataName': 'file', 'accept': '.png' })
      ]);

    media.editionView()
      .title('Modifier les informations de votre média {{ entry.values.name }}')
      .actions(['list','show', 'delete'])
      .fields([
        nga.field('name')
          .label('Nom')
          .attributes({placeholder: 'le nom du média'})
          .validation({ required: true, maxlength:30}),
        nga.field('description')
          .label('Descriion')
          .attributes({placeholder: 'la description du média'})
          .validation({ maxlength:200})
      ]);

    media.showView()
      .title('{{ entry.values.name }}')
      .actions(['list', 'edit', 'delete'])
      .fields([
        media.editionView().fields(),
        nga.field('originalName')
          .label('nom original'),
        nga.field('size','template')
          .label('taille')
          .template('<span>{{ entry.values.size | size }}</span>'),
        nga.field('file','template')
          .label('sans modif')
          .template('<admin-picture base64="{{ entry.values.file }}"  ></admin-picture>')
      ]);

    media.deletionView()
      .title('Confirmez vous la suppression du média {{ entry.values.name }} ?')
      .description('Attention Toute suppression est definitive');




    user.dashboardView()
      .title('La team')
      .sortField('createdAt')
      .sortDir('DESC')
      .perPage(5)
      .fields([
        nga.field('displayName')
          .label('Nom'),
        nga.field('email','template')
          .label('Email')
          .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>')
      ]);

    user.listView()
      .title('La team ')
      .actions(['export'])
      .sortField('displayName')
      .sortDir('ASC')
      .description('Tous les utilisateurs enregistrés via google avec leur compte ambient-it.net')
      .fields([
        user.dashboardView().fields()
      ])
      .listActions(['show', 'edit', 'delete']);


    user.showView()
      .title('utilisateur Ambient-it {{ entry.values.name }}')
      .actions(['list','edit', 'delete'])
      .fields([
        user.listView().fields(),
        nga.field('description', 'text')
      ]);

    user.editionView()
      .title('Edition de l\'utilisateur Ambient-it {{ entry.values.name }}')
      .actions(['list','show', 'delete'])
      .fields([
        user.listView().fields(),
        nga.field('description', 'text')
      ]);

    user.deletionView()
      .title('Confirmez vous la suppression de l\' utilisateur {{ entry.values.displayName }} ?')
      .description('Attention Toute suppression est definitive');




    category.dashboardView()
      .title('Catégories de formations')
      .sortField('createdAt')
      .sortDir('Desc')
      .perPage(5)
      .fields([
        nga.field('name')
          .label('Nom')
          .attributes({placeholder: 'Le nom de la catégorie'})
          .validation({required: true, minlength: 3, maxlength: 50}),
        nga.field('description', 'text')
          .label('Description')
          .attributes({placeholder: 'Une description de la catégorie'})
          .validation({required: true, minlength: 10, maxlength: 300})
      ]);

    category.listView()
      .title('Catégories de formations')
      .sortField('name')
      .sortDir('ASC')
      .description('Chaque catégorie regroupe plusieurs formations')
      .fields([
        category.dashboardView().fields()
      ])
      .listActions(['show', 'edit', 'delete']);

    category.creationView()
      .title('Création d\'une nouvelle catégorie de formations')
      .fields([
        category.dashboardView().fields()
      ]);

    category.editionView()
      .title('Modifier la categorie de formation {{ entry.values.name }}')
      .actions(['list', 'show', 'delete'])
      .fields([
        category.creationView().fields()
      ]);


    category.showView()
      .title('Categorie de formation : {{ entry.values.name }}')
      .actions(['list', 'edit', 'delete'])
      .fields([
        category.dashboardView().fields(),
        nga.field('formations', 'template')
          .template('<admin-relation-repeter entity-name="formation" data="entry.values.formations"></admin-relation-repeter>')
      ]);


    category.deletionView()
      .title('Confirmez vous la suppression de la category {{ entry.values.name }} ?')
      .description('Attention Toute suppression est definitive');




    formation.dashboardView()
      .title('formations')
      .sortField('createdAt')
      .sortDir('DESC')
      .perPage(5)
      .fields([
        nga.field('name')
          .label('Nom')
          .attributes({placeholder: 'Le nom de la formation'})
          .validation({required: true, minlength: 2, maxlength: 40}),
        nga.field('category', 'template')
          .label('Catégorie')
          .template('<admin-relation-repeter entity-name="formation" data="[entry.values.category]"></admin-relation-repeter>'),
        nga.field('price', 'template')
          .label('Le prix de la formation')
          .template('<span>{{ entry.values.price | currency:"€":0:true }}</span>'),
        nga.field('previous', 'template')
          .label('Prérequis')
          .template('<admin-relation-repeter entity-name="formation" data="entry.values.previous"></admin-relation-repeter>')
      ]);


    formation.listView()
      .title('Formations')
      .sortField('name')
      .sortDir('ASC')
      .perPage(10)
      .fields([
        formation.dashboardView().fields(),
        nga.field('description', 'text')
          .label('Description')
          .attributes({placeholder: 'La description de la formation'})
          .validation({required: true, minlength: 50, maxlength: 500}),
        nga.field('duration', 'number')
          .label('Durée')
          .attributes({placeholder: 'La durée en jour de la formation'})
          .validation({required: true, min: 1, max: 30}),
        nga.field('home', 'boolean')
          .label('homePage'),
        nga.field('trainers', 'template')
          .label('Formateurs')
          .template('<admin-relation-repeter entity-name="trainer" data="entry.values.trainers"></admin-relation-repeter>')

      ])
      .listActions(['show', 'edit', 'delete']);

    formation.showView()
      .title('Formation {{ entry.values.name }}')
      .actions(['list','edit', 'delete'])
      .fields([
        nga.field('name')
          .label('Nom')
          .attributes({placeholder: 'Le nom de la formation'})
          .validation({required: true, minlength: 2, maxlength: 40}),
        nga.field('category', 'reference')
          .label('Category')
          .targetEntity(category)
          .targetField(nga.field('name')),
        nga.field('price', 'template')
          .label('Le prix de la formation')
          .template('<span>{{ entry.values.price | currency:"€":0:true }}</span>'),
        nga.field('previous', 'template')
          .label('Prérequis')
          .template('<admin-relation-repeter entity-name="formation" data="entry.values.previous"></admin-relation-repeter>'),
        nga.field('description', 'text')
          .label('Description')
          .attributes({placeholder: 'La description de la formation'})
          .validation({required: true, minlength: 50, maxlength: 500}),
        nga.field('duration', 'number')
          .label('Durée')
          .attributes({placeholder: 'La durée en jour de la formation'})
          .validation({required: true, min: 1, max: 30}),
        nga.field('home', 'boolean')
          .label('homePage'),
        nga.field('trainers', 'template')
          .label('Formateurs')
          .template('<admin-relation-repeter entity-name="trainer" data="entry.values.trainers"></admin-relation-repeter>'),
        nga.field('image', 'reference')
          .label('Image (petit rond)')
          .targetEntity(media)
          .targetField(nga.field('name')),
        nga.field('next', 'template')
          .label('Les formations suivantes')
          .template('<admin-relation-repeter entity-name="formation" data="entry.values.next"></admin-relation-repeter>'),
        nga.field('slides')
          .label('support de cours')
          .validation({url: true, minlength: 15, maxlength: 100})
      ]);

    formation.creationView()
      .fields([
        nga.field('name')
          .label('Nom')
          .attributes({placeholder: 'Le nom de la formation'})
          .validation({required: true, minlength: 2, maxlength: 40}),
        nga.field('category', 'reference')
          .label('Categorie')
          .targetEntity(category)
          .targetField(nga.field('name')),
        nga.field('description','text')
          .label('Description')
          .attributes({placeholder: 'description de la fomation'})
          .validation({ minlength: 10, maxlength: 200}),
        nga.field('price', 'number')
          .label('Le prix de la formation')
          .format('0 jours'),
        nga.field('price', 'number')
          .label('Le prix de la formation')
          .format('$0,0.00'),
        nga.field('image', 'reference')
          .label('Image (petit rond)')
          .targetEntity(media)
          .targetField(nga.field('name')),
        nga.field('slides')
          .label('support de cours')
          .validation({url: true, minlength: 15, maxlength: 100}),
        nga.field('previous','template')
          .label('Prérequis')
          .template('<div admin-relation-select attr-name="previous" data="entry.values" relation-name="formation"></div>'),
        nga.field('trainers', 'template')
          .label('Formateurs')
          .template('<admin-relation-select attr-name="trainers" relation-name="trainer" data="entry.values"></admin-relation-select>'),
        nga.field('program', 'wysiwyg')
          .label('Programme de cours')
          .attributes({placeholder: 'Programme détaillé de la formation'})
          .validation({required: true, min: 200, max: 10000})
      ]);

    formation.editionView()
      .title('Edition de la formation {{ entry.values.name }}')
      .actions(['list','show', 'delete'])
      .fields([
        formation.creationView().fields()
      ]);

    formation.deletionView()
      .title('Confirmez vous la suppression de la formation {{ entry.values.name }} ?')
      .description('Attention Toute suppression est definitive');




    contact.dashboardView()
      .title('Derniers contacts')
      .perPage(5)
      .fields([
        nga.field('displayName')
          .label('Nom'),
        nga.field('company')
          .label('Société'),
        nga.field('email','template')
          .label('Email')
          .template('<admin-mailto email="{{ entry.values.email }}"></admin-mailto>'),
        nga.field('formations', 'template')
          .label('Est intéréssé par')
          .template('<admin-relation-repeter data="entry.values.formations" entity-name="formation"></admin-relation-repeter>'),
        nga.field('createdAt', 'template')
          .label('Date et heure')
          .template('<span>{{ entry.values.createdAt | date : "dd/mm/yyyy hh:mm" }}</span>')

      ]);

    contact.listView()
      .title('Tous les  Contacts')
      .actions(['export'])
      .sortField('createdAt')
      .sortDir('DESC')
      .description('La liste de toutes les personnes nous ayant contacter via le site')
      .infinitePagination(true)
      .fields([
        contact.dashboardView().fields()
      ])
      .listActions(['show', 'delete']);

    contact.showView()
      .title('Contact {{ entry.values.displayName }} de la société {{ entry.values.company }} ?')
      .actions(['list'])
      .fields([
        contact.listView().fields(),
        nga.field('message')
          .label('message')
      ]);


    contact.deletionView()
      .title('Confirmez vous la suppression du contact {{ entry.values.displayName }} de la société {{ entry.values.company }} ?')
      .description('Attention Toute suppression est definitive');

    admin.menu(nga.menu()
        .addChild(nga.menu(contact).icon('<i class="ion-person-stalker"></i>'))
        .addChild(nga.menu(trainer).icon('<i class="ion-person-add"></i>'))
        .addChild(nga.menu(user).icon('<i class="ion-person"></i>'))
        .addChild(nga.menu(category).icon('<i class="ion-pricetag"></i>'))
        .addChild(nga.menu(formation).icon('<i class="ion-university"></i>'))
        .addChild(nga.menu(media).icon('<i class="ion-images"></i>'))


    );

    nga.configure(admin);

  })

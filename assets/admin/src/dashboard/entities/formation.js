export default (nga, formation, category)=>{
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
     nga.field('avatar', 'file')
      .label('uploader un avatar pour representer la formation')
       .uploadInformation({ 'url': '/api/upload/avatar', 'fileFormDataName': 'file', 'apifilename': 'base64','accept': '.png' }),
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
        .validation({required: true, min: 200, max: 10000}),
      nga.field('home', 'boolean')
        .label('Apparait en home'),
      nga.field('published', 'boolean')
        .label('est publié sur le site')
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

}

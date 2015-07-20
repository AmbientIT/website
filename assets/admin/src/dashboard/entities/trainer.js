export default (nga, trainer, user)=>{
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
        .label('affiché en home ? (4 max)')
    ]);
  trainer.deletionView()
    .title('Confirmez vous la suppression du formateur {{ entry.values.displayName }} ?')
    .description('Attention Toute suppression est definitive');

}

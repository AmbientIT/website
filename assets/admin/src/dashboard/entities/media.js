export default (nga, media)=>{
  media.dashboardView()
    .title('derniers uploads multimedia')
    .sortField('createdAt')
    .sortDir('DESC')
    .perPage(5)
    .fields([
      nga.field('url','template')
        .template('<admin-picture url="{{ entry.values.url }}" height="50px"></admin-picture>'),
      nga.field('name'),
      nga.field('size','template')
        .label('taille')
        .template('<span>{{ entry.values.size | size }}</span>')

    ]);

  media.listView()
    .title('Bibliothèque multimédia')
    .description('List of media')
    .sortField('name')
    .sortDir('ASC')
    .infinitePagination(true)
    .fields([
      media.dashboardView().fields(),
      nga.field('resize_image', 'template')
      .template('<resize-button></resize-button>')
    ])
    .listActions(['show', 'edit', 'delete']);

  media.editionView()
    .title('Modifier les informations de votre média {{ entry.values.name }}')
    .actions(['list','show', 'delete'])
    .fields([
      nga.field('name')
        .label('Nom')
        .attributes({placeholder: 'le nom du média'})
        .validation({ required: true, maxlength:30}),
      nga.field('description')
        .label('Descripion')
        .attributes({placeholder: 'la description du média'})
        .validation({ maxlength:200}),
      nga.field('url','file')
        .label('avatar')
        .uploadInformation({ 'url': '/api/upload/media', 'fileFormDataName': 'file', 'accept': 'image/*' ,'apifilename': 'picturePath'})
    ]);

  media.creationView()
    .title('upload un nouveau fichier')
    .fields([
      media.editionView().fields()
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
        .template('<admin-picture url="{{ entry.values.url }}"  ></admin-picture>')
    ]);

  media.deletionView()
    .title('Confirmez vous la suppression du média {{ entry.values.name }} ?')
    .description('Attention Toute suppression est definitive');


}

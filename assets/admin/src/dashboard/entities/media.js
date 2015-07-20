export default (nga, media)=>{
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

  media.creationView()
    .title('upload un nouveau fichier')
    .description('Pour pouvoir utiliser le fichiers il faudra ensuite le modifier et lui ajouter un nom')
    .fields([
      nga.field('url','file')
        .label('avatar')
        .uploadInformation({ 'url': '/api/upload/media', 'fileFormDataName': 'file', 'accept': 'image/*' ,'apifilename': 'picturePath'}),
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
        .template('<admin-picture base64="{{ entry.values.file }}"  ></admin-picture>')
    ]);

  media.deletionView()
    .title('Confirmez vous la suppression du média {{ entry.values.name }} ?')
    .description('Attention Toute suppression est definitive');


}

export default (nga, user)=>{
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
}

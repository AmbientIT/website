export default (nga, category)=>{
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

}

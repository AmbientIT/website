export default (nga, contact)=>{
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
}

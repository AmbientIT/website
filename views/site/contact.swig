{% extends  '../layout/site.swig' %}

{% block title %}
Ambient-IT Contact
{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.6/animate.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.12.0/select.min.css"/>
{% endblock %}

<!--{% block header %}-->
<!--{% parent %}-->
<!--{% endblock %}-->

{% block content %}
{% parent %}
<main class="container" ng-app="contact" ng-cloak>
    <contact-nav></contact-nav>
    <ui-view></ui-view>
</main>

{% endblock %}

{% block script %}
{% parent %}
<!--TEMPLATES-->
<script type="text/javascript" src="/jst.js"></script>
<!--TEMPLATES END-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/api-check/7.5.0/api-check.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.js"></script>
<script src="https://code.angularjs.org/1.4.2/angular-animate.min.js"></script>
<script src="https://code.angularjs.org/1.4.2/angular-messages.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.12.0/select.min.js"></script>

<script src="/js/contact/app.js"></script>
<script src="/js/contact/controllers/ContactController.js"></script>
<script src="/js/contact/controllers/DialogController.js"></script>
<script src="/js/contact/filters/propsFilter.js"></script>
<script src="/js/contact/services/contactService.js"></script>
<script src="/js/contact/services/formationService.js"></script>
<script src="/js/dependencies/ui-bootstrap-custom-tpls-0.13.0.js"></script>

{% endblock %}

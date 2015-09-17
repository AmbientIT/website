<section id="feature" data-stellar-background-ratio="0.2">
	<div class="overlay">
        {% include 'formations.swig' %}
        <div class="container">
            <h3 class="text-center">
				Nos formations vedettes
			</h3>

            <div class="row">
                <div class="owl-img">
                    <!--<div class="col-md-12">-->
                        <!--<div class="item-info">-->
                            <!--<h4>FEATURED PROJECT</h4>-->
                            <!--<h2>MAKING OF A NEW CAR</h2>-->
                            <!--<p> Praesent hendrerit, lacus a condimentum scelerisque, augue mi ultrices nunc, vitae posuere <br>-->
                                <!--orci dui at sem. Suspendisse potenti. </p>-->
                            <!--<a class="btn margin-r-20" href="#."><i class="fa fa-eye"></i>&nbsp; View Case Study</a> </div>-->
                    <!--</div>-->
					{% for formation in formations %}
						<div class="col-md-12 {% if !loop.first %}  wow fadeInRightBig {% endif %}" {% if !loop.first %} data-wow-duration="0.5s" data-wow-delay="0.5s" {% endif %}>
                            <div class="item-info">
                                <div style="display:inline-block; border-radius: 50%; height:100px;width:100px;margin-right:30px;">
                                    <img class="circle" src="{{ formation.avatar }}"
                                         alt="{{ formation.name }} logo">
                                </div>
                                <div class="row-content" style="display:inline-block;">
                                    <a href="/formation/{{ formation.slug }}">
                                        <h4 class="list-group-item-heading">
                                            {{ formation.name }}
                                        </h4>
                                    </a>

                                    <p class="list-group-item-text">
                                        {{ formation.description }}
                                    </p>
								</div>
								<div>
                                    <a class="btn margin-r-20 btn-color"  href="/formation/{{ formation.slug }}"><i class="fa fa-eye" style="font-size:1em;"></i>&nbsp; En savoir plus</a>
								</div>
							</div>
						</div>
					{% endfor %}
                </div>
            </div>
        </div>
        <div class="scroll  wow fadeInUp " style="text-align: center;" data-wow-duration="0.8s" data-wow-delay="1.4s"> <a href="#team"><i style="font-size:3em;" class="fa fa-angle-down wheel"></i></a> </div>

	</div>

</section>

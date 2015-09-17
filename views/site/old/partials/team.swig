<section id="team">
    <div class="container">

        <!--======= TITTLE =========-->
        <div class="tittle">
            <h2 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s">Qui sommes nous ?</h2>
            <hr class="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.7s">
        </div>
        <div class="row">
			{% for user in users %}
				<div class="col-md-6 wow flipInX" data-wow-duration="1s" data-wow-delay="0.2s">
					<div class="team">

						<!--======= HOVER DETAIL =========-->
						<div class="t-img">
							<div class="rotate">
								<div class="rotate-none"> <img src="{{ user.picture }}" alt="{{ user.displayName }}"> </div>
							</div>
						</div>
						<div class="team-info">
							<h5>{{ user.displayName }}</h5>
							<p><span>Ceo / Founder</span></p>
							<p>{{ user.description }}</p>
							<!--======= HOVER SOCIAL ICON =========-->
							<div class="social_icons">
								<ul>
									<li class="facebook"> <a href="#."><i class="fa fa-facebook"></i> </a> </li>
									<li class="twitter"> <a href="#."><i class="fa fa-twitter"></i> </a> </li>
									<li class="googleplus"> <a href="#."><i class="fa fa-google"></i> </a> </li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{% endfor %}
            <!--======= TEAM MEMBER 1 =========-->


            <!--======= TEAM MEMBER 1 =========-->
            <!--<div class="col-md-6 wow flipInX" data-wow-duration="1s" data-wow-delay="0.4s">-->
                <!--<div class="team">-->

                    <!--&lt;!&ndash;======= HOVER DETAIL =========&ndash;&gt;-->
                    <!--<div class="t-img">-->
                        <!--<div class="rotate">-->
                            <!--<div class="rotate-none"> <img src="images/team-2.jpg" alt="" > </div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="team-info">-->
                        <!--<h5>THE MUSICAL SCENE</h5>-->
                        <!--<p><span>Ceo / Founder</span></p>-->
                        <!--<p>Praesent hendrerit, lacus  condu mentum scelerisque augue midl ultrices nunc.</p>-->
                        <!--&lt;!&ndash;======= HOVER SOCIAL ICON =========&ndash;&gt;-->
                        <!--<div class="social_icons">-->
                            <!--<ul>-->
                                <!--<li class="facebook"> <a href="#."><i class="fa fa-facebook"></i> </a> </li>-->
                                <!--<li class="twitter"> <a href="#."><i class="fa fa-twitter"></i> </a> </li>-->
                                <!--<li class="googleplus"> <a href="#."><i class="fa fa-google"></i> </a> </li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;======= TEAM MEMBER 1 =========&ndash;&gt;-->
            <!--<div class="col-md-6 wow flipInX" data-wow-duration="1s" data-wow-delay="0.2s">-->
                <!--<div class="team">-->

                    <!--&lt;!&ndash;======= HOVER DETAIL =========&ndash;&gt;-->
                    <!--<div class="t-img">-->
                        <!--<div class="rotate">-->
                            <!--<div class="rotate-none"> <img src="images/team-3.jpg" alt="" > </div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="team-info">-->
                        <!--<h5>THE MUSICAL SCENE</h5>-->
                        <!--<p><span>Ceo / Founder</span></p>-->
                        <!--<p>Praesent hendrerit, lacus  condu mentum scelerisque augue midl ultrices nunc.</p>-->
                        <!--&lt;!&ndash;======= HOVER SOCIAL ICON =========&ndash;&gt;-->
                        <!--<div class="social_icons">-->
                            <!--<ul>-->
                                <!--<li class="facebook"> <a href="#."><i class="fa fa-facebook"></i> </a> </li>-->
                                <!--<li class="twitter"> <a href="#."><i class="fa fa-twitter"></i> </a> </li>-->
                                <!--<li class="googleplus"> <a href="#."><i class="fa fa-google"></i> </a> </li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!--&lt;!&ndash;======= TEAM MEMBER 1 =========&ndash;&gt;-->
            <!--<div class="col-md-6 wow flipInX" data-wow-duration="1s" data-wow-delay="0.4s">-->
                <!--<div class="team">-->

                    <!--&lt;!&ndash;======= HOVER DETAIL =========&ndash;&gt;-->
                    <!--<div class="t-img">-->
                        <!--<div class="rotate">-->
                            <!--<div class="rotate-none"> <img src="images/team-4.jpg" alt="" > </div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="team-info">-->
                        <!--<h5>THE MUSICAL SCENE</h5>-->
                        <!--<p><span>Ceo / Founder</span></p>-->
                        <!--<p>Praesent hendrerit, lacus  condu mentum scelerisque augue midl ultrices nunc.</p>-->
                        <!--&lt;!&ndash;======= HOVER SOCIAL ICON =========&ndash;&gt;-->
                        <!--<div class="social_icons">-->
                            <!--<ul>-->
                                <!--<li class="facebook"> <a href="#."><i class="fa fa-facebook"></i> </a> </li>-->
                                <!--<li class="twitter"> <a href="#."><i class="fa fa-twitter"></i> </a> </li>-->
                                <!--<li class="googleplus"> <a href="#."><i class="fa fa-google"></i> </a> </li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</section>

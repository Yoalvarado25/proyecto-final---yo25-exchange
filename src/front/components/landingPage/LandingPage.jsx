import { useEffect } from "react";
import "./landing-page.css";
import { https://www.youtube.com/shorts/enf1aIX-CIc } from "../Videoexchange/VideoExchange";
import { CurrencyConverter } from "../currencyConverter/CurrencyConverter";
import { Link } from "react-router-dom";
import { BadgeDollarSign, ChartNoAxesCombined, MonitorSmartphone, BriefcaseBusiness } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import PublicRating from "../public-rating/PublicRating";

export default function LandingPage() {
	const { token } = useAuth();
	useEffect(() => {
		const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
		const handleAnchorClick = (e) => {
			const href = e.currentTarget.getAttribute("href");
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		};
		anchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

		const nav = document.querySelector("nav");
		const onScroll = () => {
			if (!nav) return;
			if (window.scrollY > 50) {
				nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
			} else {
				nav.style.boxShadow = "none";
			}
		};
		window.addEventListener("scroll", onScroll);

		const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "translateY(0)";
				}
			});
		}, observerOptions);

		const cards = Array.from(document.querySelectorAll(".value-card, .feature-card"));
		cards.forEach((card) => {
			card.style.opacity = "0";
			card.style.transform = "translateY(30px)";
			card.style.transition = "all 0.6s ease";
			observer.observe(card);
		});

		return () => {
			anchors.forEach((a) => a.removeEventListener("click", handleAnchorClick));
			window.removeEventListener("scroll", onScroll);
			cards.forEach((card) => observer.unobserve(card));
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<main className="container">
				<section className="hero" id="inicio">
					<div className="hero-content">
						<div className="hero-text">
							<h1>
								First Exchange, tu mejor eleccion!!!<span className="badge">Con las mas bajas comisiones</span>
							</h1>
							<p>
								Ofrecemos las mas bajas comisiones del mercado, las mejores herramientas,
								 y contamos con un chat de apoyo entre usuarios.
							</p>
							<div className="trust-badges">
								<span className="badge">Bajas comisiones</span>
								<span className="badge">Chat de apoyo entre usuarios</span>
								<span className="badge"> Las mejores Herramientas</span>
							</div>
							<https://www.youtube.com/shorts/enf1aIX-CIc />
						</div>

						<div className="hero-visual">
							<div className="value-cards">
								<div className="value-card">
									<div className="value-icon"><BadgeDollarSign size={35} color="#2c3e50" strokeWidth={1.50} /></div>
									<h3> Las mejores herramientas </h3>
									<p>Contamos con una plataforma moderna, 
										Monitores de precio en tiempo real,
										tiempo de transaccion en segundos.</p>
								</div>
								<div className="value-card">
									<div className="value-icon"><BadgeDollarSign size={35} color="#2c3e50" strokeWidth={1.50} /></div>
									<h3>Brokers profecionales</h3>
									<p>Contamos con un grupo de brokers experimentados, que realizan transacciones en segundos.</p>
								</div>
								<div className="value-card">
									<div className="value-icon"><BadgeDollarSign size={35} color="#2c3e50" strokeWidth={1.50} /></div>
									<h3>Chat entre usuarios</h3>
									<p>El chat entre usuarios, sirve como grupo de apoyo, para tener mas clarida a la hora de operar.</p>
								</div>
								<div className="value-card">
									<div className="value-icon"><BadgeDollarSign size={36} color="#2c3e50" strokeWidth={1.50} /></div>
									<h3>Plataforma moderna y segura</h3>
									<p> Nuestra plataforma es una de las mas modernas y seguras del mercado,esto te ofrece ventaja al momento de operar.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="no-commission">
					<h2>Paga con nuestra tarjeta y recibe el 30% de vuelta</h2>
					<p>
						Dale uso a tus divisas por el mundo y paga en cualquier comercio con la tarjeta de First Exchange!!!
						establecimientos y porcentajes:
					</p>
					<div className="commission-comparison">
						<div className="comparison-row">
							<span>Restaurantes:</span>
							<span>15% devuelto </span>
						</div>
						<div className="comparison-row">
							<span>Farmacias:</span>
							<span>10% devuelto</span>
						</div>
						<div className="comparison-row">
							<span>Hoteles:</span>
							<span>20% devuelto</span>
						</div>
						<div className="comparison-row">
							<span>Comercio Electronico:</span>
							<span>30% devuelto</span>
						</div>
					</div>
				</section>

				<section className="features" id="servicios">
					<div className="container">
						<h2 className="section-title">Nuestra oferta:</h2>
						<p className="section-subtitle">
							somos tu aplicacion de divisas mas facil y completa del mundo.ofrecemos mas de 200 monedas, aceptamos particulares, empresas,e instituciones.
						</p>
						<div className="features-grid">
							<div className="feature-card">
								<div className="feature-icon"><ChartNoAxesCombined size={44} color="#2c3e50" strokeWidth={1.50} /></div>
								<h3>Operativos desde 2010</h3>
								<p>
									Somos la primera Fintech espanola en obtener la Licencia MiCA.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon"><ChartNoAxesCombined size={44} color="#2c3e50" strokeWidth={1.50} /></div>
								<h3>Intercambio de divisas</h3>
								<p>
									Almacena, envia y recibe divisas, crea tu monedero gratuito.una caja fuerte asegurada con 150 millones de Euros.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon"><MonitorSmartphone size={44} color="#2c3e50" strokeWidth={1.50} /></div>
								<h3>Space Center</h3>
								<p>
									Es el sistema que premia tu activida en First Exchange. cuanto mas utilices la plataforma, mejores seran tus ventajas.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon"><ChartNoAxesCombined size={44} color="#2c3e50" strokeWidth={1.50} /></div>
								<h3>Para avanzados</h3>
								<p>
									Tradin profecional de alta frecuencia, compra y vende divisas con bajas comisiones e interfaz profecional.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon"><BriefcaseBusiness size={44} color="#2c3e50" strokeWidth={1.5} /></div>
								<h3>Prestamos rapidos</h3>
								<p>
									Hasta 1 millon de euros, consigue prestamos rapidos utilizando tus divisas como aval.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon"><ChartNoAxesCombined size={44} color="#2c3e50" strokeWidth={1.5} /></div>
								<h3>Custodia institucional de divisas</h3>
								<p>
									Servicio para grandes capitales, altamente configurable, asegurado, con cumplimiento regulatorio..
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="tools" id="herramientas">
					<div className="container">
						<h2 className="section-title">+200 monedas</h2>
						<div className="tools-grid">
							<div className="tool-placeholder">
								
								<img src= https://up.yimg.com/ib/th/id/OIP.RtNrADKauU8c-mVAS-gR9QHaDS?pid=Api&rs=1&c=1&qlt=95&w=261&h=116 />
							</div>
							<div className="tool-placeholder">
								<h3>🧮 Calculadora de conversión</h3>
								<CurrencyConverter />
							</div>
						</div>
					</div>
				</section>
			</main>

			<section className="cta-section" id="contacto">
				<div className="container">
					<h2>First Exchange</h2>
					<p>
						Únete a First Exchange, y gana hasta un 30% devuelto al usar nuestra targeta en tus establecimientos favoritos.
					</p>
				</div>
				<Link to="/signup" className="btn-primary">
					¿Registrate ahora?
				</Link>
			</section>

			{/* Score Section */}
          
			<section className="score-section" style={{ textAlign: "center", marginTop: "2rem" }}>
				<PublicRating/>
			</section>
		</>
	);
}

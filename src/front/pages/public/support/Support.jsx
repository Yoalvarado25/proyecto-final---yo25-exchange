import "./support.css";
import { SupportChat } from "../../../components/supportChat/supportChat";

export const Support = () => {
  return (
    <>
      <section className="support-wrapper">
        <div className="support-container">
          <article className="support-content">
            <h1 className="support-title">Centro de Soporte</h1>
            <p className="support-updated">
              <strong>Última actualización:</strong> 24 de Noviembre de 2025
            </p>
            <a className="btn btn-outline-warning">Ir al chatbot</a>
            <p>
              <strong>Plataforma:</strong>{" "}
              <span className="highlight">first Exchange</span>
            </p>

            <h2>1. Preguntas Frecuentes (FAQ)</h2>
            <ul className="faq-list">
              <li>
                <strong>¿Es First Exchange una casa de cambio?</strong><br />
                 si
                realizamos operaciones de cambio y actuamos como intermediarios
                financieros.
              </li>
              <li>
                <strong>¿Qué pasa si tengo un problema con otro usuario?</strong><br />
                Te recomendamos contactar directamente con el otro usuario e
                intentar resolver la situación de forma amistosa. FirstExchange no
                interviene en desacuerdos con otros usuarios.
              </li>
              <li>
                <strong>¿Puedo eliminar mi cuenta?</strong><br />
                Sí. Puedes solicitar la eliminación de tu cuenta escribiéndonos a{" "}
                <a href="mailto:soporte@first.exchange">
                  soporte@first.exchange
                </a>.
              </li>
              <li>
                <strong>¿Cómo protegen mis datos?</strong><br />
                Cumplimos con el RGPD. Puedes conocer más en nuestra{" "}
                <a href="/legal/privacy-policy">Política de Privacidad</a>.
              </li>
            </ul>

            <h2>2. ¿Necesitas Ayuda Personalizada?</h2>
            <p>
              Si no encontraste lo que buscabas en nuestras preguntas frecuentes,
              puedes escribirnos directamente:
            </p>
            <ul className="contact-list">
              <li>
                <strong>Soporte general:</strong>{" "}
                <a href="mailto:soporte@first.exchange">
                  soporte@first.exchange
                </a>
              </li>
              <li>
                <strong>Privacidad y datos personales:</strong>{" "}
                <a href="mailto:privacidad@first.exchange">
                  privacidad@first.exchange
                </a>
              </li>
              <li>
                <strong>Consultas legales:</strong>{" "}
                <a href="mailto:legal@first.exchange">
                  legal@first.exchange
                </a>
              </li>
            </ul>

            <h2>3. Seguridad y Reportes</h2>
            <p>
              Si detectas una conducta sospechosa, estafa o uso indebido de la
              plataforma, por favor repórtalo inmediatamente a{" "}
              <a href="mailto:seguridad@first.exchange">
                seguridad@first.exchange
              </a>. Tu colaboración es clave para mantener una comunidad segura.
            </p>

            <h2>4. Disponibilidad del Soporte</h2>
            <p>
              Nuestro equipo responde a consultas de lunes a viernes, de 9:00 a
              17:00 (CET). Nos esforzamos por responder en un plazo máximo de 48
              horas hábiles.
            </p>
          </article>

          <aside className="support-tip">
            <strong>Consejo:</strong>  Nunca compartas contraseñas ni
            información sensible.
          </aside>
        </div>
      </section>
      <section >
        <SupportChat />
      </section>
    </>
  );
};
